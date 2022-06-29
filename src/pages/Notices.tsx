import React from "react";
import {Typography, Divider, Card} from "antd";
import {useEffect, useState} from "react";
import {getAllNotices} from "../api/notice";
import {Link} from "react-router-dom";
import styled from "styled-components";

const {Title, Paragraph, Text} = Typography;

const NoticesBox = styled.div`
  background-color: white;
`

export default function Notices() {
    // Hook
    const [notices, setNotices] = useState<[any]>();

    // 获取所有的公告
    useEffect(() => {
        getAllNotices().then((res: any) => {
            setNotices(res.data.data);
            console.log(res.data.data)
        });
    }, []);

    return (
        <NoticesBox>
            <Title level={3} style={{
                display: "flex",
                justifyContent: "center",
                paddingTop: "20px",
            }}>公告</Title>

            <Divider/>


            {notices?.map((notice) => {
                return (
                    <Card key={notice.id} bordered={false} style={{display: "flex", justifyContent: "center"}}>
                        <Paragraph>
                            <Title level={5}><Link to={`/notice/${notice.id}`}>{notice.title}</Link></Title>
                            {notice.content}
                            <br/>
                            <br/>
                            <Text italic style={{display: "flex", justifyContent: "end"}}>{notice.updatedAt}</Text>
                        </Paragraph>
                    </Card>
                );
            })}
        </NoticesBox>
    );
}
