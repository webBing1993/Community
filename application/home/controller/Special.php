<?php
/**
 * Created by PhpStorm.
 * User: Lxx<779219930@qq.com>
 * Date: 2016/4/20
 * Time: 15:16
 */

namespace app\home\controller;
use app\home\model\Browse;
use app\home\model\Collect;
use app\home\model\Comment;
use app\home\model\LikeLog;
use app\home\model\Picture;
use app\home\model\Course;
use app\home\model\CourseStudy;
use app\home\model\Message;
use app\home\model\Special as SpecialModel;
use app\home\model\Topic;
use app\home\model\WechatUser;
use think\Controller;
use think\Db;
use think\Input;

/**
 * Class Special
 * 品牌特色
 */
class Special extends Base {
    /**
     * 专题主页
     */
    public function index(){
        //是否游客登录
        $this->anonymous();

        $userId = session('userId');
        save_log($userId, 'Course'); //计入统计分析表

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

        //专题显示
        $special = SpecialModel::get(function($query){
            $query->where('status = 1')->order('id desc')->limit(1);
        });
        $this->assign('special',$special);

        //热门推荐显示,获取最新专题内容
        $map = array(
//            'special_id' => $special['id'],
            'recommend' => 1,
            'status' => array('eq',1),
            'class' => 1,
        );
        $recommend = Course::all(function($query) use($map){
            $query->where($map)->order('create_time desc')->limit(3);
        });
        foreach($recommend as $value){
            switch($value['retype']){
                case 1:
                    $value['retype_text'] = "微党课";
                    break;
                case 2:
                    $value['retype_text'] = "好案例";
                    break;
                case 3:
                    $value['retype_text'] = "新成果";
                    break;
                default:
                    $value['retype_text'] = "暂无";
                    break;
            }
        }
        $this->assign('recommend',$recommend);

        //兴趣爱好
        $map1 = array(
            'class' => 2,
            'status' => array('eq',1),
        );
        $interests = Course::where($map1)->order('id desc')->limit(0,5)-> select();
        $this->assign('interests',$interests);

        return $this->fetch();
    }

    /**
     * 专题详情列表
     */
    public function specialview(){
        $id = input('id');
        $special = SpecialModel::get($id);
        $info = array(
            'special_id' => $id,
            'status' => array('eq',1),
        );
        $course = Course::where($info)->order('id desc')->select();
        foreach($course as $val){
            switch($val['retype']){
                case 1:
                    $val['retype_text'] = "微党课推荐";
                    break;
                case 2:
                    $val['retype_text'] = "好案例推荐";
                    break;
                case 3:
                    $val['retype_text'] = "新成果推荐";
                    break;
                default:
                    $val['retype_text'] = "暂无";
                    break;
            }
        }
        $special['course'] = $course;

        $this->assign('special',$special);

        return $this->fetch();
    }

