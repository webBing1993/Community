<?php
/**
 * Created by PhpStorm.
 * User: 虚空之翼 <183700295@qq.com>
 * Date: 16/5/27
 * Time: 11:29
 */

namespace app\admin\model;
use think\Model;

class Comment extends Base {
    public function user(){
        return $this->hasOne('WechatUser','userid','create_user');
    }
    
    public function activity(){
        return $this->hasOne('Activity','id','activity_id');
    }

    public function focus(){
        return $this->hasOne('Focus','id','focus_id');
    }

    public function course(){
        return $this->hasOne('Course','id','course_id');
    }
}