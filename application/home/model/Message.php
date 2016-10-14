<?php
/**
 * Created by PhpStorm.
 * User: Lxx<779219930@qq.com>
 * Date: 2016/5/9
 * Time: 15:05
 */

namespace app\home\model;


use think\Model;

class Message extends Model {
    protected $insert = [
        'create_time' => NOW_TIME,
        'status' => 0
    ];

    public function user(){
        return $this->hasOne('WechatUser','userid','create_user');
    }

    public function comment(){
        return $this->hasOne('Comment','id','comment_id');
    }

    public function activity(){
        return $this->hasOne('Activity','id','activity_id');
    }
}