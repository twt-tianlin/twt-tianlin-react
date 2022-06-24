import { Button, Form, Input, Card } from "antd";
import React from "react";
import { changeUserInfo } from "../features/user/userSlice";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { selectUser } from "../features/user/userSlice";

const LoginBox = styled.div`
  height: 300px;
  width: 520px;
  margin: 20px auto;
  text-align: center;
`;

export const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(selectUser)

  if(user.uid!==0){
    navigate('/')
  }

  const onFinish = (data: any) => {
    dispatch(changeUserInfo(data))
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
