<?php
/**
 * Created by PhpStorm.
 * User: Lxx<779219930@qq.com>
 * Date: 2016/6/14
 * Time: 17:11
 */
namespace app\home\controller;
use think\Controller;

/**
 * class Interact
 * 众筹互动
 */
class Interact extends Base{
    /**
     * 众筹互动主页
     */
    public function index(){

        return $this->fetch();
    }

    /**
     * 众筹栏目
     */
    public function crowd(){

        return $this->fetch();
    }
}
