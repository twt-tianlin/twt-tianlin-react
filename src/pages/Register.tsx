import { Button, Form, Input, Card } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { autoChangeUserInfo, selectUser } from "../features/user/userSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";

import styled from "styled-components";

const LoginBox = styled.div`
  height: 400px;
  width: 520px;
  margin: 20px auto;
  text-align: center;
`;

export const Register: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser)
  if(user.uid!==0){
    navigate('/')
  }
  
  const onFinish = (data: any) => {
    dispatch(autoChangeUserInfo(data))
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
