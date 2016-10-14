<?php
/**
 * Created by PhpStorm.
 * User: Lxx<779219930@qq.com>
 * Date: 2016/4/20
 * Time: 14:51
 */

namespace app\home\controller;
use app\home\model\Browse;
use app\home\model\Collect;
use app\home\model\Comment;
use app\home\model\FilenoteView;
use app\home\model\LikeLog;
use app\home\model\Message;
use app\home\model\Picture;
use app\home\model\Push;
use app\home\model\PushReview;
use app\home\model\WechatDepartmentUser;
use app\home\model\Focus as FocusModel;
use app\home\model\WechatUser;
use app\home\model\WechatUserTag;
use com\wechat\TPQYWechat;
use think\Config;
use think\Controller;
use think\Db;
use think\Input;

/**
 * Class Focus
 * 第一聚焦
 */
class Focus extends Base {
    /**
     * 主页
     */
    public function index(){
        //是否游客登录
        $this->anonymous();
        
        $userId = session('userId');
        save_log($userId, 'Focus'); //计入统计分析表
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

        $focusModel = new FocusModel();

        //推荐阅读
        $map = array(
            'type' => 1,
            'recommend' => 1,
            'status' => array('eq',1),
        );
        $recommend = $focusModel::all(function($query) use($map){
            $query->where($map)->order('create_time desc')->limit(0,3);
        });
        $this->assign('recommend',$recommend);


        //是否显示文件通知,获取用户所在的departmentid或者tag
        //查询该用户组,不存在则为空
        $dept = Db::table('pb_focus')
            ->alias('a')
            ->join('pb_send b','a.id = b.focus_id','LEFT')
            ->join('pb_wechat_department_user c','b.departmentid = c.departmentid','LEFT')
            ->field('a.id,a.title')
            ->where('c.userid',$userId)
            ->where('a.status','eq',1)
            ->where('a.type','eq',2)
            ->order('a.id desc')
            ->limit(3)
            ->select();
        //获取标签关联活动
        $tag = Db::table('pb_focus')
            ->alias('a')
            ->join('pb_send b','a.id = b.focus_id','LEFT')
            ->join('pb_wechat_user_tag c','b.tagid = c.tagid','LEFT')
            ->field('a.id,a.title')
            ->where('c.userid',$userId)
            ->where('a.status','eq',1)
            ->where('a.type','eq',2)
            ->order('a.id desc')
            ->limit(3)
            ->select();

        $file = array_merge($dept,$tag); //合并需要合并的俩个数组
        if(!empty($file)){
            $key = 'id';//去重条件
            $tmp_arr = array();//声明数组
            foreach($file as $k => $v) {
                if(in_array($v[$key], $tmp_arr)) {
                    //搜索$v[$key]是否在$tmp_arr数组中存在，若存在返回true
                    unset($file[$k]); //删除掉数组（$arr）里相同ID的数组
                }else {
                    $tmp_arr[] = $v[$key]; //记录已有的id
                }
            }
            rsort($file); // 排序
        }else{
            $file = "";
        }
        $this->assign('filenote',$file);

        //class=1工委发布
        $info1 = array(
            'type' => 1,
            'class' => 1,
            'status' => array('eq',1),
        );
        $list1 = $focusModel::all(function($query) use($info1){
            $query->where($info1)->order('id desc')->limit(5);
        });
        $this->assign('list1',$list1);
        //class=2省直动态
        $info2 = array(
            'type' => 1,
            'class' => 2,
            'status' => array('eq',1),
        );
        $list2 = $focusModel::all(function($query) use($info2){
            $query->where($info2)->order('id desc')->limit(5);
        });
        $this->assign('list2',$list2);
        //class=3市县传真
        $info3 = array(
            'type' => 1,
            'class' => 3,
            'status' => array('eq',1),
        );
        $list3 = $focusModel::all(function($query) use($info3){
            $query->where($info3)->order('id desc')->limit(5);
        });
        $this->assign('list3',$list3);

        return $this->fetch();
    }

