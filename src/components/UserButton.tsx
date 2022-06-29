import React from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";
import styled from "styled-components";

const UserButtonBox = styled.div`
  display: flex;
  justify-content: center;
`;

export default function UserButton() {
  return (
    <div>
      <UserButtonBox>
        <Button style={{ margin:"20px",backgroundColor:"#f5f8fa" }} shape={"round"} size={"large"}>
          <Link to={"/apply"} style={{color:"#005180"}}>学生报名系统</Link>
        </Button>
      </UserButtonBox>

      <UserButtonBox>
        <Button style={{ marginTop:"10px",backgroundColor:"#f5f8fa"}} shape={"round"} size={"large"}>
          <Link to={"/confirm"} style={{color:"#005180"}}>录取报道系统</Link>
        </Button>
      </UserButtonBox>
    </div>
  );
}
