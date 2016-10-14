<?php
/**
 * Created by PhpStorm.
 * User: Lxx<779219930@qq.com>
 * Date: 2016/4/20
 * Time: 15:34
 */

namespace app\home\controller;
use app\home\model\Activity;
use app\home\model\ActivityEnroll;
use app\home\model\Collect;
use app\home\model\Comment;
use app\home\model\Course;
use app\home\model\CourseStudy;
use app\home\model\Focus;
use app\home\model\Message;
use app\home\model\UserWorklog;
use app\home\model\WechatUser;
use think\Controller;
use think\Db;
use think\Input;

/**
 * Class User
 * 用户个人中心
 */
class User extends Base {
    /**
     * 个人中心主页
     */
    public function index(){
        //是否游客登录
        $this->anonymous();
        
        $userId = session('userId');
        save_log($userId,'User');
        $user = WechatUser::where('userid',$userId)->find();
        $this->assign('user',$user);

        $map = array(
            'receive_id' => $userId,
            'status' => 0,
            );
        $message = Message::where($map)->select();
        $messageNumber = count($message);
        $this->assign('number',$messageNumber);

        return $this->fetch();
    }

    /**
     * 个人设置页
     */
    public function setting(){
        $userId = session('userId');
        $user = WechatUser::where('userid',$userId)->find();
        $this->assign('user',$user);

        return $this->fetch();
    }

    /**
     * 设置昵称
     */
    public function setName(){
        $nickname = array('nickname' => input('nickname'));
        if(!empty($nickname)){
            $data = WechatUser::where('userid',session('userId'))->update($nickname);
            if($data){
                return $this->success('修改成功','',$nickname);
            }else{
                return $this->error('修改失败');
            }
        }else{
            return $this->error('昵称不能为空!');
        }

    }

    /**
     * 设置头像
     */
    public function setHeader(){
        $userId = session('userId');
        $header = input('header');
        $map = array(
            'header' => $header,
        );
        $info = WechatUser::where('userid',$userId)->update($map);
        if($info){
            return $this->success("修改成功");
        }else{
            return $this->error("修改失败");
        }
    }

    /**
     * 我的活动
     */
    public function myactivity(){
        $userId = session('userId');
        $time = time();
        //参加的活动
        $list = Db::table('pb_activity_enroll')
            ->alias('a')
            ->join('activity b','a.activity_id = b.id')
            ->where('a.user_id','eq',$userId)
            ->where('a.type','eq',1)
            ->where('a.status','egt',0)
            ->order('b.id desc')
            ->select();

        foreach($list as $key=>$value){
            //删除了则失效
            $act = Activity::get($value['activity_id']);
            $value['act_status'] = $act['status'];

            $start = $value['start_time'];
            $end = $value['end_time'];
            if($time < $start){
                $value['class'] = -1;
            }elseif($time >= $start && $time <= $end){
                $value['class'] = 0;
            }else{
                $value['class'] = 1;
            }
            $list[$key] = $value;
        }
        $this->assign('list',$list);

        //收藏的活动
        $collect = Db::table('pb_collect')
            ->alias('a')
            ->join('activity b','a.activity_id = b.id')
            ->where('a.user_id','eq',$userId)
            ->where('a.activity_id','not null')
            ->where('a.status','egt',0)
            ->order('b.id desc')
            ->select();

        foreach($collect as $key=>$val){
            //删除了则失效
            $act = Activity::get($val['activity_id']);
            $val['act_status'] = $act['status'];

            $start = $val['start_time'];
            $end = $val['end_time'];
            if($time < $start){
                $val['class'] = -1;
            }elseif($time >= $start && $time <= $end){
                $val['class'] = 0;
            }else{
                $val['class'] = 1;
            }
            $collect[$key] = $val;
        }
        $this->assign('collect',$collect);

        return $this->fetch();
    }

    /**
     * 我的活动删除
     */
    public function activity_del(){
        $type = input('sta');
        $id = input('id');
        $userId = session('userId');
        //删除条件
        $map = array(
            'status' => -1,
        );
        //查询条件
        $info = array(
            'activity_id' => $id,
            'user_id' => $userId,
        );
        if($type == 0){        //已参加删除
            $model = ActivityEnroll::where($info)->update($map);
            $info1['enrollnumber'] = array('exp','`enrollnumber`-1');
            Activity::where('id',$id)->update($info1);
        }else{      //已收藏删除
            $model = Collect::where($info)->delete();
            $info2['collect'] = array('exp','`collect`-1');
            Activity::where('id',$id)->update($info2);
        }
        if($model){
            return $this->success("删除成功");
        }else{
            return $this->error("删除失败");
        }
    }

    /**
     * 我的阅读
     */
    public function myread(){

        $list = Db::table('pb_collect')
            ->alias('a')
            ->join('focus b','a.focus_id = b.id')
            ->where('a.user_id','eq',session('userId'))
            ->where('a.focus_id','not null')
            ->where('a.status','egt',0)
            ->order('b.id desc')
            ->select();

        foreach($list as $k=>$value){
            $focus = Focus::get($value['focus_id']);
            $value['focus_status'] = $focus['status'];
            $list[$k] = $value;
        }
        $number = count($list);
        $this->assign('number',$number);
        $this->assign('list',$list);

        return $this->fetch();
    }

