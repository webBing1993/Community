<?php
/**
 * Created by PhpStorm.
 * User: Lxx<779219930@qq.com>
 * Date: 2016/5/20
 * Time: 14:50
 */

namespace app\admin\validate;
use think\Validate;

class Focus extends Validate {
    protected $rule = [
        'front_cover' => 'require',
        'list_image' => 'require',
        'title' => 'require',
        'content' => 'require',
        'publisher' => 'require',
        'class' => 'gt:0',
        'departmentid' => 'gt:0'
    ];

    protected $message = [
        'front_cover.require' => '封面图片不能为空',
        'list_image.require' => '列表图片不能为空',
        'title.require' => '标题不能为空',
        'content.require' => '内容不能为空',
        'publisher.require' => '发布人不能为空',
        'class' => '请选择新闻类别',
        'departmentid' => '请选择要发送的部门'
    ];

    protected  $scene = [
        'new' => ['front_cover','list_image','title','content','publisher','class'],
        'file' => ['title','content','publisher',],
    ];
}