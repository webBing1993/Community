<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2016/11/9
 * Time: 16:25
 */
namespace app\community\controller;
use app\home\controller\Base;
use think\Controller;
use app\admin\model\Host;

class Project extends Controller{
    public function travel(){
        return $this->fetch();
    }
    public function affairs(){
        return $this->fetch();
    }
    public function garden(){
        return $this->fetch();
    }
    public function panorama(){
        return $this->fetch();
    }
}