<?php
/**
 * Created by PhpStorm.
 * User: 虚空之翼 <183700295@qq.com>
 * Date: 16/5/27
 * Time: 11:29
 */

namespace app\admin\model;
use think\Model;

class Message extends Base {
    protected $insert = [
        'create_time' => NOW_TIME,
        'status' => 0,
    ];
}