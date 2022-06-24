// @ts-nocheck
import React from "react";
import { Card, Col, Row } from "antd";
import { Link } from "react-router-dom";
import { getHomeNotices } from "../api/notice";
import { useEffect, useState } from "react";
import { useAppSelector } from "../app/hooks";
import { selectUser } from "../features/user/userSlice";
import AdminButton from "../components/AdminButton";
import UserButton from "../components/UserButton";
import styled from "styled-components";

const FunctionAndNoticeBox = styled.div`
  height: 300px;
`;

const NoticesBox = styled.div`
  margin:10px;
  display:flex;
  justify-content: space-between;
`

export default function Main() {
  const user = useAppSelector(selectUser);
  const [homeNotices, setHomeNotices] = useState<[any]>();

  useEffect(() => {
    // 首页获取三条最新公告
    getHomeNotices().then((res: any) => {
      setHomeNotices(res.data.data);
    });
  }, []);

  console.log(homeNotices)
  return (
    <>
      <div className="site-card-wrapper">
        <Row justify="center">
          <Col span={3}></Col>

          <Col span={6}>
            <FunctionAndNoticeBox>
              <Card title="功能" bordered={false}>
                {/* 普通用户的按钮 */}
                {user.role === "user" && <UserButton ></UserButton>}

                {/* 管理员的按钮 */}
                {user.role === "admin" && <AdminButton />}

                {/* 未登录按钮 */}
                {user.role === "" && <p>请先登录</p>}
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
              >
                <div>
                  {homeNotices?.map((notice) => {
                    return (
                      <NoticesBox key={notice.id}>
                        <Link to={`/notice/${notice.id}`}>
                          {notice.title}
                        </Link>
                        {notice.createdAt}
                        <br />
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
