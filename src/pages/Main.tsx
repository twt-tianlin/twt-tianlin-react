// @ts-nocheck
import React from "react";
import {Card, Col, Row} from "antd";
import {Link} from "react-router-dom";
import {getHomeNotices} from "../api/notice";
import {useEffect, useState} from "react";
import {useAppSelector} from "../app/hooks";
import {selectUser} from "../features/user/userSlice";
import AdminButton from "../components/AdminButton";
import UserButton from "../components/UserButton";
import styled from "styled-components";
import NoLoginButton from "../components/NoLoginButton";

const FunctionAndNoticeBox = styled.div`
  height: 300px;
`;

const NoticesBox = styled.div`
  margin: 10px;
  display: flex;
  justify-content: space-between;
`

export default function Main() {
    // Hook
    const user = useAppSelector(selectUser);
    const [homeNotices, setHomeNotices] = useState<[any]>();

    // 首页获取三条最新公告
    useEffect(() => {
        getHomeNotices().then((res: any) => {
            setHomeNotices(res.data.data);
        });
    }, []);

    return (
        <>
            <div className="site-card-wrapper" style={{backgroundColor:"#f5f8fa",marginTop:"30px"}}>
                <Row justify="center">
                    <Col span={3}></Col>

                    <Col span={6}>
                        <FunctionAndNoticeBox >
                            <Card title="功能" bordered={false} style={{backgroundColor:"#f5f8fa"}}>
                                {/* 普通用户的按钮 */}
                                {user.role === "user" && <UserButton/>}

                                {/* 管理员的按钮 */}
                                {user.role === "admin" && <AdminButton/>}

                                {/* 未登录按钮 */}
                                {user.role === "" && <NoLoginButton/>}
                            </Card>
                        </FunctionAndNoticeBox>
                    </Col>

                    <Col span={1}></Col>

                    <Col span={10}>
                        <FunctionAndNoticeBox>
                            <Card
                                title="公告"
                                bordered={false}
                                extra={<Link to="/notices">更多</Link>}
                                style={{backgroundColor:"#f5f8fa"}}
                            >
                                <div>
                                    {homeNotices?.map((notice) => {
                                        return (
                                            <NoticesBox key={notice.id}>
                                                <Link to={`/notice/${notice.id}`}>
                                                    {notice.title}
                                                </Link>
                                                {notice.createdAt}
                                                <br/>
                                            </NoticesBox>
                                        );
                                    })}
                                </div>
                            </Card>
                        </FunctionAndNoticeBox>
                    </Col>

                    <Col span={4}></Col>
                </Row>
            </div>
        </>
    );
}
