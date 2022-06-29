import React from "react";
import styled from "styled-components";
import { Layout } from "antd";
import footer from "../images/footer.png";

const { Footer } = Layout;

const FooterBox = styled.div`
  text-align: center;
  position: relative;
  //margin-bottom: -50px;
  //z-index: 1000;
  //background-color: red;
`;



const PBox = styled.div`
  color: white;
`;

export default function AppFooter() {
  return (
    <>
      <Footer style={{ padding: 0 }}>

        <FooterBox>
          {/*底部图片*/}
          <div style={{zIndex:"-99"}}>
            <img src={footer} style={{zIndex:"-99",width:"100%"}}/>
          </div>

          {/*两个文字*/}
          <div style={{zIndex:"99",marginTop:"-10%"}}>
            <a href="https://www.twt.edu.cn">
              天外天工作室
            </a>
            <PBox>© 2000-2019/津ICP备05004358号-12/津教备0767号</PBox>
          </div>

        </FooterBox>
      </Footer>






    </>
  );
}
