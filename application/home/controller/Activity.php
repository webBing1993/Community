<?php
/**
 * Created by PhpStorm.
 * User: Lxx<779219930@qq.com>
 * Date: 2016/4/20
 * Time: 14:14
 */

namespace app\home\controller;
use app\home\model\ActivityEnroll;
use app\home\model\Activity as ActivityModel;
use app\home\model\Browse;
use app\home\model\Collect;
use app\home\model\Comment;
use app\home\model\Course;
use app\home\model\Focus;
use app\home\model\LikeLog;
use app\home\model\Message;
use app\home\model\Picture;
use app\home\model\Topic;
use app\home\model\WechatDepartmentUser;
use app\home\model\WechatUser;
use app\home\model\WechatUserTag;
use think\Controller;
use think\Db;
use think\Input;

/**
 * Class Activity
 * 活动通知
 */
class Activity extends Base {
    /**
     * 主页
     */
    public function index(){
        //判断是否是游客
        $this->anonymous();

        $userId = session('userId');
        save_log($userId, 'Activity');

        //获取未读消息数及头像
        $msg = array(
            'receive_id' => $userId,
            'status' => 0,
        );
        $message = Message::where($msg)->select();
        $messageNumber = count($message);
        $common = array(
            'number' => $messageNumber,
            'userid' => $userId,
        );
        $this->assign('common',$common);

        $activityModel = new ActivityModel();
        //推荐活动
        $con = array(
            'type'=> 1,
            'recommend' => 1,
            'status' => array('eq',1),
        );
        $recommend = $activityModel::all(function($query) use($con){
            $query->where($con)->order('create_time desc')->limit(0,3);
        });
        $this->assign('recommend',$recommend);

        //会议通告,获取用户所在的departmentid或者tag
        //获取部门关联活动信息
        $dept = Db::table('pb_activity')
                ->alias('a')
                ->join('pb_send b','a.id = b.activity_id','LEFT')
                ->join('pb_wechat_department_user c','b.departmentid = c.departmentid','LEFT')
                ->field('a.id,a.name,a.publisher,a.enrollnumber,a.totalnumber,a.create_time,a.type')
                ->where('c.userid',$userId)
                ->where('a.status','eq',1)
                ->where('a.type','eq',2)
                ->order('a.id desc')
                ->limit(3)
                ->select();
        //获取标签关联活动
        $tag = Db::table('pb_activity')
            ->alias('a')
            ->join('pb_send b','a.id = b.activity_id','LEFT')
            ->join('pb_wechat_user_tag c','b.tagid = c.tagid','LEFT')
            ->field('a.id,a.name,a.publisher,a.enrollnumber,a.totalnumber,a.create_time,a.type')
            ->where('c.userid',$userId)
            ->where('a.status','eq',1)
            ->where('a.type','eq',2)
            ->order('a.id desc')
            ->limit(3)
            ->select();

        $meet = array_merge($dept,$tag); //合并需要合并的俩个数组
        $key = 'id';//去重条件
        $tmp_arr = array();//声明数组
        foreach($meet as $k => $v) {
            if(in_array($v[$key], $tmp_arr)) {
            //搜索$v[$key]是否在$tmp_arr数组中存在，若存在返回true
                unset($meet[$k]); //删除掉数组（$arr）里相同ID的数组
            }else {
                $tmp_arr[] = $v[$key]; //记录已有的id
            }
        }
        rsort($meet); // 排序
        if($meet){
            //重组，是否存在及是否报名
            foreach($meet as $c=>$value){
                if($c < 3){
                    //30天后隐藏
                    $time = $value['create_time']+30*24*60*60;
                    if(time() < $time){
                        $value['is'] = 1;
                    }else{
                        $value['is'] = 0;
                    }
                    $map1 = array(
                        'activity_id'=>$value['id'],
                        'user_id'=>$userId,
                        "status" => array("egt",0),
                    );

                    $is_existence = ActivityEnroll::where($map1)->find(); //判断是否已报名
                    ($is_existence)?$value['is_enroll'] = 1:$value['is_enroll'] = 0;
                    $new[$value['id']] = $value;
                }
            }
        }else{
            $new = "";
        }
        $this->assign('meet',$new);

        //热门活动
        $info = array(
            'type' => 1,
            'status' => array('eq',1),
        );
        $hotactivity = $activityModel::where($info)->order('id desc')->limit(5)->select();
        $this->assign('hotactivity',$hotactivity);

        return $this->fetch();
    }

