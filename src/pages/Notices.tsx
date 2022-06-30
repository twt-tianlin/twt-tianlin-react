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
                    <div style={{marginLeft:`28%`,marginTop:`10px`,width:`50%`}}>
                        <br></br>
                        <h2><Link to={`/notice/${notice.id}`} style={{color:`#344B77`}}>{notice.title}</Link></h2>
                        <p>{notice.content}</p>
                        <p style={{textAlign:`right`,marginRight:`10%`}}>{notice.updatedAt}</p>
                        <br></br>
                    </div>
                );
            })}
        </NoticesBox>
    );
}
