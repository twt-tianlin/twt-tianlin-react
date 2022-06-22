import React from "react";
import styled from "styled-components";
import { Layout } from "antd";
import footer from "../images/footer.png";

const { Footer } = Layout;

const FooterBox = styled.div`
  height: 250px;
  background-image: url(${footer});
  text-align: center;
`;

const ABox = styled.div`
  height: 300px;
  margin:74px
`;

const PBox = styled.div`
  color: white;
`;

export default function AppFooter() {
  return (
    <>
      <Footer style={{ padding: 0 }}>
        <FooterBox>
          <br />
          <br />
          <br />
          <ABox>
            <a href="https://www.twt.edu.cn">
              天外天工作室&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;
            </a>
            <br />
            <br />
            <PBox>© 2000-2019/津ICP备05004358号-12/津教备0767号</PBox>
          </ABox>

        </FooterBox>

        {/* <div style={{backgroundImage: `url(${footer})`, height: '300px'}}>
          <a href="https://coder.twt.edu.cn">天外天工作室</a>
          /© 2000-2019/津ICP备05004358号-12/津教备0767号
        </div> */}
      </Footer>
    </>
  );
}
