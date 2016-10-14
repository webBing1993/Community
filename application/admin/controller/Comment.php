<?php
/**
 * Created by PhpStorm.
 * User: Lxx<779219930@qq.com>
 * Date: 2016/6/26
 * Time: 19:05
 */
namespace app\admin\controller;
use app\admin\model\Comment as CommentModel;
use app\admin\model\Course;
use app\admin\model\Focus;
use app\admin\model\Activity;
use app\admin\model\Message;

/**
 * 评论管理
 */
class Comment extends Admin {
    /**
     * 一级评论列表
     */
    public function index(){
        $map = array(
            'parent_id' => 0,
            'status' => array('egt',0),
        );
        $list = $this->lists("Comment", $map);
        int_to_string($list, array(
            'type' => array(1=>'活动评论',2=>'新闻评论',3=>'课程评论',4=>'兴趣爱好评论'),
        ));
        $this->assign('list',$list);

        return $this->fetch();
    }

    /**
     * 二级评论列表
     */
    public function second(){
        $id = input('id');
        $map = array(
            'parent_id' => $id,
            'status' => array('egt',0),
        );
        $list = $this->lists("Comment", $map);
        int_to_string($list, array(
            'type' => array(1=>'活动评论',2=>'新闻评论',3=>'课程评论',4=>'兴趣爱好评论'),
        ));
        $this->assign('list',$list);

        return $this->fetch();
    }
    
    /**
     *删除评论
     */
    public function del(){
        $id = input('id');
        $map['status'] = -1;
        $result = CommentModel::where('id',$id)->update($map);
        if($result){
            //删除成功评论数减一
            $info['comments'] = array('exp','`comments`-1');
            $comments = CommentModel::where('id',$id)->find();
            $activityId = $comments['activity_id'] ? $comments['activity_id'] : 0;
            $focusId = $comments['focus_id'] ? $comments['focus_id'] : 0;
            $courseId = $comments['course_id'] ? $comments['course_id'] : 0;
            $topicId = $comments['topic_id'] ? $comments['topic_id'] : 0;
            if($activityId){ Activity::where('id',$activityId)->update($info);}
            if($focusId){ Focus::where('id',$focusId)->update($info);}
            if($courseId){ Course::where('id',$courseId)->update($info);}

            //关联删除二级评论
            $res = CommentModel::where('parent_id',$id)->update($map);
            if($res){
                if($activityId){ Activity::where('id',$activityId)->update($info);}
                if($focusId){ Focus::where('id',$focusId)->update($info);}
                if($courseId){ Course::where('id',$courseId)->update($info);}
            }

            //发送信息 默认为0  现在设置为1  已读
            $data = array(
                'content' => '您的评论不符合平台言论的规范性，系统已将它删除',
                'receive_id' => $comments['create_user'],
                'activity_id' => $activityId,
                'focus_id' => $focusId,
                'course_id' => $courseId,
                'topic_id' => $topicId,
                'comment_id' => $id,
                'type' => 6,
                'create_user' => 0,
                'status' => 1,
            );
            Message::create($data);
            return $this->success('删除成功');
        }else{
            return $this->error('删除失败');
        }
        
    }
}