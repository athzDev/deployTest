import React from 'react'
import Login from 'src/components/Auth/Login'
import styled from 'styled-components'
import logimnBG from "../../images/png/login-bg.png"
import logo from "../../images/png/onflap-logo.png"

type Props = {}

const LoginPage = (props: Props) => {
    return (
        <LoginMainWrapper>
            <Logo src={logo} alt="logo"/>
             <LoginWrapper>
                <Login />
             </LoginWrapper>
        </LoginMainWrapper>
    )
}

export default LoginPage;

//Styled Components

const LoginMainWrapper = styled.div`
    display: block;
    width: 100%;
    height: 100vh;
    background-image: url(${logimnBG});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
`
const Logo = styled.img`
   width: 200px;
   height: 100px;
   object-fit: contain;
`
const LoginWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 0px 20px 20px 0px;
`