    /**
     * 加载更多活动
     */
    public function activitymore(){
        $len = input('length');
        $map = array(
            'type' => 1,
            'status' => array('eq',1),
        );
        $list = ActivityModel::where($map)->order('id desc')->limit($len,5)->select();
        foreach($list as $value){
            $img = Picture::get($value['list_image']);
            $value['path'] = $img['path'];
            $value['pb_time'] = date("Y-m-d",$value['create_time']);
        }
        if($list){
            return $this->success("加载成功",'',$list);
        }else{
            return $this->error("加载失败");
        }

    }

    /**
     * 热门活动页面
     */
    public function hotactivity(){
        //判断是否是游客
        $this->anonymous();

        $this->jssdk();
        
        $userId = session('userId');
        $id = input('id');
        $activityModel = new ActivityModel;

        if($userId != "visitor"){
            //浏览不存在则存入pb_browse表
            $con = array(
                'user_id' => $userId,
                'activity_id' => $id,
            );
            $history = Browse::get($con);
            if(!$history && $id != 0){
                Browse::create($con);
                $s['score'] = array('exp','`score`+1');
                WechatUser::where('userid',$userId)->update($s);
            } 
        }
        
        //每加载一次页面浏览数+1
        $info['views'] = array('exp','`views`+1');
        $activityModel::where('id',$id)->update($info);

        //活动基本信息
        $list = $activityModel::where('id',$id)->find();
        //重组轮播图片
        $list['carousel'] = json_decode($list['carousel_images']);
        $list['user'] = session('userId');
        //分享图片及链接及描述
        $image = Picture::where('id',$list['front_cover'])->find();
        $list['share_image'] = "http://".$_SERVER['SERVER_NAME'].$image['path'];
        $list['link'] = "http://".$_SERVER['SERVER_NAME'].$_SERVER['REDIRECT_URL'];
        $list['desc'] = str_replace('&nbsp;','',strip_tags($list['detail']));
        $this->assign('list',$list);

        //热门活动名单列表
        $info2 = array(
            'activity_id' => $id,
            'type'=> 1,
            'status' => array('egt',0),
        );
        $enroll = ActivityEnroll::where($info2)->column('user_name');
        $this->assign('enroll',json_encode($enroll));

        //是否报名
        $info1 = array(
            'user_id' => $userId,
            'activity_id' => $id,
            'type' => 1,
            "status" => array("egt",0),
        );
        $activity = ActivityEnroll::where($info1)->find();
        if($activity){
            $is_enroll = 1;
        }else{
            $is_enroll = 0;
        }
        $this->assign('is_enroll',$is_enroll);

        //收藏
        $map = array(
            'activity_id' => $id,
            'user_id' => $userId,
        );
        $collect = Collect::where($map)->find();
        ($collect)?$collect = 1:$collect = 0;
        $this->assign('collect',$collect);

        //评论
        $map = array(
            'activity_id' => $id,
            'parent_id' => 0,
            'status' => array('egt',0)
        );
        //敏感词屏蔽
        $badword = array(
            '法轮功','法轮','FLG','六四','6.4','flg'
        );
        $badword1 = array_combine($badword,array_fill(0,count($badword),'***'));
        
        $comment = Comment::where($map)->limit(0,5)->order('likes desc,id desc')->select();
        foreach($comment as $value){
            $content = $value['content'];
            $str = strtr($content, $badword1);
            $value['content'] = $str;
            if($value['create_user'] == $userId){
                $value['self'] = 1;
            }else{
                $value['self'] = 0;
            }
            $map1 = array(
                'user_id' => $userId,
                'comment_id' => $value['id'],
                'status' => array('egt',0)
            );
            $like = LikeLog::where($map1)->find();
            ($like)?$value['is_like'] = 1:$value['is_like'] = 0;
            $users = WechatUser::where('userid',$value['create_user'])->find();
            $value['header'] = ($users['header']) ? $users['header'] : $users['avatar'];
            $value['nickname'] = ($users['nickname']) ? $users['nickname'] : $users['name'];
            $map2 = array(
                'parent_id' => $value['id'],
                'status' => array('egt',0)
            );
            $second = Comment::where($map2)->limit(0,5)->order('id desc')->select();
            foreach($second as $val){
                $content = $val['content'];
                $str = strtr($content, $badword1);
                $val['content'] = $str;
                $name = WechatUser::where('userid',$val['create_user'])->find();
                $val['nickname'] = ($name['nickname']) ? $name['nickname'] : $name['name'];
            }
            $value['notes'] = $second;
        }
        $this->assign('comment',json_encode($comment));

        //判断是否有昵称
        $user = WechatUser::where('userid',$userId)->find();
        if($user['nickname']){
            $nickname = 1;
        }else{
            $nickname = 0;
        }
        $this->assign('is_nickname',json_encode($nickname));

        return $this->fetch();
    }