    /**
     * 往期专题列表
     */
    public function speciallist(){
        $userId = session('userId');
        save_log($userId,'Course');
        //微党课
        $map1 = array(
            'status' => array('eq',1),
            'class' => 1,
        );
        $list1 = SpecialModel::all(function($query) use($map1){
            $query->where($map1)->order('number desc')->limit(0,5);
        });
        foreach($list1 as $value){
            $id = $value['id'];
            $info = array(
                'special_id' => $id,
                'status' => array('eq',1),
            );
            $course = Course::all(function($query) use($info){
                $query->where($info)->order('id desc');
            });
            foreach($course as $val){
                switch($val['retype']){
                    case 1:
                        $val['retype_text'] = "微党课推荐";
                        break;
                    case 2:
                        $val['retype_text'] = "好案例推荐";
                        break;
                    case 3:
                        $val['retype_text'] = "新成果推荐";
                        break;
                    default:
                        $val['retype_text'] = "暂无";
                        break;
                }
            }
            $value['course'] = $course;
        }
        $this->assign('list1',$list1);

        //新成果
        $map2 = array(
            'status' => array('eq',1),
            'class' => 2,
        );
        $list2 = SpecialModel::all(function($query) use($map2){
            $query->where($map2)->order('number desc')->limit(0,5);
        });
        foreach($list2 as $value){
            $id = $value['id'];
            $info = array(
                'special_id' => $id,
                'status' => array('eq',1),
            );
            $course = Course::all(function($query) use($info){
                $query->where($info)->order('id desc');
            });
            foreach($course as $val){
                switch($val['retype']){
                    case 1:
                        $val['retype_text'] = "微党课推荐";
                        break;
                    case 2:
                        $val['retype_text'] = "好案例推荐";
                        break;
                    case 3:
                        $val['retype_text'] = "新成果推荐";
                        break;
                    default:
                        $val['retype_text'] = "暂无";
                        break;
                }
            }
            $value['course'] = $course;
        }
        $this->assign('list2',$list2);

        //好案例
        $map3 = array(
            'status' => array('eq',1),
            'class' => 3,
        );
        $list3 = SpecialModel::all(function($query) use($map3){
            $query->where($map3)->order('number desc')->limit(0,5);
        });
        foreach($list3 as $value){
            $id = $value['id'];
            $info = array(
                'special_id' => $id,
                'status' => array('eq',1),
            );
            $course = Course::all(function($query) use($info){
                $query->where($info)->order('id desc');
            });
            foreach($course as $val){
                switch($val['retype']){
                    case 1:
                        $val['retype_text'] = "微党课推荐";
                        break;
                    case 2:
                        $val['retype_text'] = "好案例推荐";
                        break;
                    case 3:
                        $val['retype_text'] = "新成果推荐";
                        break;
                    default:
                        $val['retype_text'] = "暂无";
                        break;
                }
            }
            $value['course'] = $course;
        }
        $this->assign('list3',$list3);

        return $this->fetch();
    }

    /**
     * 往期专题加载更多
     */
    public function listmore(){
        $class = input('class');
        $len = input('length');
        $map = array(
            'class' => $class,
            'status' => array('eq',1),
        );
        $list = SpecialModel::all(function($query) use($map,$len){
            $query->where($map)->order('number desc')->limit($len,5);
        });
        if($list){
            foreach($list as $value){
                $id = $value['id'];
                $info = array(
                    'special_id' => $id,
                    'status' => array('eq',1),
                );
                $course = Course::all(function($query) use($info){
                    $query->where($info)->order('id desc');
                });
                foreach($course as $val){
                    $img = Picture::get($val['front_cover']);
                    $val['path'] = $img['path'];
                    switch($val['retype']){
                        case 1:
                            $val['retype_text'] = "微党课推荐";
                            break;
                        case 2:
                            $val['retype_text'] = "好案例推荐";
                            break;
                        case 3:
                            $val['retype_text'] = "新成果推荐";
                            break;
                        default:
                            $val['retype_text'] = "暂无";
                            break;
                    }
                }
                $value['course'] = $course;
            }
            return $this->success('加载成功','',$list);
        }else{
            return $this->error('加载失败,已完成');
        }
    }

