import React from "react";
import styled from "styled-components";
import { Layout } from "antd";
import footer from "../images/footer.png";

const { Footer } = Layout;

const FooterBox = styled.div`
  height: 150px;
  background-image: url(${footer});
  background-size: 100% 100%;
  text-align: center;
`;

const ABox = styled.div`
  height: 100px;
`;

const PBox = styled.div`
  color: white;
  margin:7px
`;

export default function AppFooter() {
  return (
    <>
      <Footer style={{ padding: 0 }}>
        <FooterBox>
          <br />
        <br />
        <br />
        <br />
          <ABox>
            <a href="https://www.twt.edu.cn">
              天外天工作室&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;
            </a>
            <br />

            <PBox>© 2000-2019/津ICP备05004358号-12/津教备0767号</PBox>
          </ABox>

        </FooterBox>
      </Footer>
    </>
  );
}
