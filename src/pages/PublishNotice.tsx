import React from 'react'
import { Button, Form, Input, Card, message ,Upload} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import styled from "styled-components";
import { publishNotice } from '../api/notice';
import { useNavigate } from 'react-router-dom';
const { TextArea} = Input;

const LoginBox = styled.div`
  width: 50%;
  margin: 20px auto;
  text-align: center;
`;
    
export default function PublishNotice() {
  const navigate=useNavigate()

    let filePath = "";

    const uploadFile: UploadProps = {
        name: "file",
        action: "http://8.141.161.245:8080/api/upload/notice",
        onChange(info) {
          if (info.file.status !== "uploading") {
            filePath = info.file.response;
          }
          if (info.file.status === "done") {
            message.success(`${info.file.name} file uploaded successfully`);
          } else if (info.file.status === "error") {
            message.error(`${info.file.name} file upload failed.`);
          }
        },
      };


    const onFinish = (data: any) => {
        let noticeData:any = {...data}
        noticeData.filePath=filePath;

        publishNotice(noticeData)
          .then((res) => {
            let data = res.data;
            if (data.state === 200) {
              message.success("发布成功");
              navigate('/')
            } else {
              message.error(data.msg);
            }
          })
          .catch(() => {
            message.error("系统异常 请联系管理员");
          });
      };
  return (
    <LoginBox>
      <Card
        title="发布公告"
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
          autoComplete="off"
        >
          <div>
            <Form.Item
              label="标题"
              name="title"
              rules={[{ required: true, message: "请输入标题" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="内容"
              name="content"
              rules={[{ required: true, message: "请输入内容" }]}
            >
              <TextArea rows={4} />
            </Form.Item>
          </div>

          <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
            <Upload {...uploadFile}>
              <Button icon={<UploadOutlined />}>
                上传附件
              </Button>
            </Upload>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
            <Button type="primary" htmlType="submit">
              发布公告
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </LoginBox>
  )
}
