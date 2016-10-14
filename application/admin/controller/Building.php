<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2016/10/9
 * Time: 10:27
 */
namespace app\admin\controller;
use app\admin\model\Building as BuildingModel;
use app\admin\model\Host;
use \pinyin\PinYin;
class Building extends Admin{
    public function index(){
        $Build=new BuildingModel();
        $build=$Build->paginate(8);
        $this->assign('build',$build);
        return $this->fetch();
    }
    public function host(){
        $Host=new Host();
        $host=$Host->paginate(10);
        $this->assign('host',$host);
        return $this->fetch();
    }
    public function add(){
        return $this->fetch();
    }
    public function save(){
        $data=input('post.');
        if(empty($data['community']) || empty($data['build']) || empty($data['element']) || empty($data['floor']) || empty($data['number'])
            || empty($data['name']) || empty($data['area'])|| empty($data['use']) || empty($data['type']) || empty($data['tel']) || empty($data['carport']))
        {
            return $this->error('请输入完整信息');
        }
        $Host=new Host();
        $PinYin=new PinYin();
        $address=$data['community'].$data['build'].'栋'.$data['element'].'单元'.$data['floor'].'层'.$data['number'].'号';
        $Host->data([
            'name'=>$data['name'],
            'spell'=>$PinYin->getQp("{$data['name']}"),//输出 汉字全拼
            'first_spell'=>$PinYin->getJp("{$data['name']}"),//输出 汉字首字母
            'sex'=>$data['sex'],
            'area'=>$data['area'],
            'use'=>$data['use'],
            'type'=>$data['type'],
            'address'=>$address,
            'tel'=>$data['tel'],
            'carport'=>$data['carport']
        ]);
        $result=$Host->save();
        if($result){
            $Building=new BuildingModel();
            $Building->data([
                'community'=>$data['community'],
                'build'=>$data['build'],
                'element'=>$data['element'],
                'floor'=>$data['floor'],
                'number'=>$data['number'],
                'host'=>$result
            ]);
            if($Building->save()){
                return $this->success('新增成功','Building/index');
            }else{
                return $this->error('新增楼盘表失败');
            }
        }else{
            return $this->error('新增户主表失败');
        }
    }
    public function detail(){
        $id=input('post.id');
        $host=Host::get($id);
        if($host!==null){
            return json_encode($host);
        }else{
            return '无';
        }
    }
    public function edit(){
        $id=input('param.id');
        $build=BuildingModel::get($id);
        if($build==null){
            return $this->error('未获取到指定数据');
        }
        $host=Host::get($build->host);
        $this->assign('build',$build);
        $this->assign('host',$host);
        return $this->fetch();
    }
    public function update(){
        $data=input('post.');
        $bid=$data['bid'];
        $hid=$data['hid'];
        if(empty($data['community']) || empty($data['build']) || empty($data['element']) || empty($data['floor']) || empty($data['number'])
            || empty($data['name']) || empty($data['area'])|| empty($data['use']) || empty($data['type']) || empty($data['tel']) || empty($data['carport']))
        {
            return $this->error('请输入完整信息');
        }
        $PinYin=new PinYin();
        $Host=new Host();
        $address=$data['community'].$data['build'].'栋'.$data['element'].'单元'.$data['floor'].'层'.$data['number'].'号';
        $Host->save([
            'name'=>$data['name'],
            'spell'=>$PinYin->getQp("{$data['name']}"),//输出 汉字全拼
            'first_spell'=>$PinYin->getJp("{$data['name']}"),//输出 汉字首字母
            'sex'=>$data['sex'],
            'area'=>$data['area'],
            'use'=>$data['use'],
            'type'=>$data['type'],
            'address'=>$address,
            'tel'=>$data['tel'],
            'carport'=>$data['carport']
        ],['id'=>$hid]);
        $Building=new BuildingModel();
        $Building->save([
            'community'=>$data['community'],
            'build'=>$data['build'],
            'element'=>$data['element'],
            'floor'=>$data['floor'],
            'number'=>$data['number'],
            'host'=>$hid
        ],['id'=>$bid]);
        return $this->success('更新成功');
    }
    public function del(){
        $id=input('param.id');
        $build=BuildingModel::get($id);
        $hid=$build->host;
        if($build->delete()){
            $host=Host::get($hid);
            $host->delete();
            return $this->success('删除成功');
        }else{
            return $this->error('删除失败');
        }
    }
    public function search(){
        $name=input('post.name');
        $Host=new Host();
        $data=$Host->where('name',$name)->select();
        return $data;
 //输出 汉字首字母 横线分割
// var_dump($PinYin->getJpDelimiter("电风扇300sk200",'-'));

 //输出 汉字全拼 横线分割
// var_dump($PinYin->getQpDelimiter("电风啊aab发扇sd300真好300",'-'));
    }
}