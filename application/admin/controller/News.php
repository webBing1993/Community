<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2016/9/30
 * Time: 9:40
 */
namespace app\admin\controller;
use think\Controller;
class News extends Admin{
    public function index(){
        $this->assign('list','');
        $this->assign('_page','');
        return $this->fetch();
    }
    public function add(){
        return $this->fetch();
    }
    public function edit(){

    }
    public function del(){

    }
}