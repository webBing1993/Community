<?php
/**
 * Created by PhpStorm.
 * User: Lxx<779219930@qq.com>
 * Date: 2016/8/25
 * Time: 11:27
 */

namespace app\home\controller;
use app\home\model\Course;
use com\wechat\TPWechat;
use think\Controller;

use app\home\model\Push as PushModel;
use app\home\model\Focus;
use app\home\model\PushReview;
use app\home\model\WechatUser;
use app\home\model\Picture;
use com\wechat\TPQYWechat;
use think\Config;

class Push extends Base {
    /**
     * 前端待审核列表
     */
    public function reviewlist(){
        $map['status'] = 0;
        $list = PushModel::where($map)->order('create_time desc')->select();
        foreach ($list as $value) {
            $value['type'] == 1 ? $value['type_name'] = "企业号推送" : $value['type_name'] = "订阅号推送";
            if($value['class'] == 1) {
                //新闻推送
                $focus = Focus::where('id',$value['focus_main'])->find();  //图文信息
                $value['title'] = $focus['title'];
                $value['image'] = $focus['front_cover'];
                $value['class_name'] = "[第一聚焦]";
            }else {
                //课程学习推送
                $course = Course::where('id',$value['focus_main'])->find();
                $value['title'] = $course['title'];
                $value['image'] = $course['front_cover'];
                $value['class_name'] = "[品牌特色]";
            }
        }

        $this->assign('list',$list);
        return $this->fetch();
    }

    /**
     * 已审核列表
     */
    public function passlist(){
        $map = array(
            'status' => array('in',[1,-1]),
        );
        $list = PushModel::where($map)->order('create_time desc')->select();
        foreach ($list as $value) {
            $value['type'] == 1 ? $value['type_name'] = "企业号推送" : $value['type_name'] = "订阅号推送";
            if($value['class'] == 1) {
                //新闻推送
                $focus = Focus::where('id',$value['focus_main'])->find();  //图文信息
                $value['title'] = $focus['title'];
                $value['image'] = $focus['front_cover'];
                $value['class_name'] = "[第一聚焦]";
            }else {
                //课程学习推送
                $course = Course::where('id',$value['focus_main'])->find();
                $value['title'] = $course['title'];
                $value['image'] = $course['front_cover'];
                $value['class_name'] = "[品牌特色]";
            }

            $push = PushReview::where('push_id',$value['id'])->find();
            $value['review_time'] = $push['review_time'];
            $value['username'] = $push['username'];
        }

        $this->assign('list',$list);
        return $this->fetch();
    }

