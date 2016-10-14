<?php
/**
 * Created by PhpStorm.
 * User: Lxx<779219930@qq.com>
 * Date: 2016/4/26
 * Time: 9:57
 */

namespace app\home\validate;
use think\Validate;

class ActivityEnroll extends Validate {

    protected $rule = [
        'replacement' => 'require',
        'reason' => 'require',
        'mobile' => 'require',
    ];

    protected $message = [
        'replacement.require' => '代替人未填写',
        'reason.require' => '请假理由未填写',
        'mobile.require' => '代替人联系电话未填写'

    ];

    protected $scene = [
        'hot' => [''],
        'meet' => [''],
        'leave' => ['reason'],
        'replace' => ['replacement','reason','mobile'],
    ];
}