    /**
     * 会议通知页面
     * 活动报名用的是wechatuser name字段，评论用的是nickname
     */
    public function meetnote(){
        $this->anonymous();
        $this->jssdk();

        $userId = session('userId');
        $id = input('id');

        //通知基本信息查询
        $activityModel = new ActivityModel;
        $enrollModel  = new ActivityEnroll();

        $list = $activityModel::where('id',$id)->find();
        //查看报名表是否有该用户报名信息，存在则改变按钮
        $map = array('activity_id'=>$id,'user_id'=>$userId);
        $is_existence = $enrollModel::where($map)->find();
        ($is_existence)?$list['is_enroll'] = 1:$list['is_enroll'] = 0;
        $list['class'] = $is_existence['type'];
        //分享图片及链接及描述
        $list['share_image'] = "http://".$_SERVER['SERVER_NAME'].'/home/images/default_avatar.png';
        $list['link'] = "http://".$_SERVER['SERVER_NAME'].$_SERVER['REDIRECT_URL'];
        $list['desc'] = strip_tags($list['detail']);
        $this->assign('list',$list);

        //部门/标签总名单，人数
        $departmentId = $activityModel::where('id',$id)->value('departmentid');
        $departmentId = json_decode($departmentId);
        $tagId = $activityModel::where('id',$id)->value('tag');
        $tagId = json_decode($tagId);
        if($departmentId || $tagId){
            $dp = Db::table('pb_wechat_department_user')
                ->alias('a')
                ->join('wechat_user b','a.userid = b.userid')
                ->field('b.name')
                ->where('a.departmentid','in',$departmentId)
                ->select();

            $tg = Db::table('pb_wechat_user_tag')
                ->alias('a')
                ->join('wechat_user b','a.userid = b.userid')
                ->field('b.name')
                ->where('a.tagid','in',$tagId)
                ->select();
        }
        $data = array_merge($dp,$tg);
        $key = 'name';//去重条件
        $tmp_arr = array();//声明数组
        foreach($data as $k => $v) {
            if(in_array($v[$key], $tmp_arr)) {
                //搜索$v[$key]是否在$tmp_arr数组中存在，若存在返回true
                unset($data[$k]); //删除掉数组（$arr）里相同ID的数组
            }else {
                $tmp_arr[] = $v[$key]; //记录已有的id
            }

        }
        foreach($data as $key=>$value){
            $dpMember[] =  $value['name'];
        }

        //已报名名单,人数
        $map1 = array(
            "activity_id" => $id,
            "type" => array("in","2,4"),
            "status" => array("egt",0),
        );
        $info = $enrollModel::where($map1)->select();
        $nameStr = "";
        $readyMember = array();
        foreach($info as $value) {
            if($value->type == 4) {
                $nameStr .= $value['user_name']."(".$value['replacement']." 替)";
                $value['user_name'] = $nameStr;
            }
            $readyMember[] = $value['user_name'];
        }
        $readyNumber = count($readyMember);

        //请假名单、人数
        $map2 = array(
            "activity_id" => $id,
            "type" => 3,
            "status" => array("egt",0),
        );
        $leaveMember = $enrollModel::where($map2)->column('user_name');
        $leaveNumber = count($leaveMember);

        //未报名名单、人数
        $enrollMember =$enrollModel::where('activity_id',$id)->column('user_name');
        $noneMember = array_values(array_diff($dpMember,$enrollMember));
        $noneNumber = count($noneMember);

        $msg['member'] = array(
            'ready' => $readyMember,
            'leave' => $leaveMember,
            'none' => $noneMember
        );

        $msg['number'] = array(
            'ready' => $readyNumber,
            'leave' => $leaveNumber,
            'none' => $noneNumber
        );
        $this->assign('msg',json_encode($msg));

        return $this->fetch();
    }

