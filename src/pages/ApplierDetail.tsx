import React from 'react'
import { Descriptions,Button, message } from 'antd';
import { admitUserApi } from '../api/apply';

export default function ApplierDetail() {

    const admitUser = (uid:number)=>{
        admitUserApi(uid).then((res:any)=>{
            let data = res.data
            if(data.state===200){
                message.success("录取成功")
            }else{
                message.error(data.msg)
            }
        }).catch(()=>{
            message.error("系统异常 请联系管理员")
        })
    }

  return (
    <div>
    <Descriptions
      title="详细信息"
      bordered
      column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
    >
      <Descriptions.Item label="姓名">史熹东</Descriptions.Item>
      <Descriptions.Item label="性别">男</Descriptions.Item>
      <Descriptions.Item label="民族">汉族</Descriptions.Item>
      <Descriptions.Item label="出生日期">2002-09-17</Descriptions.Item>
      <Descriptions.Item label="籍贯">山东</Descriptions.Item>
      <Descriptions.Item label="申请身份">积极分子</Descriptions.Item>
      <Descriptions.Item label="是否有入党意愿">是</Descriptions.Item>
      <Descriptions.Item label="学院">智算</Descriptions.Item>
      <Descriptions.Item label="手机号码">18561796738</Descriptions.Item>
      <Descriptions.Item label="QQ">299110977</Descriptions.Item>
      <Descriptions.Item label="身份证号码">370285200209177136</Descriptions.Item>
      <Descriptions.Item label="邮箱">2499110977@qq.com</Descriptions.Item>
      <Descriptions.Item label="备注">无</Descriptions.Item>
      <Descriptions.Item label="生源地">山东</Descriptions.Item>
      <Descriptions.Item label="毕业高中">莱西市实验学校</Descriptions.Item>
      <Descriptions.Item label="户口所在地">山东</Descriptions.Item>
      <Descriptions.Item label="高考成绩">640</Descriptions.Item>
      <Descriptions.Item label="高中阶段任职/工作经历">无任职经历</Descriptions.Item>
      <Descriptions.Item label="高中阶段所获荣誉">无荣誉</Descriptions.Item>
      <Descriptions.Item label="T恤尺寸">XL</Descriptions.Item>
      <Descriptions.Item label="兴趣爱好">
       无兴趣爱好
      </Descriptions.Item>
      <Descriptions.Item label="个人评价">
        无个人评价
      </Descriptions.Item>
      <Descriptions.Item label="申请时间">
      2022-06-21 15:09:15
      </Descriptions.Item>
    </Descriptions>
    <Button onClick={()=>admitUser(1)}>录取</Button>
  </div>
  )
}
