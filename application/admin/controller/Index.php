<?php
namespace app\admin\controller;

use app\admin\model\Tenement;
use app\admin\model\Comment;
use app\admin\model\Config;
use app\admin\model\Course;
use app\admin\model\News;
use app\admin\model\Log;
use app\admin\model\WechatLog;
use app\admin\model\WechatUser;
use app\user\model\UcenterMember;
use think\Controller;
use think\Db;
use think\Model;

class Index extends Admin {

    public function index() {
        // 通讯录总人数
        $userTotal = WechatUser::where(['status'=>1])->count();
        // 活动通知数
        $TenementTotal = Tenement::count();
        // 评论数
        $commentTotal = Comment::where(['status'=>0])->count();
        // 课程数
        $courseTotal = Course::count();
        $this->assign('userTotal', $userTotal);
        $this->assign('TenementTotal', $TenementTotal);
        $this->assign('commentTotal', $commentTotal);
        $this->assign('courseTotal', $courseTotal);
        //浏览数
        $courseView = Course::where('status','eq','1')->column('views');
        $focusView = News::column('counts');
        $TenementView = Tenement::column('counts');
        $all = array_merge($courseView,$focusView,$TenementView);
        //合并数值
        $viewTotal = 0;
        foreach ($all as $k=>$v){
            $viewTotal += $v;
        }
        $this->assign('viewTotal',$viewTotal);

        // 用户分析
        $activeUser = WechatLog::all(function($query) {
            $query->field('create_time,count(id) as count')
                ->where("to_days(now()) - to_days(date_format(from_UNIXTIME(`create_time`),'%Y%m%d')) <= 30")
                ->group("FROM_UNIXTIME(create_time,'%Y%m%d')");
        });
        $dataStr = "";
        foreach ($activeUser as $key=>$value) {
            $dataStr .= "[".($value['create_time'] * 1000).",".$value['count']."]";
            if($key < count($activeUser)-1){
                $dataStr .= ",";
            }
        }
        $this->assign('entyUserStr',$dataStr);

        // 进入事件的用户
        $entyUser = WechatLog::all();
        $this->assign('entyUser',$entyUser);

        // 用户活跃度排行榜
//        $userList = Db::table('co_log')->alias('log')
//            ->field('log.userid,count(log.userid) as count,log.create_time,user.name')
//            ->join('wechat_user user', 'log.userid=user.userid')
//            ->group('log.userid')->order('count desc')->limit(10)
//            ->select();
        //取数据log_user里面的数据
        $userList = Db::table('co_log_user')->alias('log')
            ->field('log.userid,log.count,log.login_time,user.name')
            ->join('wechat_user user', 'log.userid = user.userid','LEFT')
            ->order('log.count desc')
            ->limit(12)
            ->select();
        $this->assign('userList', $userList);

        // 部门活跃度排行榜
//        $departmentList = Db::table('co_log')->alias('log')
//            ->field('log.department_id,count(log.department_id) as count,log.create_time,department.name')
//            ->join('wechat_department department', 'log.department_id=department.id')
//            ->group('log.department_id')->order('count desc')->limit(10)
//            ->select();
        //取log_department里面数据
        $departmentList  = Db::table('co_log_department')->alias('log')
            ->field('log.department_id,log.count,log.login_time,department.name')
            ->join('wechat_department department','log.department_id = department.id')
            ->order('log.count desc')
            ->limit(10)
            ->select();
        $this->assign('departmentList', $departmentList);


        $list = array();
        $this->assign('list',$list);

        return $this->fetch();

    }
    
    //获取mysql版本方法
    protected function _model(){
        return new \think\model\Merge();
    }
    private function _mysql_version()
     {
         $Model = self::_model();
         $version = $Model->query("select version() as ver");
         return $version[0]['ver'];
     }
    //主页备份
    public function table(){
        // 通讯录总人数
        $userTotal = WechatUser::where(['status'=>1])->count();
        // 活动通知数
        $TenementTotal = Tenement::count();
        // 评论数
        $commentTotal = Comment::where(['status'=>0])->count();
        // 课程数
        $courseTotal = Course::count();
        $this->assign('userTotal', $userTotal);
        $this->assign('TenementTotal', $TenementTotal);
        $this->assign('commentTotal', $commentTotal);
        $this->assign('courseTotal', $courseTotal);

        //配置信息
        $config = array(
            'os' => $_SERVER["SERVER_SOFTWARE"], //获取服务器标识的字串
            'version' => PHP_VERSION, //获取PHP服务器版本
            'time' => date("Y-m-d H:i:s", time()), //获取服务器时间
            'pc' => $_SERVER['SERVER_NAME'], //当前主机名
            'osname' => php_uname(), //获取系统类型及版本号
            'language' => $_SERVER['HTTP_ACCEPT_LANGUAGE'], //获取服务器语言
            'port' => $_SERVER['SERVER_PORT'], //获取服务器Web端口
            'max_upload' => ini_get("file_uploads") ? ini_get("upload_max_filesize") : "Disabled", //最大上传
            'max_ex_time' => ini_get("max_execution_time")."秒", //脚本最大执行时间
            'mysql_version' => $this->_mysql_version(),
        );
        $this->assign('config',$config);

        return $this->fetch();
    }

    public function test() {
        $Config = new Config();
        $config = $Config->lists();
        //$config = Config::where('status',1)->column('type', 'name', 'value');
        $config = $Config->lists();
        //$config = Db::table('co_config')->where('status',1)->column('type', 'name', 'value');

        dump($config);
    }

    public function search() {
        return $this->fetch();
    }

    /**
     * 修改密码
     */
    public function editpassword(){
        if(IS_POST){
            $id = input('id');
            $password = input('password');
            $repassword = input('repassword');
            if(!empty($password)){
                if($password != $repassword){
                    return $this->error('两次输入的密码不一致!');
                }else{
                    $data['password'] = think_ucenter_md5($repassword, config('uc_auth_key')); //转码存入数据库
                }
            }else{
                return $this->error("密码不能为空!");
            }
            $result = UcenterMember::where('id',$id)->update($data);
            if($result){
                return $this->success("修改成功",Url('Index/index'));
            }else{
                return $this->error("修改失败");
            }
        }else{
            //获取用户的信息
            $user = session('user_auth');
            $this->assign('user',$user);
            
            return $this->fetch();
        }
    }
}