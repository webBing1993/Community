<?php
/**
 * Created by PhpStorm.
 * User: Lxx<779219930@qq.com>
 * Date: 2016/5/9
 * Time: 17:21
 */

namespace app\admin\model;

use think\Model;

class WechatMessage extends Base {
    protected $auto = ['create_time'];

    public function WechatUser() {
        return $this->hasMany('WechatUser','touser','userid');
    }


}