    /**
     * 文件通知
     */
    public function filenote(){
        $this->anonymous();
        $this->jssdk();

        $id = input('id');
        $userId = session('userId');
        //浏览数+1
        $info['views'] = array('exp','`views`+1');
        FocusModel::where('id',$id)->update($info);

        //查看是否浏览过,不存在则插入数据到表filenote_view
        if($userId != "visitor"){
            $map = array(
                'user_id' => $userId,
                'focus_id' => $id,
            );
            $view = FilenoteView::where($map)->find();
            if(!$view){
                $user = WechatUser::where('userid',$userId)->find();
                $data = array(
                    'focus_id' => $id,
                    'user_id' => $userId,
                    'name' => $user['name'],
                );
                FilenoteView::create($data);
            }
        }
        
        //获取部门名称及阅读人数
        $department = Db::table('pb_filenote_view')
            ->alias('a')
            ->join('wechat_department_user b','a.user_id = b.userid','LEFT')
            ->join('wechat_department c','b.departmentid = c.id','LEFT')
            ->field('a.user_id,c.name,c.id')
            ->where('a.focus_id',$id)
            ->select();
        $msg = array();
        foreach($department as $value){
            $k = $value['name'];
            $msg[$k][] = $value;
        }
        $final = array();
        foreach ($msg as $key => $value){
            foreach ($value as $val){
                $dpId = $val['id'];
            }
            $count = count($value);
            $counts = WechatDepartmentUser::where('departmentid',$dpId)->count();
            $final[] = array(
                'name' => $key,
                'count' => $count,
                'counts' => $counts,
            );
        }
        $this->assign('msg',$final);

        //基础文章信息
        $list = FocusModel::get($id);
        $list['share_image'] = "http://".$_SERVER['SERVER_NAME'].'/home/images/default_avatar.png';
        $list['link'] = "http://".$_SERVER['SERVER_NAME'].$_SERVER['REDIRECT_URL'];
        $list['desc'] = str_replace('&nbsp;','',strip_tags($list['content']));
        $this->assign('list',$list);

        return $this->fetch();
    }

    /**
     * 文件通知列表
     */
    public function filelist(){
        $userId = session('userId');
        //获取用户相关部门id或标签
        $dept = Db::table('pb_focus')
            ->alias('a')
            ->join('pb_send b','a.id = b.focus_id','LEFT')
            ->join('pb_wechat_department_user c','b.departmentid = c.departmentid','LEFT')
            ->field('a.id,a.title,a.publisher,a.create_time,a.status')
            ->where('c.userid',$userId)
            ->where('a.status','eq',1)
            ->where('a.type','eq',2)
            ->order('a.id desc')
            ->select();
        //获取标签关联活动
        $tag = Db::table('pb_focus')
            ->alias('a')
            ->join('pb_send b','a.id = b.focus_id','LEFT')
            ->join('pb_wechat_user_tag c','b.tagid = c.tagid','LEFT')
            ->field('a.id,a.title,a.publisher,a.create_time,a.status')
            ->where('c.userid',$userId)
            ->where('a.status','eq','1')
            ->where('a.type','eq',2)
            ->order('a.id desc')
            ->select();

        $arr = array_merge($dept,$tag);

        if(!empty($arr)){
            $key = 'id';//去重条件
            $tmp_arr = array();//声明数组
            foreach($arr as $k => $v) {
                if(in_array($v[$key], $tmp_arr)) {
                    //搜索$v[$key]是否在$tmp_arr数组中存在，若存在返回true
                    unset($arr[$k]); //删除掉数组（$arr）里相同ID的数组
                }else {
                    $tmp_arr[] = $v[$key]; //记录已有的id
                }
            }
            rsort($arr); // 排序

            //是否已阅读
            foreach ($arr as $key=>$value){
                $map = array(
                    'user_id' => $userId,
                    'focus_id' => $value['id'],
                );
                $view = FilenoteView::where($map)->find();
                if($view){
                    $value['is'] = 1;
                }else{
                    $value['is'] = 0;
                };
                $arr[$key] = $value;
            }

            $list = array();
            foreach ($arr as $key => $value){
                if($key < 10){
                    $list[] = $value;
                }
            }
        }else{
            $list = "";
        }
        $this->assign('list',$list);
        return $this->fetch();
    }

