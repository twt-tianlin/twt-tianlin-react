import React from "react";
import { useParams } from "react-router-dom";
import {  useEffect } from "react";
import { getNoticeDetail } from "../api/notice";
import { Typography, Card } from "antd";
import { useState } from "react";
const { Title, Paragraph, Text } = Typography;

export default function NoticeDetail() {
  const initialTitle = {
    id:1,
    title:'',
    content:'',
    updateAt:''
  }

  const params = useParams();
  const [notice, setNotice] = useState<any>(initialTitle);

  const [id,setId] = useState<string>(params.id as string);
  useEffect(() => {
   async function fetchData(id:string)  {
    const result = await getNoticeDetail(id)
    setNotice(result.data.data)
    console.log(result.data.data)
   }
   fetchData(id)
  }, []);

  

  return (
    <div>
      <Card  bordered={true}>
        <Paragraph>
          <Title level={4}>{notice.title}</Title>
          <blockquote>{notice.content}</blockquote>
          <Text italic>{notice.updatedAt}</Text>
        </Paragraph>
      </Card>
    </div>
  );
}
