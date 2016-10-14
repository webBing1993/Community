<?php
/**
 * Created by PhpStorm.
 * User: Lxx<779219930@qq.com>
 * Date: 2016/6/26
 * Time: 16:45
 */
namespace app\admin\validate;


use think\Validate;

class Topic extends Validate {
    protected $rule = [
        'title' =>  'require|max:75',
    ];

    protected $message = [
        'title.require' =>  '标题名称必须添加！',
        'title.max' => '话题长度不能超过25个字',
    ];

}