<?php
/**
 * 活动通知.
 * User: Lxx<779219930@qq.com>
 * Date: 2016/5/9
 * Time: 17:20
 */

namespace app\admin\controller;

use app\admin\model\Activity as ActivityModel;
use app\admin\model\ActivityEnroll;
use app\admin\model\Send;
use app\admin\model\WechatDepartment;
use app\admin\model\WechatDepartmentUser;
use app\admin\model\WechatTag;
use app\admin\model\WechatUserTag;
use com\wechat\TPQYWechat;
use think\Config;
use think\Db;
use think\Input;
use think\Url;

class Tenement extends Admin {
    /*
     * 物业消息管理
     */
    public function news(){
        $this->assign('list','');
        $this->assign('_page','');
        return $this->fetch();
    }

    /**
     * 添加消息
     */
    public function add(){
        return $this->fetch();
    }

    /**
     * 修改消息
     */
    public function edit(){


    }

    /**
     * 删除消息
     */
    public function del(){


    }
}