// @ts-nocheck
import React from "react";
import { Card, Col, Row } from "antd";
import { Link } from "react-router-dom";
import { getHomeNotices } from "../api/notice";
import { useEffect, useState } from "react";
import { useAppSelector } from "../app/hooks";
import { selectUser } from "../features/user/userSlice";
import AdminButton from "./AdminButton";

const gridStyle: React.CSSProperties = {
  width: "100%",
  textAlign: "center",
};

export default function Main() {
  const user = useAppSelector(selectUser);
  console.log(user);

  const [homeNotices, setHomeNotices] = useState<[any]>();

  useEffect(() => {
    getHomeNotices().then((res: any) => {
      setHomeNotices(res.data.data);
    });
  }, []);
  return (
    <>
      <div className="site-card-wrapper">
        <Row justify="center">
          {user.role === "user" && (
            <Col span={6}>
              <Card title="功能" bordered={false}>
                <Card.Grid style={gridStyle}>
                  <a href="/apply">学生报名系统</a>
                </Card.Grid>
                <Card.Grid style={gridStyle}>
                  <a href="/confirm">录取报道系统</a>
                </Card.Grid>
              </Card>
            </Col>
          )}

          {user.role==="admin"&& <AdminButton />}

          {user.role === "" && <p>请先登录</p>}

          <Col span={6}>
            <Card
              title="公告"
              bordered={false}
              extra={<Link to="/notices">More</Link>}
            >
              <div>
                {homeNotices?.map((notice) => {
                  return (
                    <Link key={notice.id} to={`/notice/${notice.id}`}>
                      {notice.title}
                    </Link>
                  );
                })}
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}
