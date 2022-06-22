import React from "react";
import { useParams } from "react-router-dom";
import {  useEffect } from "react";
import { getNoticeDetail } from "../api/notice";
import { Typography, Card } from "antd";
const { Title, Paragraph, Text } = Typography;

export default function NoticeDetail() {
  // const [notice, setNotice] = useState<any>();
  const params = useParams();
  const id: string = params.id || "";
  useEffect(() => {
    getNoticeDetail(id).then((res: any) => {
      // setNotice(res.data.data);
      console.log(res.data.data);
    });
  }, [id]);

  return (
    <div>
      <Card  bordered={true}>
        <Paragraph>
          <Title level={4}>天津大学2021级本科新生骨干培训“天麟班”十一期学员拟录取名单</Title>
          <blockquote>天津大学2021级本科新生骨干培训“天麟班”十一期学员拟录取名单</blockquote>
          <Text italic>2022-06-21 09:51:23</Text>
        </Paragraph>
      </Card>
    </div>
  );
}
