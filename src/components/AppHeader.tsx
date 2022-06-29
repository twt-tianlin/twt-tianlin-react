import React from "react";
import {Layout, message} from "antd";
import {Button} from "antd";
import logo from "../images/logo.png";
import styled from "styled-components";
import {Link} from "react-router-dom";
import {logout} from "../api/user";
import {useNavigate} from "react-router-dom";
import {useAppSelector, useAppDispatch} from "../app/hooks";
import {selectUser, userLogout} from "../features/user/userSlice";


const HeaderBox = styled.div`
  background-color: #f5f8fa;
`;

const ButtonBox = styled.div`
  float: right;
`;

const {Header} = Layout;


export default function AppHeader() {
    // hook
    const navigate = useNavigate();
    const user = useAppSelector(selectUser);
    const dispatch = useAppDispatch();

    // state
    const name = user.name;
    const token = localStorage.getItem("token");

    // 退出  清除token  跳转到首页
    const logoutButton = () => {
        logout().then((res: any) => {
            let data = res.data;
            if (data.state === 200) {
                message.success("退出成功")
                localStorage.setItem('token', '')
                dispatch(userLogout())
                navigate('/')
            } else {
                message.error(data.msg)
            }
        }).catch(() => {
            message.error('系统异常 请联系管理员')
        })
    }

    // 未登录
    if (name === '' || token === '') {
        return (
            <>
                <HeaderBox >
                    <Header style={{backgroundColor: "#f5f8fa"}}>

                        {/*logo图片*/}
                        <Link to={'/'}><img src={logo} alt=""/></Link>
                        {/*登录和注册按钮*/}
                        <ButtonBox>
                            <Button >
                                <Link to="/login">登录</Link>
                            </Button>
                            <Button>
                                <Link to="/register">注册</Link>
                            </Button>
                        </ButtonBox>

                    </Header>
                </HeaderBox>
            </>
        );

        // 已登录
    } else {
        return (
            <>
                <HeaderBox>
                    <Header style={{backgroundColor: "white"}}>
                        <img src={logo} alt=""/>

                        <ButtonBox>
                            <Button style={{fontSize: "100%", marginRight: "5px"}} type={"text"}>{name}</Button>

                            <Button onClick={logoutButton}>
                                退出
                            </Button>
                        </ButtonBox>
                    </Header>
                </HeaderBox>
            </>
        );
    }
}
