<?php
/**
 * Created by PhpStorm.
 * User: Lxx<779219930@qq.com>
 * Date: 2016/4/26
 * Time: 13:45
 */

namespace app\home\model;

use think\Model;

class UserWorklog extends Model {

    protected $insert = [
        'create_time' => NOW_TIME,
    ];
}