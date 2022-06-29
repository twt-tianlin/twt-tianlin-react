import React, { useEffect,useState } from "react";
import { Card, message } from "antd";
import { Space, Table,Button } from "antd";
import type { ColumnsType } from "antd/lib/table";
import { Link } from "react-router-dom";
import {getApplyUser} from '../api/check'
import styled from "styled-components";

// 表格每一行 数据格式
interface DataType {
  key: string;
  uid: string;
  name: string;
  gender: string;
  major: string;
  identity: string;
  partyWill: string;
}

// 表格信息
const columns: ColumnsType<DataType> = [
  {
    title: "序号",
    dataIndex: "uid",
    key: "uid",
  },
  {
    title: "姓名",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "性别",
    dataIndex: "gender",
    key: "gender",
  },
  {
    title: "录取大类",
    dataIndex: "major",
    key: "major",
  },
  {
    title: "申请身份",
    dataIndex: "identity",
    key: "identity",
  },
  {
    title: "是否有入党意愿",
    dataIndex: "partyWill",
    key: "partyWill",
  },
  {
    title: "详情信息",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <Link to={`/applierDetail/${record.uid}`} >查看</Link>
      </Space>
    ),
  },
];


const gridStyle: React.CSSProperties = {
  width: "33%",
  textAlign: "center",
};

const CheckProcessBox = styled.div`
  margin: 0 auto;
  width: 70%;
`

export default function CheckProcess() {
    // Hook
    const [applyUsers,setApplyUsers] = useState<DataType[]>([])

    // 首次渲染获取所有的申请人
    useEffect(()=>{
        getApplyUser().then((res:any)=>{
            const data = res.data
            if(data.state===200){
                setApplyUsers(data.data)
            }else{
                message.error(data.msg)
            }
        }).catch(()=>{
            message.error("系统异常 请联系管理员")
        })
    },[])

  return (
    <CheckProcessBox>

            <Card title="导出" style={{textAlign:'center',marginTop:"20px"}}>
                <Card.Grid style={gridStyle} onClick={()=>window.open("http://localhost:8080/api/download/applyInfo")}>
                    <Button type="link">导出报名信息</Button></Card.Grid>
                <Card.Grid style={gridStyle} onClick={()=>window.open("http://localhost:8080/api/download/confirmInfo")}>
                    <Button type="link">导出确认信息</Button></Card.Grid>
                <Card.Grid style={gridStyle} onClick={()=>window.open("http://localhost:8080/api/download/attachment")}>
                    <Button type="link">导出学生佐证材料</Button></Card.Grid>
            </Card>
            <br />

            <Table columns={columns} dataSource={applyUsers} />

    </CheckProcessBox>
  );
}