    /**
     * 查看地图
     */
    public function map(){
        $id = input('id');

        $list = ActivityModel::get($id);
        $this->assign('list',$list);
        return $this->fetch();
    }

    /**
     * 查看会议通知座位表
     */
    public function seattable(){
        $id = input('id');
        $msg = ActivityModel::get($id);
        $this->assign('msg',$msg);

        return $this->fetch();
    }

    /**
     * 活动报名
     */
    public function enroll(){
        //获取活动id，根据id获取活动部门id
        $activityId  = input('id');
        $type = input('type'); //报名类型,1活动报名，2会议报名，3请假，4找人代

        //获取用户信息
        $userId = session('userId');    //session获取用户id
        $user = WechatUser::where('userid',$userId)->find();

        $enrollModel = new ActivityEnroll();

        switch($type){
            //正常报名，validate分场景验证
            case 1:
                $data = array(
                    'activity_id' => $activityId,
                    'user_id' => $userId,
                    'user_name' => $user['name'],
                    'mobile' => $user['mobile'],
                    'type' => 1,
                    'status' => 0,
                );
                $true = ActivityEnroll::where($data)->find();
                if(!$true){
                    $result = $enrollModel->validate('ActivityEnroll.hot')->save($data);
                    //报名成功则在该活动报名人数+1
                    $info['enrollnumber'] = array('exp','`enrollnumber`+1');
                    $number = ActivityModel::where('id',$activityId)->update($info);
                }else{
                    $result = "";
                }
                break;
            //会议通知报名
            case 2:
                $data = array(
                    'activity_id' => $activityId,
                    'user_id' => $userId,
                    'user_name' => $user['name'],
                    'mobile' => $user['mobile'],
                    'type' => 2,
                    'status' => 0,
                );
                $true = ActivityEnroll::where($data)->find();
                if(!$true){
                    $result = $enrollModel->validate('ActivityEnroll.meet')->save($data);
                    //报名成功则在该活动报名人
                    $info['enrollnumber'] = array('exp','`enrollnumber`+1');
                    $number = ActivityModel::where('id',$activityId)->update($info);
                    //发送会议通知~
                    $message = array(
                        'receive_id' => $userId,
                        'activity_id' => $activityId,
                        'type' => 4,
                        'create_user' => 0,
                        'content' => '会议通知！'
                    );
                    Message::create($message);
                }else{
                    $result = "";
                }
                break;
            //请假，前台post提交reason
            case 3:
                $data = array(
                    'activity_id' => $activityId,
                    'user_id' => $userId,
                    'user_name' => $user['name'],
                    'mobile' => $user['mobile'],
                    'reason' => input('reason'),
                    'type' => 3,
                    'status' => 0,
                );
                $true = ActivityEnroll::where($data)->find();
                if(!$true){
                    $result = $enrollModel->validate('ActivityEnroll.leave')->save($data);
                }else{
                    $result = "";
                }
                break;
            //代参加
            case 4:
                $data = array(
                    'activity_id' => $activityId,
                    'user_id' => $userId,
                    'user_name' => $user['name'],
                    'replacement' => input('replacement'),
                    'mobile' => input('mobile'),
                    'reason' => input('reason'),
                    'type' => 4,
                    'status' => 0,
                );
                //存在则不添加
                $true = ActivityEnroll::where($data)->find();
                if(!$true){
                    $result = $enrollModel->validate('ActivityEnroll.replace')->save($data);
                    //报名成功则在该活动报名人数+1
                    $info['enrollnumber'] = array('exp','`enrollnumber`+1');
                    $number = ActivityModel::where('id',$activityId)->update($info);
                    $message = array(
                        'receive_id' => $userId,
                        'activity_id' => $activityId,
                        'type' => 4,
                        'create_user' => 0,
                        'content' => '会议通知！'
                    );
                    Message::create($message);
                }else{
                    $result = "";
                }
                break;
            default:
                return $this->error('无该报名按钮');
                break;
        }

        if(false === $result){
            return $this->error($enrollModel->getError());
        }else{
            if($type == 1){
                //返回名单
                $map3 = array(
                    'activity_id' => $activityId,
                    'type' => 1,
                    'status' => array('egt',0),
                );
                $msg = ActivityEnroll::where($map3)->column('user_name');
            }else{
                //部门/标签总名单，人数
                $departmentId = ActivityModel::where('id',$activityId)->value('departmentid');
                $departmentId = json_decode($departmentId);
                $tagId = ActivityModel::where('id',$activityId)->value('tag');
                $tagId = json_decode($tagId);
                if($departmentId || $tagId){
                    $dp = Db::table('pb_wechat_department_user')
                        ->alias('a')
                        ->join('wechat_user b','a.userid = b.userid')
                        ->field('b.name')
                        ->where('a.departmentid','in',$departmentId)
                        ->select();

                    $tg = Db::table('pb_wechat_user_tag')
                        ->alias('a')
                        ->join('wechat_user b','a.userid = b.userid')
                        ->field('b.name')
                        ->where('a.tagid','in',$tagId)
                        ->select();
                }
                $data = array_merge($dp,$tg);
                $key = 'name';//去重条件
                $tmp_arr = array();//声明数组
                foreach($data as $k => $v) {
                    if(in_array($v[$key], $tmp_arr)) {
                        //搜索$v[$key]是否在$tmp_arr数组中存在，若存在返回true
                        unset($data[$k]); //删除掉数组（$arr）里相同ID的数组
                    }else {
                        $tmp_arr[] = $v[$key]; //记录已有的id
                    }

                }
                foreach($data as $key=>$value){
                    $dpMember[] =  $value['name'];
                }

                //已报名名单,人数
                $map1 = array(
                    "activity_id" => $activityId,
                    "type" => array("in","2,4"),
                    "status" => array("egt",0),
                );
                $info = $enrollModel::where($map1)->select();
                $nameStr = "";
                $readyMember = array();
                foreach($info as $value) {
                    if($value->type == 4) {
                        $nameStr .= $value['user_name']."(".$value['replacement']." 替)";
                        $value['user_name'] = $nameStr;
                    }
                    $readyMember[] = $value['user_name'];
                }
                $readyNumber = count($readyMember);

                //请假名单、人数
                $map2 = array(
                    "activity_id" => $activityId,
                    "type" => 3,
                    "status" => array("egt",0),
                );
                $leaveMember = $enrollModel::where($map2)->column('user_name');
                $leaveNumber = count($leaveMember);

                //未报名名单、人数
                $enrollMember =$enrollModel::where('activity_id',$activityId)->column('user_name');
                $noneMember = array_values(array_diff($dpMember,$enrollMember));
                $noneNumber = count($noneMember);

                $msg['member'] = array(
                    'ready' => $readyMember,
                    'leave' => $leaveMember,
                    'none' => $noneMember
                );

                $msg['number'] = array(
                    'ready' => $readyNumber,
                    'leave' => $leaveNumber,
                    'none' => $noneNumber
                );
            }
            return  $this->success("报名成功",'',$msg);
        }
    }

