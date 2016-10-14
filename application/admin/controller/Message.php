<?php

namespace app\admin\controller;
use app\admin\model\WechatDepartment;
use app\admin\model\WechatMessage;
use app\admin\model\WechatTag;
use app\admin\model\WechatUser;
use app\user\model\Member;
use com\wechat\TPQYWechat;
use think\Config;
use think\Controller;
use think\Input;

class Message extends Admin
{

    /**
     * @return mixed
     */
    public function wechat()
    {
        //读取所有人员名称编号数据
        $listid = WechatUser::column('name');
        $str = join(",", $listid);
        $inStr = "'" . str_replace(",", "','", $str) . "'";
        $this->assign('listid', $inStr);
        $listuser = WechatUser::all();
        $this->assign('listuser', $listuser);
        //读取所有企业名称编号
        $listdepartment = WechatDepartment::all();
        $this->assign('listdepartment', $listdepartment);
        //读取所以标签的数据
        $listtag = WechatTag::all();
        $this->assign('listtag', $listtag);
        //通过list方法分页读取数据
        $map = array(
            'status' => array('egt', 0)
        );
        $a = $this->lists("WechatMessage", $map);
        //获取发送对象
        $list = array();
        foreach ($a as $user) {
            if ($user['touser']) {
                if ($user['touser'] == "@all") {
                    $user['name'] = "全体成员";
                    $user['tour_1'] = "all";
                } else {
                    $sta = '';
                    $find = explode('|', $user['touser']);
                    $finddata = join(",", $find);
                    $touserdata = WechatUser::where('userid',$finddata)->select();
                    foreach ($touserdata as $touser) {
                        $sta .= $touser->name . ',';
                    }
                    $user['name'] = rtrim($sta, ',');
                    $user['tour_1'] = "个人";
                }
            }

            if ($user['toparty']) {
                $sta = '';
                $find = explode('|', $user['toparty']);
                $finddata = join(",", $find);
                $touserdata = WechatDepartment::all($finddata);
                foreach ($touserdata as $touser) {
                    $sta .= $touser->name . ',';
                }
                $user['name'] = rtrim($sta, ',');
                $user['tour_1'] = "部门";
            }

            if ($user['totag']) {
                $sta = '';
                $find = explode('|', $user['totag']);
                $finddata = join(",", $find);
                $touserdata = WechatTag::all($finddata);
                foreach ($touserdata as $touser) {
                    $sta .= $touser->tagname . ',';
                }
                $user['name'] = rtrim($sta, ',');
                $user['tour_1'] = "标签";
            }

            $list[] = $user;
        }
        $this->assign('list', $list);
        //当有数据提交的时候
        if (IS_POST) {
            //假定人员与企业都为空
            $touser = "";
            $toparty = "";
            $totag = "";
            //通过前台传来的发送草稿来判断status的值是多少
            $sta = input('param.id');
            /*
             * 发送给全体成员touser_2 : 0;
             * 发送给个人touser_1 : 1；根据tourser来获取发送给成员的ID值
             * 发送给企业touser_1 : 0；根据department来获取发送给企业的ID值
             */
            if (input('param.touser_1') == "2") {
                $touser = "@all";
            } elseif (input('param.touser_1') == "1") {
                if ($_POST['user_id']) {
                    $touserid = implode('|', $_POST['user_id']);
                    $touser = $touserid;
                } else {
                    return $this->error('请选择您发要送给对象的名称');
                }
            } elseif (input('param.touser_1') == "0") {
                if ($_POST['departmentid']) {
                    if ($_POST['departmentid'] == -1) {
                        return $this->error('选择发送部门');
                    } else {
                        //$topartyid=implode('|',$_POST['departmentid']);
                        $toparty = $_POST['departmentid'];
                    }
                }
            } elseif (input('param.touser_1') == "3") {
                if ($_POST['totagid']) {
                    if ($_POST['totagid'] == -1) {
                        return $this->error('选择发送标签');
                    } else {
                        //$topartyid=implode('|',$_POST['departmentid']);
                        $totag = $_POST['totagid'];
                    }
                }
            } else {
                return $this->error('选择发送对象');
            }

            //获取当前发送者的id值与名字
            $id = $_SESSION["think"]["user_auth"]["id"];
            $member = Member::get($id);
            $User = $member->nickname;
            $content = input('param.title');
            $msgtype = "text";

            //获取要写入数据库的数据
            $message = [
                "touser" => $touser,
                "toparty" => $toparty,
                'totag' => $totag,
                "agentid" => "1",
                "msgtype" => $msgtype,
                "create_user" => $User,
                "create_time" => time()
            ];
            $message['content'] = $content;
            $message['status'] = $sta;
            if ($sta == 1) {
                $WechatMessage = new WechatMessage();
                $sendmessage = $this->sendMessage($touser,$toparty,$totag,$content);
                $msg =$WechatMessage->validate(true)->save($message);// 创建数据对象
                //将数据传递到sendmessage方法中
                if (!$msg) {
                    // 如果创建失败 表示验证没有通过 输出错误提示信息
                    return $this->error($WechatMessage->getError());
                } else {
                    return $this->success("消息发送成功", "/Admin/message/wechat");
                }
            } elseif ($sta == 0) {
                $WechatMessage = new WechatMessage();
                $msg = WechatMessage::create($message); // 创建数据对象
                if (!$msg) {
                    // 如果创建失败 表示验证没有通过 输出错误提示信息
                    return $this->error($WechatMessage->getError());
                } else {
                    return $this->success("草稿保存成功", "/Admin/message/wechat");
                }
            }
        }else {
            return $this->fetch();
        }
    }

