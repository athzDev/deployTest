import styled from "styled-components";
import Navbar from "../common/Navbar";
import Header from "../common/Header"
import { Outlet } from "react-router-dom";
import { theme } from "styled-tools";
import DashBg from "../../images/png/dashboard-bg.png"


export default function Dashboard() {

  return (
    <MainWrapper className="contxx">
        <Navbar />
        <SectionWrapper>
            <Header />
            <Container>
                <Outlet />
            </Container>
        </SectionWrapper>
    </MainWrapper>
  );
}

const MainWrapper = styled.div`
    width: 100%;
    min-height: 100vh;
    height: auto;
    display: flex;
    background: #fff;
    flex-direction:row;
    background-color: ${theme('palette.headerBgColor')};
    background-image: url(${DashBg});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
    position: relative;
`;

const Container = styled.div`
    width: 80%;
    margin: auto;
    flex: 1;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    background: transparent;
    border-radius: 10px;
    overflow-y: auto;
    padding: 1.5rem 0.5rem 1.5rem 0.5rem;
`;

const SectionWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;