    /**
     * 文件通知加载更多
     */
    public function notemore(){
        $len = input('length');
        $userId = session('userId');
        //获取用户相关部门id或标签
        $dept = Db::table('pb_focus')
            ->alias('a')
            ->join('pb_send b','a.id = b.focus_id','LEFT')
            ->join('pb_wechat_department_user c','b.departmentid = c.departmentid','LEFT')
            ->field('a.id,a.title,a.publisher,a.create_time,a.status')
            ->where('c.userid',$userId)
            ->where('a.status','eq',1)
            ->where('a.type','eq',2)
            ->order('a.id desc')
            ->select();
        //获取标签关联活动
        $tag = Db::table('pb_focus')
            ->alias('a')
            ->join('pb_send b','a.id = b.focus_id','LEFT')
            ->join('pb_wechat_user_tag c','b.tagid = c.tagid','LEFT')
            ->field('a.id,a.title,a.publisher,a.create_time,a.status')
            ->where('c.userid',$userId)
            ->where('a.status','eq','1')
            ->where('a.type','eq',2)
            ->order('a.id desc')
            ->select();

        $arr = array_merge($dept,$tag);

        $key = 'id';//去重条件
        $tmp_arr = array();//声明数组
        foreach($arr as $k => $v) {
            if(in_array($v[$key], $tmp_arr)) {
                //搜索$v[$key]是否在$tmp_arr数组中存在，若存在返回true
                unset($arr[$k]); //删除掉数组（$arr）里相同ID的数组
            }else {
                $tmp_arr[] = $v[$key]; //记录已有的id
            }
        }
        rsort($arr); // 排序

        //是否已阅读
        foreach ($arr as $key=>$value){
            $map = array(
                'user_id' => $userId,
                'focus_id' => $value['id'],
            );
            $view = FilenoteView::where($map)->find();
            if($view){
                $value['is'] = 1;
            }else{
                $value['is'] = 0;
            };
            $arr[$key] = $value;
        }

        $list = array();
        foreach ($arr as $key => $value){
            $value['time'] = date("Y-m-d",$value['create_time']);
            if($key >= $len && $key < $len+10){
                $list[] = $value;
            }
        }
        if($list){
            return $this->success("加载成功","",$list);
        }else{
            return $this->error("加载失败");
        }

    }

