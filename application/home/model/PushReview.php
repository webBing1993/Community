<?php
/**
 * Created by PhpStorm.
 * User: Lxx<779219930@qq.com>
 * Date: 2016/8/9
 * Time: 16:27
 */
namespace app\home\model;
use think\Model;

class PushReview extends Model {
    protected $insert = [
        'review_time'=> NOW_TIME,
    ];
}