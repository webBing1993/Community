<?php
/**
 * Created by PhpStorm.
 * User: Lxx<779219930@qq.com>
 * Date: 2016/5/19
 * Time: 15:08
 */

namespace app\admin\validate;
use think\Validate;

class Activity extends Validate {
    protected $rule = [
        'front_cover' => 'require',
        'list_image' => 'require',
        'carousel_images' => 'require',
        'name' => 'require|max:150',
        'seattable_image' => 'require',
        'detail' => 'require',
        'sponsor' => 'require',
        'date' => 'require|max:60',
        'publisher' => 'require|max:15',
        'title' => 'require',
        'requirement' => 'require',
        'telephone' => 'require',
        'cost' => 'require|number',
        'start_time' => 'require',
        'end_time' => 'require',
        'address' => 'require',

    ];

    protected $message = [
        'name.require' => '活动/会议名称不能为空',
        'name.max' => '名称长度不能超过50个字',
        'front_cover.require' => '封面图片不能为空',
        'list_image.require' => '列表图片不能为空',
        'carousel_images.require' => '轮播图片不能为空',
        'seattable_image.require' => '座位表不能为空',
        'title.require' => '会议主题不能为空',
        'requirement.require' => '相关要求不能为空',
        'detail.require' => '活动描述不能为空',
        'sponsor.require' => '主办方不能为空',
        'cost.require' => '花费不能为空',
        'cost.number' => '花费只能填写数字',
        'publisher.require' => '发布者不能为空',
        'publisher.max' => '发布者长度不能超过5个字',
        'date.require' => '会议时间不能为空',
        'date.max' => '会议时间不能超过30个字',
        'start_time.require' => '活动开始时间不能为空',
        'end_time.require' => '活动结束时间不能为空',
        'telephone.require' => '联系电话不能为空',
        'address.require' => '地址不能为空',
    ];

    protected $scene = [
        'act' => ['name','detail','sponsor','telephone','cost','start_time','end_time','address','publisher','front_cover','list_image'],
        'meet' => ['name','detail','sponsor','date','publisher','title','requirement','address'],
    ];
}