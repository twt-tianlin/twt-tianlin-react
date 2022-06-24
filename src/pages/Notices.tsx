import React from "react";
import { Typography, Divider, Card } from "antd";
import { useEffect, useState } from "react";
import { getAllNotices } from "../api/notice";
import { Link } from "react-router-dom";

const { Title, Paragraph,Text } = Typography;

export default function Notices() {
  const [notices, setNotices] = useState<[any]>();
  useEffect(() => {
    getAllNotices().then((res: any) => {
      setNotices(res.data.data);
      console.log(res.data.data)
    });
  }, []);

  return (
    <div>
      <Title style={{display:"flex",justifyContent:"center",alignContent:"center",marginTop:"20px"}}>公告</Title>
      <Divider />

      {notices?.map((notice) => {
        return (
          <Card key={notice.id} bordered={false} style={{display:"flex",justifyContent:"center"}}>
            <Paragraph>
            <Title level={5}><Link to={`/notice/${notice.id}`}>{notice.title}</Link></Title>
              {notice.content}
              <br />
              <br />
              <Text italic style={{display:"flex",justifyContent:"end"}}>{notice.updatedAt}</Text>
            </Paragraph>
          </Card>
        );
      })}
    </div>
  );
}
