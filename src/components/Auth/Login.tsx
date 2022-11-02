import React, { useState } from 'react'
import styled from 'styled-components'
import LoginBurger from "../../images/png/login-form-logo.png"
import { useForm } from 'react-hook-form';
import cookieUtil from 'src/util/cookieUtil';
import { ECookieName } from 'src/util/utilModel';
import { login } from 'src/config/api';
import { ErrorWrap } from '../udb/commonStyle';
import { useNavigate } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

type Props = {}

const Login = (props: Props) => {
  const navigate = useNavigate();
  const [networkMessage, setNetworkMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleSuccess = (token) => {
    cookieUtil.set(ECookieName.COOKIE_LANG, "en-us", 30);
    cookieUtil.set(ECookieName.COOKIE_TOKEN, token);
    navigate('/')
    window.location.reload();
  };

  const onSubmit = ({ userName, password }, event) => {
    event.preventDefault();
    event.stopPropagation();
    let userInfo = {
      userName,
      password,
    };
    login(userInfo)
      .then((response: any) => {
        let res = response.data;
        handleSuccess(res.usertoken);
      })
      .catch((error) => {
        let errormessage = error.response.data
        setNetworkMessage(errormessage.message)
      })
  };

  const [values, setValues] = useState({
    password: "",
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <LoginFormWrapper>
      <LoginFormTopWrap>
        <LoginFormTopLeft>
          <h4>Login here</h4>
          <p>Please Login to continue</p>
        </LoginFormTopLeft>
        <LoginFormTopRight>
          <img src={LoginBurger} alt="burger" />
        </LoginFormTopRight>
      </LoginFormTopWrap>
      <LoginForm onSubmit={handleSubmit(onSubmit)}>
        <input {...register('userName', { required: true })} type="text" placeholder="User Name" />
        {errors.userName && <p>User name is required</p>}
        <PasswordInputWrap>
          <input {...register('password', { required: true })} type={values.showPassword ? "text" : "password"} placeholder="Password" className='pwd' />
          <PasswordHide onClick={handleClickShowPassword}
            onMouseDown={handleMouseDownPassword}
          >{values.showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
          </PasswordHide>
        </PasswordInputWrap>
        {errors.password && <p>Please enter your password</p>}
        
        <button type="submit">Login</button>
      </LoginForm>
      <ErrorWrap>
        {networkMessage && networkMessage.length !== 0 && <p className="username-error1">{networkMessage}</p>}
      </ErrorWrap>
    </LoginFormWrapper>
  )
}

export default Login

const LoginFormWrapper = styled.div`
  border: 2px solid #fff;
  border-radius: 19px;
  opacity: 1;
  backdrop-filter: blur(47px);
  -webkit-backdrop-filter: blur(47px);
  width: auto;
  min-width: 350px;
  height: auto;
  background-color: #ffffff26;
  padding: 2rem;
`
const LoginFormTopWrap = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
`
const LoginFormTopLeft = styled.div`
   width: 50%;

   & h4 {
     font-size: 30px;
     font-weight: 700;
     color: white;
     font-family: 'Inter';
     margin: 3px 0px;
   }
   & p {
     font-size: 15px;
     font-weight: 400;
     color: white;
     font-family: 'Inter';
     margin: 3px 0px;
   }
`
const LoginFormTopRight = styled.div`
  width: 50%;
  display: flex;
  justify-content: flex-end;

  & img {
    width: 120px;
    height: 120px;
  }
`
const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 10px 0px;

  & input {
    background: var(--unnamed-color-ffffff) 0% 0% no-repeat padding-box;
    background: #ffffff00 0% 0% no-repeat padding-box;
    border-radius: 10px;
    opacity: 1;
    backdrop-filter: blur(30px);
    -webkit-backdrop-filter: blur(30px);
    width: 90%;
    height: auto;
    padding: 15px 10px;
    border: none;
    outline: none;
    margin: 5px 0px;
    color: white;
    font-size: 15px;
    font-weight: 400;


    ::placeholder {
      color: white !important;
      font-size: 15px;
      font-weight: 400;
      font-family: 'Inter';
    }
  }

  & button {
    background: #FFFFFF 0% 0% no-repeat padding-box;
    border: 1px solid #FFFFFF;
    border-radius: 10px;
    opacity: 1;
    outline: none;
    padding: 15px 10px;
    width: 95%;
    font-size: 15px;
    font-weight: 600;
    text-align: center;
    color: #3C3C3C;
    font-family: 'Inter';
    margin: 10px 0px;
    cursor: pointer;
  }

  & p {
    color: red;
    font-size: 12px;
    margin: 0px 0px;
  }

 
`
const PasswordInputWrap = styled.div`
     position: relative;

     & svg {
      position: absolute;
      right: 25px;
      top: 15px;
      cursor: pointer;
    }
  `
const PasswordHide = styled.div`
  display: block;
  width: 5px;
`