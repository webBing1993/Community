<?php
/**
 * Created by PhpStorm.
 * User: Lxx<779219930@qq.com>
 * Date: 2016/6/20
 * Time: 9:39
 */

namespace app\home\model;
use think\Model;

class Browse extends Model{
    protected $insert = [
        'status' => 0,
        'create_time' => NOW_TIME,
        'score' => 1,
    ];
    
}