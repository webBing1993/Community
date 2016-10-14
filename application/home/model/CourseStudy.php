<?php
/**
 * Created by PhpStorm.
 * User: Lxx<779219930@qq.com>
 * Date: 2016/5/11
 * Time: 11:04
 */

namespace app\home\model;


use think\Model;

class CourseStudy extends Model {
    protected $insert = [
        'create_time' => NOW_TIME,
        'status' => 0,
    ];

    public function course(){
        return $this->hasMany('Course','id','course_id');
    }
}