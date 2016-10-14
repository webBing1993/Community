<?php
/**
 * Created by PhpStorm.
 * User: Lxx<779219930@qq.com>
 * Date: 2016/6/22
 * Time: 14:32
 */
namespace app\home\model;
use think\Model;

class FilenoteView extends Model{
    protected $insert = [
        'create_time' => NOW_TIME,
        'status' => 0,
    ];
}