    /**
     * 视频课程详情页
     */
    public function video(){
        //是否游客登录
        $this->anonymous();
        //获取签名包
        $this->jssdk();
        
        $id = input('id');
        $userId = session('userId');

        //浏览自动+1
        $info['views'] = array('exp','`views`+1');
        Course::where('id',$id)->update($info);

        if($userId != "visitor"){
            //浏览不存在则存入pb_browse表
            $con = array(
                'user_id' => $userId,
                'course_id' => $id,
            );
            $history = Browse::get($con);
            if(!$history && $id != 0){
                Browse::create($con);
                $s['score'] = array('exp','`score`+1');
                WechatUser::where('userid',$userId)->update($s);
            }
        }

        //课程信息
        $list = Course::where('id',$id)->find();
        //分享图片及链接及描述
        $image = Picture::where('id',$list['front_cover'])->find();
        $list['share_image'] = "http://".$_SERVER['SERVER_NAME'].$image['path'];
        $list['link'] = "http://".$_SERVER['SERVER_NAME'].$_SERVER['REDIRECT_URL'];
        $list['desc'] = str_replace('&nbsp;','',strip_tags($list['content']));
        $this->assign('list',$list);
        
        if($list['class'] == 1 && $userId != "visitor"){
            //点击浏览后不存在则插入course_study表
            $data = array(
                'course_id' => $id,
                'user_id' => $userId,
            );
            $map = CourseStudy::get($data);
            if($map == false){
                CourseStudy::create($data);
                //学习数+1
                $msg['study'] = array('exp','`study`+1');
                Course::where('id',$id)->update($msg);
            }
        }

        //收藏
        $map = array(
            'course_id' => $id,
            'user_id' => $userId,
        );
        $collect = Collect::where($map)->find();
        ($collect)?$collect = 1:$collect = 0;
        $this->assign('collect',$collect);

        //敏感词屏蔽
        $badword = array(
            '法轮功','法轮','FLG','六四','6.4','flg'
        );
        $badword1 = array_combine($badword,array_fill(0,count($badword),'***'));
        //话题评论
        $con = array(
            'course_id' => $id,
            'status' => 1,
        );
        $topic = Topic::where($con)->select();
        foreach($topic as $k=>$va){
            //评论
            $map = array(
                'topic_id' => $va['id'],
                'parent_id' => 0,
                'status' => array('egt',0)
            );
            $comment = Comment::where($map)->limit(0,5)->order('likes desc,id desc')->select();
            foreach($comment as $value){
                $content = $value['content'];
                $str = strtr($content, $badword1);
                $value['content'] = $str;
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
                    $val['nickname'] = $name['nickname'] ? $name['nickname'] : $name['name'];
                }
                $value['notes'] = $second;
            }
            $va['comment'] = $comment;
        }
        $this->assign('comment',json_encode($topic));

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
     * 文章课程详情页
     */
    public function article(){
        //是否游客登录
        $this->anonymous();
        //获取签名包
        $this->jssdk();
        
        $id = input('id');
        $userId = session('userId');

        //浏览自动+1
        $info['views'] = array('exp','`views`+1');
        Course::where('id',$id)->update($info);

        if($userId != "visitor"){
            //浏览不存在则存入pb_browse表
            $con = array(
                'user_id' => $userId,
                'course_id' => $id,
            );
            $history = Browse::get($con);
            if(!$history && $id != 0){
                Browse::create($con);
                $s['score'] = array('exp','`score`+1');
                WechatUser::where('userid',$userId)->update($s);
            }
        }

        $list = Course::where('id',$id)->find();
        $list['carousel'] = json_decode($list['carousel_images']);
        //分享图片及链接及描述
        $image = Picture::where('id',$list['front_cover'])->find();
        $list['share_image'] = "http://".$_SERVER['SERVER_NAME'].$image['path'];
        $list['link'] = "http://".$_SERVER['SERVER_NAME'].$_SERVER['REDIRECT_URL'];
        $list['desc'] = str_replace('&nbsp;','',strip_tags($list['content']));
        $this->assign('list',$list);

        if($list['class'] == 1 && $userId != "visitor"){
            //点击浏览后不存在则插入course_study表
            $data = array(
                'course_id' => $id,
                'user_id' => $userId,
            );
            $map = CourseStudy::get($data);
            if($map == false){
                CourseStudy::create($data);
                //学习数+1
                $msg['study'] = array('exp','`study`+1');
                Course::where('id',$id)->update($msg);
            }
        }

        //收藏
        $map = array(
            'course_id' => $id,
            'user_id' => $userId,
        );
        $collect = Collect::where($map)->find();
        ($collect)?$collect = 1:$collect = 0;
        $this->assign('collect',$collect);

        $con = array(
            'course_id' => $id,
            'status' => 1,
        );
        //敏感词屏蔽
        $badword = array(
            '法轮功','法轮','FLG','六四','6.4','flg'
        );
        $badword1 = array_combine($badword,array_fill(0,count($badword),'***'));
        //话题评论
        $topic = Topic::where($con)->select();
        foreach($topic as $k=>$va){
            //评论
            $map = array(
                'topic_id' => $va['id'],
                'parent_id' => 0,
                'status' => array('egt',0)
            );
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
                    $val['nickname'] = $name['nickname'] ? $name['nickname'] : $name['name'];
                }
                $value['notes'] = $second;
            }
            $va['comment'] = $comment;
        }
        $this->assign('comment',json_encode($topic));