    /**
     * 新闻详情页
     */
    public function newdetail(){
        //是否游客登录
        $this->anonymous();

        $this->jssdk();
        
        $id = input('id');
        $userId = session('userId');

        //浏览加一
        $info['views'] = array('exp','`views`+1');
        FocusModel::where('id',$id)->update($info);

        if($userId != "visitor"){
            //浏览不存在则存入pb_browse表
            $con = array(
                'user_id' => $userId,
                'focus_id' => $id,
            );
            $history = Browse::get($con);
            if(!$history && $id != 0){
                Browse::create($con);
                $s['score'] = array('exp','`score`+1');
                WechatUser::where('userid',$userId)->update($s);
            }
        }

        $list = FocusModel::get($id);
        $list['carousel'] = json_decode($list['carousel_images']);
        $list['user'] = session('userId');
        //分享图片及链接及描述
        $image = Picture::where('id',$list['front_cover'])->find();
        $list['share_image'] = "http://".$_SERVER['SERVER_NAME'].$image['path'];
        $list['link'] = "http://".$_SERVER['SERVER_NAME'].$_SERVER['REDIRECT_URL'];
        $list['desc'] = str_replace('&nbsp;','',strip_tags($list['content']));
        $this->assign('list',$list);

        //收藏
        $map = array(
            'focus_id' => $id,
            'user_id' => $userId,
        );
        $collect = Collect::where($map)->find();
        ($collect)?$collect = 1:$collect = 0;
        $this->assign('collect',$collect);

        //评论
        $map = array(
            'focus_id' => $id,
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
     * 新闻列表
     */
    public function newlist(){
        $class = input('class');
        //获取名称
        switch ($class){
            case 1:
                $name = "工委发布";
                break;
            case 2:
                $name = "省直动态";
                break;
            case 3:
                $name = "市县传真";
                break;
            default:
                break;
        }
        $this->assign('name',$name);

        //获取数据
        $map = array(
            'class' => $class,
            'type' => 1,
            'status' => 1,
        );
        $list = FocusModel::where($map)->limit(10)->select();
        $this->assign('list',$list);

        return $this->fetch();
    }

    /**
     * 新闻列表加载更多
     */
    public function newmore(){
        $class = input('class');
        $len = input("length");
        $map = array(
            'type' => 1,
            'class' => $class,
            'status' => array('eq',1)
        );
        $list = FocusModel::where($map)->limit($len,5)->select();
        foreach($list as $value){
            $img = Picture::get($value['front_cover']);
            $value['path'] = $img['path'];
            $value['time'] = date("Y-m-d",$value['create_time']);
        }
        if($list){
            return $this->success("加载成功","",$list);
        }else{
            return $this->error("加载失败");
        }
    }

    /**
     * 收藏操作
     */
    public function collect(){
        //执行收藏操作
        $collectModel = model('Collect');
        $focusId = input('id');
        $data = array(
            'user_id' => session('userId'), //用户openid
            'focus_id' => $focusId,
        );
        $collect = $collectModel::where($data)->find();

        if(empty($collect)){
            $data['type'] = 1; //聚焦新闻type

            $model = $collectModel->create($data);
            if($model){
                //新增收藏collect字段+1
                $info['collect'] = array('exp','`collect`+1');
                $id = FocusModel::where('id',$focusId)->update($info);
                if($id){
                    return $this->success('收藏成功', Cookie('__forward__'), true);
                }else{
                    return $this->error('收藏失败', Cookie('__forward__'), true);
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
                $id = FocusModel::where('id',$focusId)->update($info);
                if($id){
                    return $this->success('取消收藏成功', Cookie('__forward__'), true);
                }else{
                    return $this->error('取消收藏失败',Cookie('__forward__'), true);
                }
            } else {
                return $this->error('删除收藏失败', Cookie('__forward__'), true);
            }
        }
    }

    /**
     * 主页内容加载更多
     */
    public function listmore(){
        $len = input("length");
        $map = array(
            'type' => 1,
            'class' => input("type"),
            'status' => array('eq',1)
        );
        $list = FocusModel::where($map)->order('id desc')->limit($len,5)->select();
        foreach($list as $value){
            $img = Picture::get($value['list_image']);
            $value['path'] = $img['path'];
            $value['time'] = date("Y-m-d",$value['create_time']);
        }
        if($list){
            return $this->success("加载成功","",$list);
        }else{
            return $this->error("加载失败");
        }
    }

    /**
     * 加载更多评论
     */
    public function more(){
        $userId = session('userId');
        $id = input('focus_id');
        $total = input('total');
        $parentId = input('parent_id')?input('parent_id'):0;
        if($parentId == 0){
            //一级评论
            $map = array(
                'focus_id' => $id,
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
                        $content = $val['content'];
                        $str = strtr($content, $badword1);
                        $val['content'] = $str;
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
                'focus_id' => $id,
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


//    /**
//     * 前端待审核列表
//     */
//    public function reviewlist(){
//        $map['status'] = 0;
//        $list = Push::where($map)->order('create_time desc')->select();
//        foreach ($list as $value) {
//            $value['type'] == 1 ? $value['type_name'] = "企业号推送" : $value['type_name'] = "订阅号推送";
//            $focus = FocusModel::where('id',$value['focus_main'])->find();  //图文信息
//            $value['title'] = $focus['title'];
////            $img = Picture::where('id',$focus['front_cover'])->find();  //主图
//            $value['image'] = $focus['front_cover'];
//        }
//
//        $this->assign('list',$list);
//        return $this->fetch();
//    }
//
//    /**
//     * 已审核列表
//     */
//    public function passlist(){
//        $map = array(
//            'status' => array('in',[1,-1]),
//        );
//        $list = Push::where($map)->order('create_time desc')->select();
//        foreach ($list as $value) {
//            $value['type'] == 1 ? $value['type_name'] = "企业号推送" : $value['type_name'] = "订阅号推送";
//            $focus = FocusModel::where('id',$value['focus_main'])->find();  //图文信息
//            $value['title'] = $focus['title'];
//            $value['image'] = $focus['front_cover'];
//
//            $push = PushReview::where('push_id',$value['id'])->find();
//            $value['review_time'] = $push['review_time'];
//            $value['username'] = $push['username'];
//        }
//
//        $this->assign('list',$list);
//        return $this->fetch();
//    }
//
//    /**
//     * 审核发送
//     * status：1审核通过，-1审核不通过 0待审核
//     * type: 1 企业号推送， 2 订阅号推送
//     */
//    public function review(){
//        $userId = session('userId');
//        $user = WechatUser::where('userid',$userId)->find();
//        $username = $user['name'];
//        $msg = input('post.');
//        //新建pushreview数据
//        $data1 = array(
//            'push_id' => $msg['id'],
//            'userid' => $userId,
//            'username' => $username,
//            'status' => $msg['status'],
//        );
//
//        $this_info['status'] = $msg['status'];   //更新push表状态
//        if($msg['type'] == 1) { //企业号推送
//            if($msg['status'] == 1) {   //通过
//                $new = PushReview::create($data1);
//                if($new){
//                    //发送消息
//                    $data = Push::where('id',$msg['id'])->find();
//                    $arr1 = $data['focus_main'];    //主图文id
//                    !empty($data['focus_vice']) ? $arr2 = json_decode($data['focus_vice']) : $arr2 = "";    //副图文id
//                    //主图文信息
//                    $focus1 = FocusModel::where('id',$arr1)->find();
//                    switch ($focus1['class']){
//                        case 1:
//                            $pre1 = "【工委发布】";
//                            break;
//                        case 2:
//                            $pre1 = "【省直动态】";
//                            break;
//                        case 3:
//                            $pre1 = "【市县传真】";
//                            break;
//                        default:
//                            $pre1 = "【无】";
//                            break;
//                    }
//                    $title1 = $focus1['title'];
//                    $str1 = strip_tags($focus1['content']);
//                    $des1 = mb_substr($str1,0,40);
//                    $url1 = "http://party.0571ztnet.com/home/focus/newdetail/id/".$focus1['id'].".html";
//                    $img1 = Picture::get($focus1['front_cover']);
//                    $path1 = "http://party.0571ztnet.com".$img1['path'];
//                    $information1 = array(
//                        "title" => $pre1.$title1,
//                        "description" => $des1,
//                        "url" => $url1,
//                        "picurl" => $path1,
//                    );
//
//                    $information = array();
//                    if(!empty($arr2)) {
//                        //副图文信息
//                        $information2 = array();
//                        foreach ($arr2 as $key=>$value){
//                            $focus = FocusModel::where('id',$value)->find();
//                            switch ($focus['class']){
//                                case 1:
//                                    $pre = "【工委发布】";
//                                    break;
//                                case 2:
//                                    $pre = "【省直动态】";
//                                    break;
//                                case 3:
//                                    $pre = "【市县传真】";
//                                    break;
//                                default:
//                                    $pre = "【无】";
//                                    break;
//                            }
//                            $title = $focus['title'];
//                            $str = strip_tags($focus['content']);
//                            $des = mb_substr($str,0,40);
//                            $url = "http://party.0571ztnet.com/home/focus/newdetail/id/".$focus['id'].".html";
//                            $img = Picture::get($focus['front_cover']);
//                            $path = "http://party.0571ztnet.com".$img['path'];
//                            $info = array(
//                                "title" => $pre.$title,
//                                "description" => $des,
//                                "url" => $url,
//                                "picurl" => $path,
//                            );
//                            $information2[] = $info;
//                        }
//
//                        //数组合并，主图文放在首位
//                        foreach ($information2 as $k=>$v){
//                            $information[0] = $information1;
//                            $information[$k+1] = $v;
//                        }
//                    }else{
//                        $information[0] = $information1;
//                    }
//
//                    //重组成article数据
//                    $send = array();
//                    $re[] = $information;
//                    foreach ($re as $key => $value){
//                        $key = "articles";
//                        $send[$key] = $value;
//                    }
//
//                    //发送给服务号
//                    $Wechat = new TPQYWechat(Config::get('party'));
//                    $message = array(
//                        'totag' => "18", //审核标签用户
////                        "touser" => "lb",   //发送给全体，@all
//                        "msgtype" => 'news',
//                        "agentid" => 14,
//                        "news" => $send,
//                        "safe" => "0"
//                    );
//                    $suc = $Wechat->sendMessage($message);
//                    if($suc['errcode'] == 0){
//                        Push::where('id',$msg['id'])->update($this_info);    //改变推送状态
//                        return $this->success("审核通过，已推送消息");
//                    };
//                }
//            }else{  //不通过
//                $new = PushReview::create($data1);   //记录
//                if($new){
//                    Push::where('id',$msg['id'])->update($this_info);
//                    return $this->error("审核不通过");
//                }
//            }
//        }else { //订阅号推送
//
//        }
//
//    }


}