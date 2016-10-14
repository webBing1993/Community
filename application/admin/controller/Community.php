<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2016/10/8
 * Time: 9:42
 */
namespace app\admin\controller;
class Community extends Admin{
    //上线项目列表
    public function project(){
        return $this->fetch();
    }
    //项目添加
    public function add(){
        return $this->fetch();
    }
    //未审核项目
    public function unaudited(){

    }
    //回收站
    public function recycle(){

    }
    //项目支持
    public function support(){

    }
    //项目点评
    public function reviews(){

    }
    //广告轮播列表
    public function flashes(){

    }
}