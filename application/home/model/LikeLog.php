<?php
/**
 * Created by PhpStorm.
 * User: Lxx<779219930@qq.com>
 * Date: 2016/5/16
 * Time: 9:48
 */

namespace app\home\model;
use think\Model;

class LikeLog extends Model {
    protected $insert = [
        'create_time' => NOW_TIME,
        'score' => 2,
        'status' => 0,
    ];
}