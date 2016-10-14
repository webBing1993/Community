<?php
/**
 * Created by PhpStorm.
 * User: Lxx<779219930@qq.com>
 * Date: 2016/4/25
 * Time: 13:58
 */

namespace app\home\model;
use think\Model;

class Collect extends Model {
    protected $insert = [
        'status' => 0,
        'create_time' => NOW_TIME,
    ];

    //关联查询课程信息
    public function course(){
        return $this->hasOne('Course','id','course_id');
    }

    //关联查询第一聚焦文章信息
    public function focus(){
        return $this->hasOne('Focus','id','focus_id');
    }

    //查询活动
    public function activity(){
        return $this->hasOne('Activity','id','activity_id');
    }

}