    /**
     * 删除数据
     * @param null $id
     * @return mixed
     */

    public function senddel($id = null)
    {
        $id = input('id');
        $MessageId = WechatMessage::get($id);
        $status = $MessageId->save(['status' => -1]);
        if ($status) {
            # code...
            return $this->success("删除成功", "/Admin/Message/wechat");
        } else {
            return $this->error();
        }
    }

    //重新发送消息
    public function repeat()
    {
        $id = input('id');
        $msg = WechatMessage::get($id);
        $message = array(
            "touser" => $msg['touser'],
            "toparty" => $msg['toparty'],
            'totag' =>  $msg['totag'],
            "agentid" => "1",
            "msgtype" => "text",
            "content" => $msg['content'],
            "safe" => $msg['safe'],
            'status' =>1,
            "create_time" => time()
        );
        $result = WechatMessage::create($message); // 创建数据对象
        //调试时注释语句
        $sendmessage = $this->sendMessage($msg['touser'],$msg['toparty'], $msg['totag'],$msg['content']);
        if ($result) {
            return $this->success("重新发送成功");
        } else {
            return $this->error("重新发送失败");
        }
    }

    //查看消息
    public function review(){
        $id = input('id');
        $review=WechatMessage::get($id);
        //获取发送对象
        $reviwlist = array();

        if ($review['touser']) {
            if ($review['touser'] == "@all") {
                $review['name'] = "全体成员";
                $review['tourname']="全体成员";
            } else {
                $sta = '';
                $find = explode('|', $review['touser']);
                $finddata = join(",", $find);
                $touserdata = WechatUser::all($finddata);
                foreach ($touserdata as $touser) {
                    $sta .= $touser->name . ',';
                }
                $review['name'] = rtrim($sta,',');
                $review['tourname']="个人";
            }
        }

        if ($review['toparty']) {
            $sta = '';
            $find = explode('|', $review['toparty']);
            $finddata = join(",", $find);
            $touserdata = WechatDepartment::all($finddata);
            foreach ($touserdata as $touser) {
                $sta .= $touser->name . ',';
            }
            $review['name'] =rtrim($sta, ',');
            $review['tour_1']=1;
            $review['tourname']="部门";
        }

        if ($review['totag']) {
            $sta = '';
            $find = explode('|', $review['totag']);
            $finddata = join(",", $find);
            $touserdata = WechatTag::all($finddata);
            foreach ($touserdata as $touser) {
                $sta .= $touser->tagname . ',';
            }
            $review['name'] = rtrim($sta, ',');
            $review['tourname']="标签";
        }

        $reviwlist = $review;
        return json_encode($reviwlist);
    }

    public function sendMessage($toUser='', $toParty='', $toTag='', $content='') {
        $Wechat = new TPQYWechat(Config::get('party'));
        $message = array(
            "touser" => $toUser,
            "toparty" => $toParty,
            'totag' => $toTag,
            "msgtype" => 'text',
            "agentid" => 0,
            "text" => array(
                "content" => $content,
            ),
            "safe" => "0"
        );
        $result = $Wechat->sendMessage($message);
    }

}