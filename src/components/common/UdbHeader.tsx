import React from 'react'
import styled from 'styled-components';
import Intl from '../common/Intl';
import BackBtn from "../../images/png/back-btn.png"
import { useNavigate } from 'react-router-dom';
import { Tittle } from '../udb/commonStyle';
import Breadcrumb from './Breadcrumb';


interface HeaderProps {
  title: string,
  link?: string
}

const UDBHeader = ({ title, link }:HeaderProps) => {
  const navigate = useNavigate();
  const goBack = () => {
    if (link) {
      navigate(link)
    }
    else {
      navigate(-1)
    }
  }
  return (
    <>
      <HeaderTitle>
        <img src={BackBtn} alt="" onClick={goBack} />
        <Tittle><Intl langKey={title} /></Tittle>
      </HeaderTitle>
      {/* <Breadcrumb /> */}
    </>
  )
}

export default UDBHeader

const HeaderTitle = styled.div`
  display: flex;
  align-items: center;

  & img {
    width: 25px;
    height: 25px;
    object-fit: contain;
    margin-right: 10px;
    cursor: pointer;
    border-radius: 70px;
  }
`