    /**
     * 收藏操作
     */
    public function collect(){
        //执行收藏操作
        $userId = session('userId');
        $collectModel = new Collect();
        $activityId = input('id');
        $data = array(
            'user_id' => $userId, //用户openid
            'activity_id' => $activityId,
        );
        $collect = $collectModel::where($data)->find();

        if(empty($collect)){
            $data['type'] = 1; //热门活动type

            $model = $collectModel->create($data);
            if($model){
                //新增收藏collect字段+1
                $info['collect'] = array('exp','`collect`+1');
                $id = ActivityModel::where('id',$activityId)->update($info);
                if($id){
                    return $this->success('收藏成功', Cookie('__forward__'), 1);
                }else{
                    return $this->error('收藏失败', Cookie('__forward__'), false);
                }
            }else{
                //验证错误getError()
                return $this->error($collectModel->getError());
            }
        }else{
            //存在执行该操作则为取消收藏
            $result = $collectModel::where($data)->delete();
            if($result) {
                $info['collect'] = array('exp','`collect`-1');
                $id = ActivityModel::where('id',$activityId)->update($info);
                if($id){
                    return $this->success('取消收藏成功', Cookie('__forward__'), 0);
                }else{
                    return $this->error('取消收藏失败',Cookie('__forward__'), false);
                }
            } else {
                return $this->error($collectModel->getError());
            }
        }
    }

