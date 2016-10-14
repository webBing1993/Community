<?php
/**
 * Created by PhpStorm.
 * User: Lxx<779219930@qq.com>
 * Date: 2016/5/24
 * Time: 14:34
 */

namespace app\admin\model;
use think\Model;

class Course extends Base {
    public $insert = [
        'create_time' => NOW_TIME,
        'collect' => 0,
        'views' => 0,
        'study' => 0,
    ];


    public function user(){
        return $this->hasOne('Member','id','create_user');
    }

    public function special(){
        return $this->hasOne('Special','id','special_id');
    }
}