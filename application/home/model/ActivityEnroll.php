<?php
/**
 * Created by PhpStorm.
 * User: Lxx<779219930@qq.com>
 * Date: 2016/4/25
 * Time: 13:23
 */

namespace app\home\model;
use think\Model;

class ActivityEnroll extends Model {
    protected $insert = [
        'create_time' => NOW_TIME,
    ];

    //获取活动信息
    public function activity(){
        return $this->hasOne('Activity','id','activity_id');
    }

    public function user(){
        return $this->hasOne('WechatUser','userid','user_id');
    }
}