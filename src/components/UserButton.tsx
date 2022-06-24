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
        <Button style={{ margin:"20px" }} >
          <Link to={"/apply"}>学生报名系统</Link>
        </Button>
      </UserButtonBox>

      <UserButtonBox>
        <Button style={{ marginTop:"10px" }}>
          <Link to={"/confirm"}>录取报道系统</Link>
        </Button>
      </UserButtonBox>
    </div>
  );
}