    /**
     * 添加评论
     */
    public function addComment(){
        if(IS_POST){
            $userId = session('userId');
            $activityId = input('activity_id') ? input('activity_id') : 0;
            $focusId = input('focus_id') ? input('focus_id') : 0;
            $topicId = input('topic_id') ? input('topic_id') : 0;
            $courseId = input('course_id')? input('course_id') : 0;
            $replayId = input('replay_id') ? input('replay_id') : 0;
            $parentId = input('parent_id') ? input('parent_id') : 0;
            $receiveId = input('receive_id') ? input('receive_id') : 0;

            //重组数据
            $commentModel = new Comment();
            $data = array(
                'content' => input('content'),
                'parent_id' => $parentId,
                'activity_id' => $activityId,
                'focus_id' => $focusId,
                'topic_id' => $topicId,
                'course_id' => $courseId,
                'user_id' => $receiveId,
                'replay_id' => $replayId,
                'create_user' => $userId,
            );
            if($activityId) { $data['type'] = 1;}
            if($focusId) { $data['type'] = 2;}
            if($topicId) { $data['type'] = 3;}
            if($courseId && !$topicId) { $data['type'] = 4; }

            $model = $commentModel->create($data);
            if ($model) {
                $id = $model['id'];
                if ($id) {
                    //评论成功增加三分
                    $score['score'] = array('exp','`score`+3');
                    WechatUser::where('userid',$userId)->update($score);

                    //更新主表评论数
                    $map['comments'] = array('exp', '`comments`+1');
                    if ($activityId) ActivityModel::where('id', $activityId)->update($map);
                    if ($focusId) Focus::where('id', $focusId)->update($map);
                    if ($topicId) Topic::where('id', $topicId)->update($map);
                    if ($courseId) Course::where('id', $courseId)->update($map);

                    //获取用户头像和昵称
                    $user = WechatUser::where('userid',$userId)->find();
                    $nickname = ($user['nickname']) ? $user['nickname'] : $user['name'];
                    $header =  ($user['header']) ? $user['header'] : $user['avatar'];
                    //返回用户数据
                    $jsonData = array(
                        'time' => time(),
                        'status' => 1,
                        'content' => input('content'),
                        'nickname' => $nickname,
                        'header' => $header,
                        'id' => $id,
                        'user_id' => $receiveId,
                        'create_time' => time(),
                        'likes' => 0,
                        'is_like' => 0,
                        'parent_id' => $parentId,
                        'notes' => array(),
                        'replay_id' => $replayId,
                        'create_user' => $userId,
                        'self' => 1,
                    );

                    //@我回复，信息存入message表
                    if (!empty($parentId)) {
                        $replay = WechatUser::where('userid', $replayId)->find();
                        $jsonData['replayname'] = $replay['nickname'];

                        $message = array(
                            'type' => 2,
                            'receive_id' => $receiveId,
                            'content' => input('content'),
                            'comment_id' => $parentId,
                            'activity_id' => $activityId,
                            'focus_id' => $focusId,
                            'topic_id' => $topicId,
                            'course_id' => $courseId,
                            'create_user' => $userId,
                        );

                        $msg = Message::create($message);
                        if ($msg) Comment::where('id', $parentId)->update($map);
                    }
                    return $this->success('评论成功','', $jsonData);
                } else {
                    return $this->error('评论失败');
                }
            } else {
                return $this->error($commentModel->getError());
            }
        }
    }

