import React, {useEffect} from "react";
import styled from "styled-components";
import {UploadOutlined} from "@ant-design/icons";
import type {UploadProps} from "antd";
import {commitApply} from "../api/apply";
import {useState} from "react";
import locale from "antd/lib/locale/zh_CN";
import moment from "moment";
import {getStatus} from '../api/status'
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
import {useNavigate} from "react-router-dom";
import {useAppSelector} from "../app/hooks";
import {selectUser} from "../features/user/userSlice";

const ApplyBox = styled.div`
  margin: 20px auto;
  text-align: center;
`;

const {TextArea} = Input;

export default function Apply() {


    // Hook
    const [isShowIdentityDetail, setIsShowIdentityDetail] = useState(false);
    const [initBirthDate, setInitBirthDate] = useState<string>("2000-01-01");
    const navigate = useNavigate()

    // 变量
    const user = useAppSelector(selectUser);
    let photoPath = "";
    let filePath = "";

    // 首次渲染 判断申请和确认系统是否开放
    useEffect(() => {
        getStatus().then((res: any) => {
            if (!res.data.data.apply) {
                message.error("申请系统暂未开启")
                navigate(-1)
            }
        })
    }, [navigate])

    // 控制 选择申请身份时 是否有身份备注
    const controllDetail = (value: string) => {
        if (value === "高中阶段获得省级以上荣誉" || value === "其他") {
            setIsShowIdentityDetail(true);
        } else {
            setIsShowIdentityDetail(false);
        }
    };

    // 填写身份证号后 显示出生日期
    const changeBirthDate = (value: any) => {
        if (value.target.value.length === 18) {
            setInitBirthDate("" +
                value.target.value[6] +
                value.target.value[7] +
                value.target.value[8] +
                value.target.value[9] + "-" +
                value.target.value[10] +
                value.target.value[11] + "-" +
                value.target.value[12] +
                value.target.value[13])
        }
    };

    // 上传一寸照片
    const uploadPhoto: UploadProps = {
        name: "file",
        action: "http://localhost:8080/api/upload/photo",
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

    // 上传文件档案
    const uploadFile: UploadProps = {
        name: "file",
        action: "http://localhost:8080/api/upload/file",
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

    // 表单完成
    const onFinish = (data: any) => {

        let applyData: any = {...data};

        applyData.uid = user.uid;
        applyData.birthDate = initBirthDate;
        applyData.photoPath = photoPath;
        applyData.filePath = filePath;

        commitApply(applyData)
            .then((res: any) => {
                const data = res.data;
                if (data.state === 200) {
                    message.success("提交成功");
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
        <ApplyBox>
            {/*将填写框视为Card*/}
            <Card
                title="天麟班申请"
                style={{backgroundColor: "white"}}
            >
                <Form
                    labelCol={{span: 5}}
                    wrapperCol={{span: 15}}
                    onFinish={onFinish}
                >
                    <Form.Item label="姓名" name="name" rules={[{required: true, message: "请输入您的姓名"}]}>
                        <Input/>
                    </Form.Item>

                    <Form.Item label="性别" name="gender" rules={[{ required: true, message: "请选择您的性别" }]}>
                        <Radio.Group style={{float:`left`}}>
                            <Radio value="1"> 男 </Radio>
                            <Radio value="2"> 女 </Radio>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item label="民族" name="nation" rules={[{ required: true, message: "请输入您的民族" }]}>
                        <Input/>
                    </Form.Item>

                    <Form.Item label="籍贯" name="nativePlace" rules={[{ required: true, message: "请输入您的籍贯" }]}>
                        <Input/>
                    </Form.Item>

                    <Form.Item label="身份证号码" name="idcard" rules={[{ required: true, message: "请输入您的身份证号码" }]}>
                        <Input onChange={changeBirthDate}/>
                    </Form.Item>

                    <Form.Item label="出生日期" name="birthDate">
                        <div style={{float:`left`}}>
                            <ConfigProvider locale={locale}>
                                <DatePicker
                                    defaultValue={moment(initBirthDate)}
                                    format="YYYY-MM-DD"
                                    value={moment(initBirthDate)}
                                />
                            </ConfigProvider>
                        </div>
                    </Form.Item>

                    <Form.Item label="手机号码" name="phone" rules={[{ required: true, message: "请输入您的手机号码" }]}>
                        <Input/>
                    </Form.Item>

                    <Form.Item label="QQ号码" name="qq" rules={[{ required: true, message: "请输入您的QQ" }]}>
                        <Input/>
                    </Form.Item>

                    <Form.Item label="电子邮箱" name="email" rules={[{ required: true, message: "请输入您的邮箱" }]}>
                        <Input/>
                    </Form.Item>

                    <Form.Item label="生源地" name="fromPlace" rules={[{ required: true, message: "请输入您的生源地" }]}>
                        <Input/>
                    </Form.Item>

                    <Form.Item label="毕业高中" name="highSchool" rules={[{ required: true, message: "请输入您的毕业高中" }]}>
                        <Input/>
                    </Form.Item>

                    <Form.Item label="户口所在地" name="household" rules={[{ required: true, message: "请输入您的户口所在地" }]}>
                        <Input/>
                    </Form.Item>

                    <Form.Item label="高考成绩" name="score" rules={[{ required: true, message: "请输入您的高考成绩" }]}>
                        <Input/>
                    </Form.Item>

                    <Form.Item label="申报身份" name="identity" rules={[{ required: true, message: "请选择您的身份" }]}>
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
                            <Input/>
                        </Form.Item>
                    )}

                    <Form.Item label="是否有入党意愿" name="partyWill" rules={[{ required: true, message: "请选择是否有入党意愿" }]}>
                        <Radio.Group style={{float:`left`}}>
                            <Radio value="1"> 是 </Radio>
                            <Radio value="2"> 否 </Radio>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item label="录取大类" name="major" rules={[{ required: true, message: "请输入您的录取大类" }]}>
                        <Input/>
                    </Form.Item>

                    <Form.Item label="T恤尺寸" name="clothesSize" rules={[{ required: true, message: "请输入您的T恤尺寸" }]}>
                        <Radio.Group style={{display:`flex`, flexWrap:`wrap`}} >
                            <Radio value="M(165)">   M(165) </Radio>
                            <Radio value="L(170)">   L(170) </Radio>
                            <Radio value="XL(175)">  XL(175) </Radio>
                            <Radio value="2XL(180)"> 2XL(180) </Radio>
                            <Radio value="3XL(185)"> 3XL(185) </Radio>
                            <Radio value="4XL(190)"> 4XL(190) </Radio>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item
                        label="高中阶段任职/竞赛/活动经历(限80字)"
                        name="highSchoolExp"
                        rules={[{ required: true, message: "请输入您的高中经历" }]}
                    >
                        <TextArea rows={4}/>
                    </Form.Item>

                    <Form.Item label="高中阶段所获荣誉(限80字):" name="highSchoolHonour" rules={[{ required: true, message: "请输入您高中所获荣誉" }]}>
                        <TextArea rows={4}/>
                    </Form.Item>

                    <Form.Item label="兴趣爱好(限80字)" name="hobby" rules={[{ required: true, message: "请输入您的兴趣爱好" }]}>
                        <TextArea rows={4}/>
                    </Form.Item>

                    <Form.Item label="个人评价(限80字)" name="introduction" rules={[{ required: true, message: "请输入您的个人评价" }]}>
                        <TextArea rows={4}/>
                    </Form.Item>

                    <Form.Item wrapperCol={{offset: 0, span: 16}} label="上传一寸免冠照片" name="photo" rules={[{ required: true, message: "请上传您的一寸免冠照片" }]}>
                        <div style={{float:`left`}} > 
                                <Upload {...uploadPhoto}>
                                    <Button icon={<UploadOutlined/>}> 上传照片 </Button>
                                </Upload>
                        </div>
                    </Form.Item>

                    <Form.Item wrapperCol={{offset: 0, span: 16}} label="请上传您的压缩文件" name="zip"  rules={[{ required: true, message: "请上传您的压缩文件" }]}>
                        <div style={{float:`left`}} > 
                            <Upload {...uploadFile}>
                                <Button icon={<UploadOutlined/>}>
                                    上传文件(rar/zip)
                                </Button>
                            </Upload>
                        </div>
                    </Form.Item>

                    <Form.Item wrapperCol={{offset: 4, span: 16}}>
                        <Button type="primary" htmlType="submit">
                            提交申请
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </ApplyBox>
    );
}