    /**
     * 审核发送
     * status：1审核通过，-1审核不通过 0待审核
     * type: 1 企业号推送， 2 订阅号推送
     */
    public function review(){
        $userId = session('userId');
        $user = WechatUser::where('userid',$userId)->find();
        $username = $user['name'];
        $msg = input('post.');
        if($msg['type'] == 1) { //企业号推送
            //新建pushreview数据
            $data1 = array(
                'push_id' => $msg['id'],
                'userid' => $userId,
                'username' => $username,
                'status' => $msg['status'],
            );
            $this_info['status'] = $msg['status'];   //更新push表状态

            if($msg['status'] == 1) {   //通过
                $new = PushReview::create($data1);
                if($new){
                    //发送消息
                    $data = PushModel::where('id',$msg['id'])->find();
                    $arr1 = $data['focus_main'];    //主图文id
                    !empty($data['focus_vice']) ? $arr2 = json_decode($data['focus_vice']) : $arr2 = "";    //副图文id
                    if($msg['class'] == 1) {
                        /** 新闻推送 **/
                        //主图文信息
                        $focus1 = Focus::where('id',$arr1)->find();
                        switch ($focus1['class']){
                            case 1:
                                $pre1 = "【工委发布】";
                                break;
                            case 2:
                                $pre1 = "【省直动态】";
                                break;
                            case 3:
                                $pre1 = "【市县传真】";
                                break;
                            default:
                                $pre1 = "【无】";
                                break;
                        }
                        $title1 = $focus1['title'];
                        $str1 = strip_tags($focus1['content']);
                        $des1 = mb_substr($str1,0,40);
                        $url1 = "http://party.0571ztnet.com/home/focus/newdetail/id/".$focus1['id'].".html";
                        $img1 = Picture::get($focus1['front_cover']);
                        $path1 = "http://party.0571ztnet.com".$img1['path'];
                        $information1 = array(
                            "title" => $pre1.$title1,
                            "description" => $des1,
                            "url" => $url1,
                            "picurl" => $path1,
                        );

                        $information = array();
                        if(!empty($arr2)) {
                            //副图文信息
                            $information2 = array();
                            foreach ($arr2 as $key=>$value){
                                $focus = Focus::where('id',$value)->find();
                                switch ($focus['class']){
                                    case 1:
                                        $pre = "【工委发布】";
                                        break;
                                    case 2:
                                        $pre = "【省直动态】";
                                        break;
                                    case 3:
                                        $pre = "【市县传真】";
                                        break;
                                    default:
                                        $pre = "【无】";
                                        break;
                                }
                                $title = $focus['title'];
                                $str = strip_tags($focus['content']);
                                $des = mb_substr($str,0,40);
                                $url = "http://party.0571ztnet.com/home/focus/newdetail/id/".$focus['id'].".html";
                                $img = Picture::get($focus['front_cover']);
                                $path = "http://party.0571ztnet.com".$img['path'];
                                $info = array(
                                    "title" => $pre.$title,
                                    "description" => $des,
                                    "url" => $url,
                                    "picurl" => $path,
                                );
                                $information2[] = $info;
                            }

                            //数组合并，主图文放在首位
                            foreach ($information2 as $k=>$v){
                                $information[0] = $information1;
                                $information[$k+1] = $v;
                            }
                        }else{
                            $information[0] = $information1;
                        }

                        //重组成article数据
                        $send = array();
                        $re[] = $information;
                        foreach ($re as $key => $value){
                            $key = "articles";
                            $send[$key] = $value;
                        }

                        //发送给服务号
                        $Wechat = new TPQYWechat(Config::get('party'));
                        $message = array(
//                            'totag' => "18", //审核标签用户
                            "touser" => "@all",   //发送给全体，@all
                            "msgtype" => 'news',
                            "agentid" => 14,
                            "news" => $send,
                            "safe" => "0"
                        );
                        $suc = $Wechat->sendMessage($message);
                        if($suc['errcode'] == 0){
                            PushModel::where('id',$msg['id'])->update($this_info);    //改变推送状态
                            return $this->success("审核通过，已推送消息");
                        };
                    }else {
                        /** 品牌特色推送**/
                        //主图文信息
                        $course1 = Course::where('id',$arr1)->find();
                        switch ($course1['retype']){
                            case 1:
                                $pre1 = "【微党课】";
                                break;
                            case 2:
                                $pre1 = "【好案例】";
                                break;
                            case 3:
                                $pre1 = "【新成果】";
                                break;
                            default:
                                $pre1 = "【无】";
                                break;
                        }
                        $title1 = $course1['title'];
                        $str1 = strip_tags($course1['content']);
                        $des1 = mb_substr($str1,0,40);
                        if($course1['type'] == 2) {
                            $url1 = "http://party.0571ztnet.com/home/special/article/id/".$course1['id'].".html";
                        }else {
                            $url1 = "http://party.0571ztnet.com/home/special/video/id/".$course1['id'].".html";
                        }
                        $img1 = Picture::get($course1['front_cover']);
                        $path1 = "http://party.0571ztnet.com".$img1['path'];
                        $information1 = array(
                            "title" => $pre1.$title1,
                            "description" => $des1,
                            "url" => $url1,
                            "picurl" => $path1,
                        );
                    }

                    $information = array();
                    if(!empty($arr2)) {
                        //副图文信息
                        $information2 = array();
                        foreach ($arr2 as $key=>$value){
                            $course = Course::where('id',$value)->find();
                            switch ($course['retype']){
                                case 1:
                                    $pre = "【微党课】";
                                    break;
                                case 2:
                                    $pre = "【好案例】";
                                    break;
                                case 3:
                                    $pre = "【新成果】";
                                    break;
                                default:
                                    $pre = "【无】";
                                    break;
                            }
                            $title = $course['title'];
                            $str = strip_tags($course['content']);
                            $des = mb_substr($str,0,40);
                            if($course['type'] == 2) {
                                $url = "http://party.0571ztnet.com/home/special/article/id/".$course['id'].".html";
                            }else {
                                $url = "http://party.0571ztnet.com/home/special/video/id/".$course['id'].".html";
                            }
                            $img = Picture::get($course['front_cover']);
                            $path = "http://party.0571ztnet.com".$img['path'];
                            $info = array(
                                "title" => $pre.$title,
                                "description" => $des,
                                "url" => $url,
                                "picurl" => $path,
                            );
                            $information2[] = $info;
                        }

                        //数组合并，主图文放在首位
                        foreach ($information2 as $k=>$v){
                            $information[0] = $information1;
                            $information[$k+1] = $v;
                        }
                    }else{
                        $information[0] = $information1;
                    }

                    //重组成article数据
                    $send = array();
                    $re[] = $information;
                    foreach ($re as $key => $value){
                        $key = "articles";
                        $send[$key] = $value;
                    }
                    //发送给服务号
                    $Wechat = new TPQYWechat(Config::get('party'));
                    $message = array(
//                        'totag' => "18", //审核标签用户
                        "touser" => "@all",   //发送给全体，@all
                        "msgtype" => 'news',
                        "agentid" => 3,
                        "news" => $send,
                        "safe" => "0"
                    );
                    $suc = $Wechat->sendMessage($message);
                    if($suc['errcode'] == 0){
                        PushModel::where('id',$msg['id'])->update($this_info);    //改变推送状态
                        return $this->success("审核通过，已推送消息");
                    };
                }
            }else{  //不通过
                $new = PushReview::create($data1);   //记录
                if($new){
                    PushModel::where('id',$msg['id'])->update($this_info);
                    return $this->error("审核不通过");
                }
            }
        }else {
//            //订阅号推送
//            $push = PushModel::where('id',$msg['id'])->find();
//            $focus_main = Focus::where('id',$push['focus_main'])->find();
//            $image = Picture::get($focus_main['front_cover']);
//            $img =  array(
//                'media' => "@F:/PartyBuildpublic/".$image['path'],
//            );
//
//            $Wechat = new TPWechat(Config::get('news'));
////            $list = $Wechat->getForeverList("news",0,1);
////            foreach ($list as $value) {
////                $media_id = $value[0]['media_id'];
////                dump($media_id);
////            }
//            $media = "GW1XSyfnHvK2NAnMA-U23QcTNHgkM8G5eW4Li3EuVnI";
//            $data = array(
//                "touser"=>"oJ_JEwVty1j9DwxS_eRAb2rI4lBg",
//                "msgtype"=>"mpnews",
//                "mpnews" => array( "media_id"=>"GW1XSyfnHvK2NAnMA-U23QcTNHgkM8G5eW4Li3EuVnI")
//            );
//            $msg = $Wechat->sendMassMessage($data);
////            dump($msg);
//            dump($msg);

        }

    }

}