    /**
     * 点赞
     */
    public function like(){
        $userId = session('userId');
        $likeModel = new LikeLog();
        $comment_id = input('id');
        $user_id = input('user_id');
        $data = array(
            'user_id' => $userId,
            'comment_id' => $comment_id,
        );
        //是否存在点赞表
        $like = $likeModel::where($data)->find();
        if(empty($like)){
            $comment = Comment::where('id',$comment_id)->find();
            if($comment['activity_id']){
                $activity_id = $comment['activity_id'];
                $type = 1;
            }else{
                $activity_id = 0;
            }
            if($comment['focus_id']){
                $focus_id = $comment['focus_id'];
                $type = 2;
            }else{
                $focus_id = 0;
            }
            if($comment['topic_id']){
                $topic_id = $comment['topic_id'];
                $type = 3;
            }else{
                $topic_id = 0;
            }
            if($comment['course_id']){
                $course_id = $comment['course_id'];
                $type = 4;
            }else{
                $course_id = 0;
            }
            $data['type'] = $type;
            $data['activity_id'] = $activity_id;
            $data['focus_id'] = $focus_id;
            $data['topic_id'] = $topic_id;
            $data['course_id'] = $course_id;
            $model = LikeLog::create($data);
            if($model){
                //点赞成功积分+2
                $score['score'] = array('exp','`score`+2');
                WechatUser::where('userid',$userId)->update($score);

                //点赞次数+1
                $info['likes'] = array('exp','`likes`+1');
                Comment::where('id',$comment_id)->update($info);
                //点赞成功发送消息到message
                $user = WechatUser::where('userid',$user_id)->find();
                $message = array(
                    'content' => '赞了我的评论！',
                    'receive_id' => $user['userid'],
                    'activity_id' => $activity_id,
                    'focus_id' => $focus_id,
                    'topic_id' => $topic_id,
                    'course_id' => $course_id,
                    'comment_id' => $comment_id,
                    'type' => 3,
                    'create_user' => $userId
                );
                Message::create($message);

                return $this->success('点赞成功','',1);
            }else{
                return $this->error($model->getError());
            }
        }else{
            $result = $likeModel::where($data)->delete();
            if($result){
                //取消则积分-2
                $score['score'] = array('exp','`score`-2');
                WechatUser::where('userid',$userId)->update($score);

                //点赞次数-1
                $info1['likes'] = array('exp','`likes`-1');
                Comment::where('id',$comment_id)->update($info1);
                return $this->success('取消成功','',0);
            }else{
                return $this->error('取消失败');
            }
        }
    }