    /**
     * 阅读删除
     */
    public function read_del(){
        $id = input('id');
        $userId = session('userId');
        $map = array(
            'focus_id' => $id,
            'user_id' => $userId,
        );
        $model = Collect::where($map)->delete();
        if($model){
            $info['collect'] = array('exp','`collect`-1');
            Focus::where('id',$id)->update($info);
            return $this->success("删除成功");
        }else{
            return $this->error("删除失败");
        }
    }

    /**
     * 我的课程
     */
    public function mycourse(){
        $userId = session('userId');
        //我的学习
        $list = Db::table('pb_course_study')
            ->alias('a')
            ->join('course b','a.course_id = b.id')
            ->where('a.user_id','eq',$userId)
            ->where('a.status','egt',0)
            ->order('b.id desc')
            ->select();


        //获取状态改变我的课程值
        foreach ($list as $key => $value){
            $course = Course::get($value['id']);
            $value['c_status'] = $course['status'];
            $list[$key] = $value;
        }
        $this->assign('course',$list);

        //我的收藏
        $collect = Db::table('pb_collect')
            ->alias('a')
            ->join('course b','a.course_id = b.id')
            ->where('a.user_id','eq',$userId)
            ->where('a.course_id','not null')
            ->where('a.status','egt',0)
            ->order('b.id desc')
            ->select();

        foreach ($collect as $k => $val){
            $course = Course::get($val['course_id']);
            $val['c_status'] = $course['status'];
            $collect[$k] = $val;
        }

        $this->assign('collect',$collect);
        return $this->fetch();
    }

    /**
     * 删除
     */
    public function course_del(){
        $type = input('sta');
        $id = input('id');
        $userId = session("userId");
        $map = array(
            'course_id' => $id,
            'user_id' => $userId,
        );
        $info['status'] = -1;
        if($type == 0){        //已学习删除
            $model = CourseStudy::where($map)->update($info);
        }else{                 //已收藏删除
            $model = Collect::where($map)->delete();
            $info1['collect'] = array('exp','`collect`-1');
            Course::where('id',$id)->update($info1);
        }
        if($model){
            return $this->success("删除成功");
        }else{
            return $this->error("删除失败");
        }
    }

    /**
     * 我的消息
     */
    public function mymessage(){
        $userId = session('userId');
        /*@我*/
        $map = array(
            'receive_id' => $userId,
            'type' => array('in','2,5'),
            'status' => array('egt',0),
        );
        $comment = Message::where($map)->limit(5)->order('id desc')->select();
        $this->assign('comment',$comment);
        //未读消息数
        $info = array(
            'receive_id' => $userId,
            'type' => array('in','2,5'),
            'status' => 0,
        );
        $Number = Message::where($info)->select();
        $commentNumber = count($Number);
        $this->assign('commentNumber',$commentNumber);

        /*赞我*/
        $map1 = array(
            'receive_id' => $userId,
            'type' => 3,
            'status' => array('egt',0),
        );
        $like = Message::where($map1)->limit(10)->order('id desc')->select();
        $this->assign('like',$like);//前台评论内容未输出
        //赞我未读
        $info1 = array(
            'receive_id' => $userId,
            'type' => 3,
            'status' => 0,
        );
        $Number1 = Message::where($info1)->select();
        $likeNumber = count($Number1);
        $this->assign('likeNumber',$likeNumber);

        /*通知*/
        $map2 = array(
            'receive_id' =>$userId,
            'type' => 4,
            'status' => array('egt',0),
        );
        $note = Message::where($map2)->limit(5)->order('id desc')->select();
        $this->assign('note',$note);

        //未读通知
        $info2 = array(
            'receive_id' =>$userId,
            'type' => 4,
            'status' => 0,
        );
        $Number2 = Message::where($info2)->select();
        $noteNumber = count($Number2);
        $this->assign('noteNumber',$noteNumber);

        return $this->fetch();
    }

