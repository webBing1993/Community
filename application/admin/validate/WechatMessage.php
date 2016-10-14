<?php
/**
 * Created by PhpStorm.
 * User: 虚空之翼 <183700295@qq.com>
 * Date: 16/5/9
 * Time: 10:11
 */
namespace app\admin\validate;

use think\Validate;

class WechatMessage extends Validate
{
    protected $rule = [
        'content' =>  'require',
    ];
    protected $message = [
        'content' =>  '请填写发布内容',
    ];
}