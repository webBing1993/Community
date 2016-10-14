<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2016/10/9
 * Time: 10:36
 */
namespace app\admin\model;
use think\Model;
class Building extends Base{
    public function getHost(){
        $id=$this->getData('host');
        $host=Host::get($id);
        if($host!==null){
            return json_decode($host)->name;
        }else{
            return 0;
        }
    }
}