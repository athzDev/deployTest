import React from 'react'
import styled from "styled-components"

type Props = {
    onClick?:(e: any) => void;
    tabTitle?: string;
    isActive?: boolean;
}

type StyleProps = {
    isActive?: boolean;
}

const MasterFormTab = (props: Props) => {
  return (
    <MasterFormTabWrap onClick={props.onClick}>
       <MasterFormTabButton isActive={props.isActive}>{props.tabTitle}</MasterFormTabButton>
    </MasterFormTabWrap>
  )
}

export default MasterFormTab

const MasterFormTabWrap = styled.div`
    width: auto;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    padding: 1rem 0.2rem 1rem 0.5rem;
`
const MasterFormTabButton = styled.div<Pick<StyleProps, "isActive">>`
    width: 100%;
    font-size: 13px;
    font-weight: ${(p) => (p.isActive ? "600" : "500")};
    color: ${(p) => (p.isActive ? "#F76F20" : "#626262")};
    border-right: ${(p) => (p.isActive ? "4px solid #F76F20" : "none")};
    text-align: center;
    cursor: pointer;
`