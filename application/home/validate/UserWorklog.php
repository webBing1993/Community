<?php
/**
 * Created by PhpStorm.
 * User: Lxx<779219930@qq.com>
 * Date: 2016/4/26
 * Time: 13:53
 */

namespace app\home\validate;


use think\Validate;

class UserWorklog extends Validate {

    protected $rule = [
        'content' => 'require',
        'complete' => 'require',
        'experience' => 'require',
    ];

    protected $message = [
        'content.require' => '工作内容不能为空',
        'complete.require' => '工作进度不能为空',
        'experience.require' => '反思心得不能为空',
    ];
}