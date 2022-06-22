import { Button, Form, Input, Card, message } from "antd";
import React from "react";
import { register } from "../api/user";
import { useNavigate } from "react-router-dom";

import styled from "styled-components";

const LoginBox = styled.div`
  height: 400px;
  width: 520px;
  margin: 20px auto;
  text-align: center;
`;

export const Register: React.FC = () => {
  const navigate = useNavigate();
  const onFinish = (data: any) => {
    if (data.password !== data.confirmPassword) {
      message.error("两次输入密码不匹配");
    } else {
      register(data)
        .then((res) => {
          let data = res.data;
          if (data.state === 200) {
            localStorage.setItem("token", data.data.token);
            localStorage.setItem("name", data.data.name);
            localStorage.setItem("uid", data.data.id);
            message.success("注册成功");
            navigate("/");
          } else {
            message.error(data.msg);
          }
        })
        .catch(() => {
          message.error("系统异常 请联系管理员");
        });
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <LoginBox>
      <Card
        title="注册"
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
              label="姓名"
              name="name"
              rules={[{ required: true, message: "请输入您的姓名" }]}
            >
              <Input />
            </Form.Item>

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
            <Form.Item
              label="确认密码"
              name="confirmPassword"
              rules={[{ required: true, message: "请确认您的密码" }]}
            >
              <Input.Password />
            </Form.Item>
          </div>

          <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
            <Button type="primary" htmlType="submit">
              注册
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </LoginBox>
  );
};
