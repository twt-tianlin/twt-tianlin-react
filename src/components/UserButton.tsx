import React from "react";
import {Link, useNavigate} from "react-router-dom";
import {Button, message} from "antd";
import styled from "styled-components";
import {getUserAdmit} from "../api/apply";
import {useAppSelector} from "../app/hooks";
import {selectUser} from "../features/user/userSlice";
import {getStatus} from "../api/status";


const UserButtonBox = styled.div`
  display: flex;
  justify-content: center;
`;



export default function UserButton() {
    const navigate = useNavigate();
    const user = useAppSelector(selectUser);

    const ableToConfirm = () => {
        getStatus().then((res: any) => {
            if (!res.data.data.confirm) {
                message.error("录取报道系统暂未开启")
            }else{
                getUserAdmit(user.uid).then((res: any) => {
                    if (res.data.data === "未录取") {
                        message.error("您还未被录取 请等待通知")
                    }else{
                        navigate('/confirm')
                    }
                })
            }
        })
    }

    return (
        <div>
            <UserButtonBox>
                <Button style={{margin: "0 0 10px 0", backgroundColor: "#f5f8fa"}} shape={"round"}
                        size={"large"}>
                    <Link to={"/apply"} style={{color: "#005180"}}>学生报名系统</Link>
                </Button>
            </UserButtonBox>

            <UserButtonBox>
                <Button style={{margin: "10px", backgroundColor: "#f5f8fa"}} shape={"round"} size={"large"}
                        onClick={ableToConfirm}>
                    <div style={{color: "#005180"}}>录取报道系统</div>
                </Button>
            </UserButtonBox>
        </div>
    );
}
