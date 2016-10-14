<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2016/10/9
 * Time: 13:17
 */
namespace app\admin\model;
use think\Model;
class Host extends Base{
    public function getBuild(){
        $id=$this->getData('id');
        $obj=Building::get(array('host'=>$id));
        if($obj==null){
            return 0;
        }else{
            return $obj->id;
        }

    }
}