    /**
     * 加载更多
     */
    public function moremessage(){
        $userId = session('userId');
        $sta = input('type');
        $length = input('length');
        if(IS_POST){
            //根据传递的sta值判断切换的是什么标签
            switch($sta){
                case 0:
                    $map = array(
                        'receive_id' => $userId,
                        'type' => array('in','2,5'),
                    );
                    $msg = Message::where($map)->limit($length,5)->order('id desc')->select();
                    $list = array();
                    foreach($msg as $value){
                        $value['header'] = $value->user->header;
                        $value['nickname'] = $value->user->nickname;
                        $value['time'] = date("Y.m.d",$value['create_time']);
                        $value['c_content'] = $value->comment->content;
                        $list[] = $value;
                    }
                    break;
                case 1:
                    $map = array(
                        'receive_id' => $userId,
                        'type' => array('in','3'),
                    );
                    $msg = Message::where($map)->limit($length,10)->order('id desc')->select();
                    $list = array();
                    foreach($msg as $value){
                        $value['header'] = $value->user->header;
                        $value['nickname'] = $value->user->nickname;
                        $value['time'] = date("Y.m.d",$value['create_time']);
                        $list[] = $value;
                    }
                    break;
                case 2:
                    $map = array(
                        'receive_id' => $userId,
                        'type' => array('in','4'),
                    );
                    $msg = Message::where($map)->limit($length,5)->order('id desc')->select();
                    $list = array();
                    foreach($msg as $value){
                        $value['name'] = $value->activity->name;
                        $value['date'] = $value->activity->date;
                        $value['address'] = $value->activity->address;
                        $list[] = $value;
                    }
                    break;
                default:
                    break;
            }
            if($list){
                return $this->success('加载成功','',$list);
            }else{
                return $this->error('加载失败，已全部加载');
            }
        }


    }

    /**
     * 回复消息
     */
    public function replay(){
        $data = array(
            'title' => input('title'),
            'receive_id' => input('receive_id'),
            'content' => input('content'),
            'create_user' => session('userId'),
            'type' => 5,
        );
        $message = Message::create($data);
        if($message){
            return $this->success('回复成功');
        }else{
            return $this->error('回复失败');
        }
    }

    /**
     * 改变消息状态显示已读
     */
    public function setStatus(){
        $userId = session('userId');
        //0 @我，1赞我，2通知
        $class = input('class');
        $info = array('status'=> 1);
        switch($class){
            case 0:
                $map = array(
                    'receive_id' => $userId,
                    'type' => array('in','2,5'),
                    'status' => array('egt',0),
                );
                $result = Message::where($map)->update($info);
                break;
            case 1:
                $map1 = array(
                    'receive_id' => $userId,
                    'type' => 3,
                    'status' => array('egt',0),
                );
                $result = Message::where($map1)->update($info);
                break;
            case 2:
                $map2 = array(
                    'receive_id' => $userId,
                    'type' => 4,
                    'status' => array('egt',0),
                );
                $result = Message::where($map2)->update($info);
                break;
            default:
                break;
        };
        if($result){
            return $this->success('改变成功');
        }else{
            return $this->error('改变失败');
        }
    }

    /**
     * 工作日志添加页面
     */
    public function worklog(){
        if(IS_POST){
            //前台post提交表单
            $data = input('post.');
            $data['create_user'] = session('userId');
            $Model = new UserWorklog();
            $result = $Model->validate(true)->save($data);
            if(false === $result){
                return $this->error($Model->getError());
            }else{
                return $this->success("提交成功");
            }
        }else{
            return $this->fetch();
        }
    }

    /**
     * 工作日志列表
     */
    public function loglist(){
        $userId = session('userId');
        if(IS_POST){
            $year = input('year');
            $month = input('month');
            //只选取年份，默认为所有
            if($year && $month == 0){
                $info = array(
                    "FROM_UNIXTIME(create_time,'%Y')"  => $year,
                    "create_user" => $userId,
                );
                $all = UserWorklog::where($info)->order('id desc')->select();
                //重组用key值分组
                $list = array();
                foreach($all as $value){
                    $value['day'] = date("d",$value['create_time']);
                    $k = date("n",$value['create_time']);
                    $list[$k][] = $value;
                }
                return $this->success('','',$list);
            }else{
                //查询当前年份下对应月份的内容，无则为空
               $info = array(
                   "FROM_UNIXTIME(create_time,'%Y%c')"  => $year.$month,
                   "create_user" => $userId,
               );
                $all = UserWorklog::where($info)->order('id desc')->select();
                //重组用key值分组
                $list = array();
                foreach($all as $value){
                    $value['day'] = date('d',$value['create_time']);
                    $k = date("n",$value['create_time']);
                    $list[$k][] = $value;
                }
                krsort($list);
                return $this->success('','',$list);
            }

        }else{
            //获取全部共同数据年份
            $years = UserWorklog::all(function($query){
                $query->group("FROM_UNIXTIME(create_time,'%Y')")->field("FROM_UNIXTIME(create_time,'%Y') as year");
            });
            $this->assign('years',$years);

            //当前年份初始化数据
            $nowyear = date('Y',time());
            $info = array(
                "FROM_UNIXTIME(create_time,'%Y')"  => $nowyear,
                "create_user" => $userId,
            );
            $lists = UserWorklog::where($info)->order('id desc')->select();
            //重组用key值分组
            $list = array();
            foreach($lists as $value){
                $k = date("n",$value['create_time']);
                $list[$k][] = $value;
            }
            krsort($list);
            $this->assign('list',$list);

            return $this->fetch();
        }
    }

    /**
     * 查看工作日志页
     */
    public function logview(){
        $id =  input('id');
        $log = UserWorklog::where('id',$id)->find();
        $this->assign('log',$log);

        return $this->fetch();
    }

}
