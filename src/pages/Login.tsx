import { Button, Form, Input, Card, message } from "antd";
import React from "react";
import { login } from "../api/user";

import { useNavigate } from "react-router-dom";

import styled from "styled-components";

const LoginBox = styled.div`
  height: 300px;
  width: 520px;
  margin: 20px auto;
  text-align: center;
`;

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const onFinish = (data: any) => {
    login(data)
      .then((res) => {
        let data = res.data;
        if (data.state === 200) {
          localStorage.setItem("token", data.data.token);
          localStorage.setItem("name", data.data.name);
          localStorage.setItem("uid",data.data.id);
          message.success("登录成功");
          navigate("/");
        } else {
          message.error(data.msg);
        }
      })
      .catch(() => {
        message.error("系统异常 请联系管理员");
      });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <LoginBox>
      <Card
        title="登录"
        style={{ backgroundColor: "#fcfcfc" }}
        hoverable={true}
      >
        <br />
        <Form
          name="basic"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 15 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <div>
            <Form.Item
              label="邮箱"
              name="email"
              rules={[{ required: true, message: "请输入您的邮箱" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="密码"
              name="password"
              rules={[{ required: true, message: "请输入您的密码" }]}
            >
              <Input.Password />
            </Form.Item>
          </div>

          <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
            <Button type="primary" htmlType="submit">
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </LoginBox>
  );
};
