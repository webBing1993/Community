<?php
/**
 * Created by PhpStorm.
 * User: Lxx<779219930@qq.com>
 * Date: 2016/5/9
 * Time: 14:14
 */

namespace app\home\model;
use think\Model;

class Comment extends Model {
    protected $insert = [
        'comments' => 0,
        'likes' => 0,
        'create_time' => NOW_TIME,
        'status' => 0,
        'score' => 3,
    ];
}