    /**
     * 加载更多评论
     */
    public function more(){
        $userId = session('userId');
        $id = input('activity_id');
        $total = input('total');
        $parentId = input('parent_id')?input('parent_id'):0;
        if($parentId == 0){
            //一级评论
            $map = array(
                'activity_id' => $id,
                'parent_id' => 0,
                'status' => array('egt',0)
            );
            //敏感词屏蔽
            $badword = array(
                '法轮功','法轮','FLG','六四','6.4','flg'
            );
            $badword1 = array_combine($badword,array_fill(0,count($badword),'***'));
            $comment = Comment::where($map)->limit($total,5)->order('likes desc,id desc')->select();
            if($comment){
                foreach($comment as $value){
                    $content = $value['content'];
                    $str = strtr($content, $badword1);
                    $value['content'] = $str;
                    if($value['create_user'] == $userId){
                        $value['self'] = 1;
                    }else{
                        $value['self'] = 0;
                    }
                    $map1 = array(
                        'user_id' => $userId,
                        'comment_id' => $value['id'],
                        'status' => array('egt',0)
                    );
                    $like = LikeLog::where($map1)->find();
                    ($like)?$value['is_like'] = 1:$value['is_like'] = 0;
                    $users = WechatUser::where('userid',$value['create_user'])->find();
                    $value['header'] = ($users['header']) ? $users['header'] : $users['avatar'];
                    $value['nickname'] = ($users['nickname']) ? $users['nickname'] : $users['name'];
                    $second = Comment::where('parent_id',$value['id'])->limit(0,5)->order('id desc')->select();
                    foreach($second as $val){
                        $name = WechatUser::where('userid',$val['create_user'])->find();
                        $val['nickname'] = $name['nickname'] ? $name['nickname'] : $name['name'];
                    }
                    $value['notes'] = $second;
                }
                $comment['info'] = 1;
                return $this->success('加载成功','',$comment);
            }else{
                return $this->error('加载失败');
            }

        }else{
            //敏感词屏蔽
            $badword = array(
                '法轮功','法轮','FLG','六四','6.4','flg'
            );
            $badword1 = array_combine($badword,array_fill(0,count($badword),'***'));
            //二级评论
            $map = array(
                'activity_id' => $id,
                'parent_id' => $parentId
            );
            $comment = Comment::where($map)->limit($total,5)->order('likes desc,id desc')->select();
            foreach($comment as $value){
                $content = $value['content'];
                $str = strtr($content, $badword1);
                $value['content'] = $str;
                $users = WechatUser::where('userid',$value['create_user'])->find();
                $value['nickname'] = $users['nickname'];
            }
            if($comment){
                $comment['info'] = 2;
                return $this->success('二级加载成功','',$comment);
            }else{
                return $this->error('二级加载失败');
            }

        }
    }

    /**
     * 我的评论删除
     */
    public function commentdel(){
        $id = input('id');
        $map['status'] = -1;
        $result = Comment::where('id',$id)->update($map);
        if($result){
            //删除成功评论数减一
            $info['comments'] = array('exp','`comments`-1');
            $comments = Comment::where('id',$id)->find();
            $activityId = $comments['activity_id'] ? $comments['activity_id'] : 0;
            $focusId = $comments['focus_id'] ? $comments['focus_id'] : 0;
            $courseId = $comments['course_id'] ? $comments['course_id'] : 0;
            if($activityId){ ActivityModel::where('id',$activityId)->update($info);}
            if($focusId){ Focus::where('id',$focusId)->update($info);}
            if($courseId){ Course::where('id',$courseId)->update($info);}

            //关联删除二级评论
            $res = Comment::where('parent_id',$id)->update($map);
            if($res){
                if($activityId){ ActivityModel::where('id',$activityId)->update($info);}
                if($focusId){ Focus::where('id',$focusId)->update($info);}
                if($courseId){ Course::where('id',$courseId)->update($info);}
            }
            return $this->success('删除成功');
        }else{
            return $this->error('删除失败');
        }
    }
    
}