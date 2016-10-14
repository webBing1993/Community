<?php
/**
 * Created by PhpStorm.
 * User: Lxx<779219930@qq.com>
 * Date: 2016/5/25
 * Time: 11:09
 */

namespace app\admin\validate;
use think\Validate;

class Course extends Validate {

    protected $rule = [
        'front_cover' => 'require',
        'title' => 'require',
        'content' => 'require',
        'publisher' => 'require|max:16',

    ];

    protected $message = [
        'front_cover' => '封面图片不能为空',
        'title' =>  '标题不能为空',
        'content'  =>  '内容不能为空',
        'publisher' => '发布者不能为空且长度小于5字符',
    ];

    protected $scene = [
        'add' => ['title','content','publisher','front_cover'],
        'edit' => ['title','content','publisher','front_cover'],
    ];
}