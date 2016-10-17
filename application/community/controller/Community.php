<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2016/10/17
 * Time: 9:19
 */
namespace app\community\controller;
use app\home\controller\Base;
use think\Controller;

class Community extends Controller{
    public function forum(){
        return $this->fetch();
    }
    public function zheng(){
        return $this->fetch();
    }
    public function shang(){
        return $this->fetch();
    } 
}