import React from "react";
import { Layout, message } from "antd";
import { Button } from "antd";
import logo from "../images/logo.png";
import styled from "styled-components";
import { Link } from "react-router-dom";
import {logout}  from "../api/user";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { selectUser } from "../features/user/userSlice";

const HeaderBox = styled.div`
  height: 600px
  background-color: white
`;

const ButtonBox = styled.div`
  float: right;
  margin: 20px 0 0 0;
`;

const { Header } = Layout;


export default function AppHeader() {
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);

  const logoutButton = ()=>{
    logout().then((res:any)=>{
      let data= res.data;
      if(data.state===200){
        message.success("退出成功")
        localStorage.setItem('token','')
        localStorage.setItem('name','')
        navigate('/')
      }else{
        message.error(data.msg)
      }
    }).catch(()=>{
        message.error('系统异常 请联系管理员')
    })
  }
  const name = user.name;
  const token = localStorage.getItem("token");
  if (name === ''|| token==='') {
    return (
      <div>
        <HeaderBox>
          <Header style={{ backgroundColor: "white" }}>
            <img src={logo} alt="" />

            <ButtonBox>
              <Button>
                <Link to="/login">登录</Link>
              </Button>
              <Button>
                <Link to="/register">注册</Link>
              </Button>
            </ButtonBox>
          </Header>
        </HeaderBox>
      </div>
    );
  } else {
    return (
      <div>
        <HeaderBox>
          <Header style={{ backgroundColor: "white" }}>
            <img src={logo} alt="" />

            <ButtonBox>
              <Button>
                {name}
              </Button>
              <Button onClick={logoutButton}>
                退出
              </Button>
            </ButtonBox>
          </Header>
        </HeaderBox>
      </div>
    );
  }
}
