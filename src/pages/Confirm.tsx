import React, { useState,useEffect } from "react";
import { Button, Form, Input, Card, message, Radio } from "antd";
import styled from "styled-components";
import { confirmInfo } from "../api/confirm";
import { RadioChangeEvent, Col, Checkbox, Row } from "antd";
import { useNavigate } from "react-router-dom";
import { getStatus } from "../api/status";

const ConfirmInfoBox = styled.div`
  height: auto;
  width: auto;
  margin: 20px auto;
  text-align: center;
`;

export default function Confirm() {
  const [confirmTrain, setConfirmTrain] = useState<boolean>(false);
  const [needBed, setNeedBed] = useState<boolean>(false);

  const navigate = useNavigate()

  useEffect(()=>{
    getStatus().then((res:any)=>{
      if(!res.data.data.confirm){
        message.error("录取报道系统暂未开启")
        navigate(-1)
      }
    })
  },[navigate])

  const changeConfirm = (e: RadioChangeEvent) => {
    if (e.target.value === "1") {
      setConfirmTrain(true);
    } else {
      setConfirmTrain(false);
    }
  };
  const changeNeedBed = (e: RadioChangeEvent) => {
    if (e.target.value === "1") {
      setNeedBed(true);
    } else {
      setNeedBed(false);
    }
  };

  const onFinish = (data: any) => {

    data.uid=localStorage.getItem('uid')
    console.log(data)
    confirmInfo(data)
      .then((res) => {
        let data = res.data;
        if (data.state === 200) {
          message.success("提交成功");
        } else {
          message.error(data.msg);
        }
      })
      .catch(() => {
        message.error("系统异常 请联系管理员");
      });
  };

  return (
    <ConfirmInfoBox>
      <Card
        title="确认信息"
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
          <Form.Item
            label="姓名"
            name="name"
            rules={[{ required: true, message: "请输入标题" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="身份证号码"
            name="idcard"
            rules={[{ required: true, message: "请输入身份证号码" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="是否确认能够参加此次培训" name="isJoin">
            <Radio.Group onChange={changeConfirm}>
              <Radio value="1"> 是 </Radio>
              <Radio value="2"> 否 </Radio>
            </Radio.Group>
          </Form.Item>

          {confirmTrain && (
            <Form.Item label="是否需要购买卧具" name="buy">
              <Radio.Group onChange={changeNeedBed}>
                <Radio value="1"> 是 </Radio>
                <Radio value="2"> 否 </Radio>
              </Radio.Group>
            </Form.Item>
          )}

          {needBed && confirmTrain && (
            <Form.Item name="bedNeed" label="卧具">
              <Checkbox.Group>
                <Row>
                  <Col span={8}>
                    <Checkbox value="棕垫" style={{ lineHeight: "32px" }}>
                      棕垫
                    </Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value="棉被" style={{ lineHeight: "32px" }}>
                      棉被
                    </Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value="棉褥" style={{ lineHeight: "32px" }}>
                      棉褥
                    </Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value="被罩" style={{ lineHeight: "32px" }}>
                      被罩
                    </Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value="床单" style={{ lineHeight: "32px" }}>
                      床单
                    </Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value="枕头" style={{ lineHeight: "32px" }}>
                      枕头
                    </Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value="枕巾" style={{ lineHeight: "32px" }}>
                      枕巾
                    </Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value="枕套" style={{ lineHeight: "32px" }}>
                      枕套
                    </Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value="蚊帐" style={{ lineHeight: "32px" }}>
                      蚊帐
                    </Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value="凉被" style={{ lineHeight: "32px" }}>
                      凉被
                    </Checkbox>
                  </Col>
                </Row>
              </Checkbox.Group>
            </Form.Item>
          )}

          {confirmTrain && (
            <>
              <Form.Item
                label="到津方式"
                name="wayToJin"
                rules={[{ required: true, message: "请输入到津方式" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="到津站点"
                name="station"
                rules={[{ required: true, message: "请输入到津站点" }]}
              >
                <Input />
              </Form.Item>
            </>
          )}

          <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </ConfirmInfoBox>
  );
}
