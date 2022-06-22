import React from "react";
import styled from "styled-components";
import { UploadOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { commitApply } from "../api/apply";
import { useState } from "react";
import locale from "antd/lib/locale/zh_CN";
import moment from "moment";
import {
  Form,
  Input,
  Radio,
  Select,
  DatePicker,
  Card,
  Button,
  Upload,
  message,
  ConfigProvider,
} from "antd";

const ApplyBox = styled.div`
  height: 1600px;
  width: auto;
  margin: 20px auto;
  text-align: center;
`;

const { TextArea } = Input;

export default function Apply() {
  let photoPath = "";
  let filePath = "";

  const [isShowIdentityDetail, setIsShowIdentityDetail] = useState(false);
  const [initBirthDate, setInitBirthDate] = useState<string>("2000-01-01");

  const controllDetail = (value: string) => {
    if (value === "高中阶段获得省级以上荣誉" || value === "其他") {
      setIsShowIdentityDetail(true);
    } else {
      setIsShowIdentityDetail(false);
    }
  };
  const changeBirthDate = (value: any) => {
    if (value.target.value.length === 18) {
      setInitBirthDate("" +
      value.target.value[6] +
      value.target.value[7] +
      value.target.value[8] +
      value.target.value[9]+"-"+
      value.target.value[10]+
      value.target.value[11]+"-"+
      value.target.value[12]+
      value.target.value[13])
    }
  };

  const uploadPhoto: UploadProps = {
    name: "file",
    action: "http://localhost:8080/upload/photo",
    onChange(info) {
      if (info.file.status !== "uploading") {
        photoPath = info.file.response;
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const uploadFile: UploadProps = {
    name: "file",
    action: "http://localhost:8080/upload/file",
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
    
    let applyData: any = { ...data };
    
    applyData.uid = localStorage.getItem("uid");
    applyData.birthDate=initBirthDate;
    applyData.photoPath = photoPath;
    applyData.filePath = filePath;

    commitApply(applyData)
      .then((res: any) => {
        const data = res.data;
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
    <ApplyBox>
      <Card
        title="天麟班申请"
        style={{ backgroundColor: "#fcfcfc" }}
        hoverable={true}
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          onFinish={onFinish}
        >
          <Form.Item label="姓名" name="name">
            <Input />
          </Form.Item>

          <Form.Item label="性别" name="gender">
            <Radio.Group>
              <Radio value="1"> 男 </Radio>
              <Radio value="2"> 女 </Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="民族" name="nation">
            <Input />
          </Form.Item>

          <Form.Item label="籍贯" name="nativePlace">
            <Input />
          </Form.Item>

          <Form.Item label="身份证号码" name="idcard">
            <Input onChange={changeBirthDate} />
          </Form.Item>

          <Form.Item label="出生日期" name="birthDate">
            <ConfigProvider locale={locale}>
              <DatePicker
                defaultValue={moment(initBirthDate)}
                format="YYYY-MM-DD"
                value={moment(initBirthDate)}
              />
            </ConfigProvider>
          </Form.Item>

          <Form.Item label="手机号码" name="phone">
            <Input />
          </Form.Item>

          <Form.Item label="QQ号码" name="qq">
            <Input />
          </Form.Item>

          <Form.Item label="电子邮箱" name="email">
            <Input />
          </Form.Item>

          <Form.Item label="生源地" name="fromPlace">
            <Input />
          </Form.Item>

          <Form.Item label="毕业高中" name="highSchool">
            <Input />
          </Form.Item>

          <Form.Item label="户口所在地" name="household">
            <Input />
          </Form.Item>

          <Form.Item label="高考成绩" name="score">
            <Input />
          </Form.Item>

          <Form.Item label="申报身份" name="identity">
            <Select onChange={controllDetail}>
              <Select.Option value="中共党员">中共党员</Select.Option>
              <Select.Option value="中共预备党员">中共预备党员</Select.Option>
              <Select.Option value="入党发展对象">入党发展对象</Select.Option>
              <Select.Option value="入党积极分子">入党积极分子</Select.Option>
              <Select.Option value="其他">其他</Select.Option>
              <Select.Option value="高中阶段获得省级以上荣誉">
                高中阶段获得省级以上荣誉
              </Select.Option>
            </Select>
          </Form.Item>
          {isShowIdentityDetail && (
            <Form.Item label="备注" name="identityDetail">
              <Input />
            </Form.Item>
          )}

          <Form.Item label="是否有入党意愿" name="partyWill">
            <Radio.Group>
              <Radio value="1"> 是 </Radio>
              <Radio value="2"> 否 </Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="录取大类" name="major">
            <Input />
          </Form.Item>

          <Form.Item label="T恤尺寸" name="clothesSize">
            <Radio.Group>
              <Radio value="M(165)"> M(165) </Radio>
              <Radio value="L(170)"> L(170) </Radio>
              <Radio value="XL(175)"> XL(175) </Radio>
              <Radio value="2XL(180)"> 2XL(180) </Radio>
              <Radio value="3XL(185)"> 3XL(185) </Radio>
              <Radio value="4XL(190)"> 4XL(190) </Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            label="高中阶段任职/竞赛/活动经历(限80字)"
            name="highSchoolExp"
          >
            <TextArea rows={4} />
          </Form.Item>

          <Form.Item label="高中阶段所获荣誉(限80字):" name="highSchoolHonour">
            <TextArea rows={4} />
          </Form.Item>

          <Form.Item label="兴趣爱好(限80字)" name="hobby">
            <TextArea rows={4} />
          </Form.Item>

          <Form.Item label="个人评价(限80字)" name="introduction">
            <TextArea rows={4} />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
            <Upload {...uploadPhoto}>
              <Button icon={<UploadOutlined />}>上传一寸免冠照片</Button>
            </Upload>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
            <Upload {...uploadFile}>
              <Button icon={<UploadOutlined />}>
                上传相关资料压缩文件(rar/zip)
              </Button>
            </Upload>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
            <Button type="primary" htmlType="submit">
              提交申请
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </ApplyBox>
  );
}
