import React from 'react'
import { Descriptions,Button, message } from 'antd';
import { admitUserApi } from '../api/apply';
import { useState,useEffect } from 'react';
import { getApplierDetail } from '../api/apply';
import { useParams } from "react-router-dom";

export default function ApplierDetail() {

  const params = useParams();


  const [id,setId] = useState<string>(params.id as string);

  const initialState = {
    uid:0,
    name:'',
    gender:'',
    nation:'',
    birthDate:'',
    nativePlace:'',
    identity: '',
    partyWill: '',
    major: '',
    phone:'',
    qq:'',
    idcard:'',
    email:'',
    identityDetail:'',
    fromPlace:'',
    highSchool:'',
    household:'',
    score:'',
    highSchoolExp:'',
    highSchoolHonour:'',
    clothesSize:'',
    hobby:'',
    introduction:'',
    createdAt:'',
    admit:''
  }

  const [applier,setApplier] = useState(initialState); 

  useEffect(()=>{
      getApplierDetail(id).then((res:any)=>{
        const data = res.data
        if(data.state===200){
          setApplier(data.data)
        }else{
          message.error(data.msg)
        }
      }).catch(()=>{
        message.error("系统异常 请联系管理员")
      })
  },[])

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
      <Descriptions.Item label="姓名">{applier.name}</Descriptions.Item>
      <Descriptions.Item label="性别">{applier.gender}</Descriptions.Item>
      <Descriptions.Item label="民族">{applier.nation}</Descriptions.Item>
      <Descriptions.Item label="出生日期">{applier.birthDate}</Descriptions.Item>
      <Descriptions.Item label="籍贯">{applier.nativePlace}</Descriptions.Item>
      <Descriptions.Item label="申请身份">{applier.identity}</Descriptions.Item>
      <Descriptions.Item label="是否有入党意愿">{applier.partyWill}</Descriptions.Item>
      <Descriptions.Item label="学院">{applier.major}</Descriptions.Item>
      <Descriptions.Item label="手机号码">{applier.phone}</Descriptions.Item>
      <Descriptions.Item label="QQ">{applier.qq}</Descriptions.Item>
      <Descriptions.Item label="身份证号码">{applier.idcard}</Descriptions.Item>
      <Descriptions.Item label="邮箱">{applier.email}</Descriptions.Item>
      <Descriptions.Item label="备注">{applier.identityDetail}</Descriptions.Item>
      <Descriptions.Item label="生源地">{applier.fromPlace}</Descriptions.Item>
      <Descriptions.Item label="毕业高中">{applier.highSchool}</Descriptions.Item>
      <Descriptions.Item label="户口所在地">{applier.household}</Descriptions.Item>
      <Descriptions.Item label="高考成绩">{applier.score}</Descriptions.Item>
      <Descriptions.Item label="高中阶段任职/工作经历">{applier.highSchoolExp}</Descriptions.Item>
      <Descriptions.Item label="高中阶段所获荣誉">{applier.highSchoolHonour}</Descriptions.Item>
      <Descriptions.Item label="T恤尺寸">{applier.clothesSize}</Descriptions.Item>
      <Descriptions.Item label="兴趣爱好">
      {applier.hobby}
      </Descriptions.Item>
      <Descriptions.Item label="个人评价">
      {applier.introduction}
      </Descriptions.Item>
      <Descriptions.Item label="申请时间">
      {applier.createdAt}
      </Descriptions.Item>
    </Descriptions>
    <Button onClick={()=>admitUser(applier.uid)}>{applier.admit}</Button>
  </div>
  )
}
