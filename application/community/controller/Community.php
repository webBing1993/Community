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
use app\admin\model\Host;

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
    public function houseslist(){
        return $this->fetch();
    }
    public function particulars(){
        return $this->fetch();
    }
    public function particulars1(){
        return $this->fetch();
    }
    public function information(){
        return $this->fetch();
    }
    public function map(){
        return $this->fetch();
    }
    public function map1(){
        return $this->fetch();
    }
    public function login(){
        return $this->fetch();
    }
    public function in(){
        return $this->fetch();
    }
    public function a1(){
        return $this->fetch();
    }
    public function carport(){
        return $this->fetch();
    }
    public function carport1(){
        return $this->fetch();
    }
    public function search(){
        $name=input('post.name');
        $Host=new Host();
        $host=$Host->where('name','like','%'.$name.'%')->select();
        if($host){
            foreach($host as $value){
                $data[]=['id'=>$value->id,'name'=>$value->name,'info'=>$value->address];
            }
            return json_encode($data);
        }else{
            return 0;
        }

    }
}