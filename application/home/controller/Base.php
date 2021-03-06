<?php
/**
 * Created by PhpStorm.
 * User: Lxx<779219930@qq.com>
 * Date: 2016/4/21
 * Time: 15:58
 */

namespace app\home\controller;

use app\user\controller\Index;
use think\Config;
use think\Controller;
use com\wechat\TPQYWechat;
use think\Cache;
use think\Input;
use think\Log;

class Base extends Controller {
    public function _initialize(){
//       session('userId','lbk');
//       session('header','/home/images/vistor.jpg');
//       session('nickname','游客');
        if(!empty($_SERVER['REQUEST_URI'])){
            session('url',$_SERVER['REQUEST_URI']);
        }
        $userId = session('userId');

        if(Config::get('WEB_SITE_CLOSE')){
            return $this->error('站点维护中，请稍后访问~');
        }

        //如果是游客的话默认userid为visitors
        if($userId == 'visitor'){
            session('nickname','游客');
            session('header','/home/images/vistor.jpg');
        }else{
            //微信认证
            $Wechat = new TPQYWechat(Config::get('party'));
            // 1用户认证是否登陆
            if(empty($userId)) {
                $redirect_uri = Config::get("party.login");
                $url = $Wechat->getOauthRedirect($redirect_uri);
                $this->redirect($url);
            }

            // 2获取jsapi_ticket
            $jsApiTicket = session('jsapiticket');
            if(empty($jsApiTicket) || $jsApiTicket=='') {
                session('jsapiticket', $Wechat->getJsTicket()); // 官方7200,设置7000防止误差
            }
        }
        
    }

    /**
     * 微信官方认证URL
     */
    public function oauth(){
        $Wechat = new TPQYWechat(Config::get('party'));
        $Wechat->valid();
    }

    /**
     * 判断是否是游客登录
     */
    public function anonymous() {
        $userId = session('userId');
        //如果userId等于visitor  则为游客登录，否则则正常显示
        if($userId == 'visitor'){
            $this->assign('visit', 1);
        }else{
            $this->assign('visit', 0);
        }
    }

    /**
     * 获取企业号签名
     */
    public function jssdk(){
        $Wechat = new TPQYWechat(Config::get('party'));
        $url = 'http://'.$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI'];
        $jsSign = $Wechat->getJsSign($url);
        $this->assign("jsSign", $jsSign);
    }

    /**
     * 用户登入获取信息(登陆方法在index控制器中)
     */
    public function login(){
        // 获取用户信息
        $Wechat = new TPQYWechat(Config::get('party'));
        $result = $Wechat->getUserId(input('code'), Config::get('party.agentid'));
        if(isset($result['UserId'])) {
            $user = $Wechat->getUserInfo($result['UserId']);

            // 添加本地数据
            $UserAPI = new Index();
            $localUser = $UserAPI->checkWechatUser($result['UserId']);
            if($localUser) {
                $UserAPI->updateWechatUser($user);
            } else {
                $UserAPI->addWechatUser($user);
            }

            session("userId", $result['UserId']);
            session("nickname", isset($user['nickname'])?:"");
            session("header", isset($user['header'])?:"");

            $this->redirect("Activity/index");
        } else {
            return $this->error("企业成员未授权");
        }
    }
    
}