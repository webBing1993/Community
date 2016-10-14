<?php
/**
 * Created by PhpStorm.
 * User: Lxx<779219930@qq.com>
 * Date: 2016/5/9
 * Time: 17:21
 */

namespace app\admin\model;

use think\Model;

class Tenement extends Base {
    public $insert = [
        'create_time' => NOW_TIME,
    ];

    public function user(){
        return $this->hasOne('Member','id','create_user');
    }

}