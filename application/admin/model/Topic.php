<?php
/**
 * Created by PhpStorm.
 * User: Lxx<779219930@qq.com>
 * Date: 2016/5/24
 * Time: 15:59
 */

namespace app\admin\model;


use think\Model;

class Topic extends Base {
    public $insert = [
        'comments' => 0,
        'create_time' => NOW_TIME,
    ];

    public function user(){
        return $this->hasOne('Member','id','create_user');
    }

    public function course(){
        return $this->hasOne('Course','id','course_id');
    }

}