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
                    <Header style={{backgroundColor: "#f5f8fa",height:`90px`}}>

                        {/*logo图片*/}
                        <div style={{width:`70%`,marginLeft:`20%`,height:`90px`,display: `flex`,justifyContent: `space-between`}}>
                            <Link to={'/'}><img src={logo} alt=""/></Link>

                            <div style={{display: `flex`,justifyContent: `space-between`}}>
                                    <Link to="/login" style={{fontSize:`20px`,fontWeight:`bold`}}>登录</Link>
                                    <p style={{fontSize:`20px`}}>&nbsp;&nbsp;&nbsp;&nbsp;</p>
                                    <Link to="/register" style={{fontSize:`20px`,fontWeight:`bold`}}>注册</Link>
                            </div>
                            {/* <ButtonBox>
                               
                            </ButtonBox> */}
                        </div>
                        {/*登录和注册按钮*/}
                        

                    </Header>
                </HeaderBox>
            </>
        );

        // 已登录
    } else {
        return (
            <>
                <HeaderBox>
                    <Header style={{backgroundColor: "#f5f8fa",height:`90px`}}>

                        <div style={{width:`70%`,marginLeft:`20%`,height:`90px`,display: `flex`,justifyContent: `space-between`}}>
                            <Link to={'/'}><img src={logo} alt=""/></Link>
                            <div>
                            <Button style={{fontSize: "20px", marginRight: "5px"}} type={"text"}>{name}</Button>
                            <Button onClick={logoutButton} style={{fontSize:`20px`,fontWeight:`bold`}} className="exit"> 退出</Button>
                            </div>

                        </div>
                    </Header>
                </HeaderBox>
            </>
        );
    }
}