//        dump($topic);
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
     * 话题评论更多
     */
    public function commentmore(){
        $userId = session('userId');
        $topicId = input('topic_id');
        $total = input('total');
        $parentId = input('parent_id')?input('parent_id'):0;
        if($parentId == 0){
            //敏感词屏蔽
            $badword = array(
                '法轮功','法轮','FLG','六四','6.4','flg'
            );
            $badword1 = array_combine($badword,array_fill(0,count($badword),'***'));
            //一级评论
            $map = array(
                'topic_id' => $topicId,
                'parent_id' => 0,
                'status' => array('egt',0)
            );
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
                'topic_id' => $topicId,
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
     * 兴趣爱好视频主页
     */
    public function interestvideo() {
        //是否游客登录
        $this->anonymous();

        $this->jssdk();

        $id = input('id');
        $userId = session('userId');

        //浏览自动+1
        $map['views'] = array('exp', '`views`+1');
        Course::where('id', $id)->update($map);

        if ($userId != "visitor"){
                //浏览不存在则存入pb_browse表
                $con = array(
                    'user_id' => $userId,
                    'course_id' => $id,
                );
            $history = Browse::get($con);
            if (!$history && $id != 0) {
                Browse::create($con);
                $s['score'] = array('exp', '`score`+1');
                WechatUser::where('userid', $userId)->update($s);
            }
        }

        //收藏
        $map = array(
            'course_id' => $id,
            'user_id' => $userId,
        );
        $collect = Collect::where($map)->find();
        ($collect)?$collect = 1:$collect = 0;
        $this->assign('collect',$collect);

        //视频信息
        $info = Course::get($id);
        //分享图片及链接及描述
        $image = Picture::where('id',$info['front_cover'])->find();
        $info['share_image'] = "http://".$_SERVER['SERVER_NAME'].$image['path'];
        $info['link'] = "http://".$_SERVER['SERVER_NAME'].$_SERVER['REDIRECT_URL'];
        $info['desc'] = str_replace('&nbsp;','',strip_tags($info['content']));
        $this->assign('list',$info);

        //敏感词屏蔽
        $badword = array(
            '法轮功','法轮','FLG','六四','6.4','flg'
        );
        $badword1 = array_combine($badword,array_fill(0,count($badword),'***'));
        //评论
        $map = array(
            'course_id' => $id,
            'parent_id' => 0,
            'status' => array('egt',0)
        );
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
                $val['nickname'] = $name['nickname'] ? $name['nickname'] : $name['name'];
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
     * 兴趣爱好文章主页
     */
    public function interestarticle(){
        //是否游客登录
        $this->anonymous();

        $this->jssdk();

        $id = input('id');
        $userId = session('userId');

        //浏览自动+1
        $map['views'] = array('exp','`views`+1');
        Course::where('id',$id)->update($map);

        if($userId != "visitor"){
            //浏览不存在则存入pb_browse表
            $con = array(
                'user_id' => $userId,
                'course_id' => $id,
            );
            $history = Browse::get($con);
            if(!$history && $id != 0){
                Browse::create($con);
                $s['score'] = array('exp','`score`+1');
                WechatUser::where('userid',$userId)->update($s);
            }
        }

        //收藏
        $map = array(
            'course_id' => $id,
            'user_id' => $userId,
        );
        $collect = Collect::where($map)->find();
        ($collect)?$collect = 1:$collect = 0;
        $this->assign('collect',$collect);

        //文章信息
        $info = Course::get($id);
        $info['carousel'] = json_decode($info['carousel_images']);
        //分享图片及链接及描述
        $image = Picture::where('id',$info['front_cover'])->find();
        $info['share_image'] = "http://".$_SERVER['SERVER_NAME'].$image['path'];
        $info['link'] = "http://".$_SERVER['SERVER_NAME'].$_SERVER['REDIRECT_URL'];
        $info['desc'] = str_replace('&nbsp;','',strip_tags($info['content']));
        $this->assign('list',$info);

        //敏感词屏蔽
        $badword = array(
            '法轮功','法轮','FLG','六四','6.4','flg'
        );
        $badword1 = array_combine($badword,array_fill(0,count($badword),'***'));
        //评论
        $map = array(
            'course_id' => $id,
            'parent_id' => 0,
            'status' => array('egt',0)
        );
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
                $val['nickname'] = $name['nickname'] ? $name['nickname'] : $name['name'];
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
     * 主页兴趣爱好加载更多
     */
    public function interestmore(){
        $len = input('length');
        $map = array(
            'class' => 2,
            'status' => array('eq',1),
        );
        $list = Course::where($map)->order('id desc')->limit($len,5)->select();
        foreach($list as $value){
            $img = Picture::get($value['list_image']);
            $value['path'] = $img['path'];
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
        $courseId = input('id');
        $data = array(
            'user_id' => session('userId'), //用户openid
            'course_id' => $courseId,
        );
        $collect = $collectModel::where($data)->find();

        if(empty($collect)){
            $data['type'] = 3; //专题学习type

            $model = $collectModel->create($data);
            if($model){
                //新增收藏collect字段+1
                $info['collect'] = array('exp','`collect`+1');
                $id = Course::where('id',$courseId)->update($info);
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
                $id = Course::where('id',$courseId)->update($info);
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
     * 兴趣爱好加载更多评论
     */
    public function intmore(){
        $userId = session('userId');
        $id = input('course_id');
        $total = input('total');
        $parentId = input('parent_id')?input('parent_id'):0;
        if($parentId == 0){
            //敏感词屏蔽
            $badword = array(
                '法轮功','法轮','FLG','六四','6.4','flg'
            );
            $badword1 = array_combine($badword,array_fill(0,count($badword),'***'));
            //一级评论
            $map = array(
                'course_id' => $id,
                'parent_id' => 0,
            );
            $comment = Comment::where($map)->limit($total,5)->order('likes desc,id desc')->select();
            if($comment){
                foreach($comment as $value){
                    $content = $value['content'];
                    $str = strtr($content, $badword1);
                    $value['content'] = $str;
                    $map1 = array(
                        'user_id' => $userId,
                        'comment_id' => $value['id']
                    );
                    $like = LikeLog::where($map1)->find();
                    ($like)?$value['is_like'] = 1:$value['is_like'] = 0;
                    $users = WechatUser::where('userid',$value['create_user'])->find();
                    $value['header'] = $users['header'];
                    $value['nickname'] = $users['nickname'];
                    $second = Comment::where('parent_id',$value['id'])->limit(0,5)->order('id desc')->select();
                    foreach($second as $val){
                        $content = $val['content'];
                        $str = strtr($content, $badword1);
                        $val['content'] = $str;
                        $name = WechatUser::where('userid',$val['create_user'])->find();
                        $val['nickname'] = $name['nickname'];
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
                'course_id' => $id,
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

}