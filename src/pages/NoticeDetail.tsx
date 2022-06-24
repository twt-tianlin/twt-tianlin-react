import React from "react";
import { useParams } from "react-router-dom";
import {  useEffect } from "react";
import { getNoticeDetail } from "../api/notice";
import { Typography, Card,Divider } from "antd";
import { useState } from "react";

const { Title, Paragraph, Text } = Typography;

export default function NoticeDetail() {
  const initialTitle = {
    id:1,
    title:'',
    content:'',
    filePath:'',
    updateAt:''
  }

  const params = useParams();
  const [notice, setNotice] = useState<any>(initialTitle);

  useEffect(() => {
   async function fetchData(id:string)  {
    const result = await getNoticeDetail(id)
    setNotice(result.data.data)
   }
   fetchData(params.id||'')
  }, [params.id]);

  

  return (
    <div>
      <Card  bordered={true}>
        <Paragraph>
          <Title level={2}>公告</Title>
          <Divider />
          <Title level={4}>{notice.title}</Title>
          <blockquote>{notice.content}</blockquote>
          <Text>附件  【 <a onClick={()=>window.open("http://localhost:8080/notice/attachment?filePath="+notice.filePath)}> {notice.filePath.substring(notice.filePath.lastIndexOf("/")+1)} </a> 】</Text>
          <br />
          <Text italic>{notice.updatedAt}</Text>
        </Paragraph>
      </Card>
    </div>
  );
}
