<?php
/**
 * Created by PhpStorm.
 * User: Lxx<779219930@qq.com>
 * Date: 2016/5/24
 * Time: 10:44
 */

namespace app\admin\validate;


use think\Validate;

class Special extends Validate {
    protected $rule = [
        'title' =>  'require|max:90',
        'detail'  =>  'require',
    ];

    protected $message = [
        'title.require' =>  '标题名称必须添加',
        'title.max' => '专题长度不能超过30个字',
        'detail'  =>  '详细内容必须添加',
    ];

}