<?php
/**
 * Created by PhpStorm.
 * User: Lxx<779219930@qq.com>
 * Date: 2016/8/5
 * Time: 9:55
 */

namespace app\admin\model;
use think\Model;

class Push extends Base {
    public $insert = [
        'create_time' => NOW_TIME,
        'status' => 0,
    ];
}