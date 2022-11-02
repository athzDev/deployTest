import React from 'react'
import styled from "styled-components"
import CustomerSince from '../Icon/CustomerSince'
import PurchasesIcon from '../Icon/PurchasesIcon'
import AmountIcon from '../Icon/AmountIcon'
import PointsIcon from '../Icon/PointsIcon'
import { SvgIcon } from '../udb/commonStyle'

type Props = {
    boxTitle?: string;
    boxCount?: string;
    boxIcon?: string
}

const MasterMainBoxes = (props: Props) => {
    return (
        <MatermainBoxeWrap>
            <MasterMainBoxLeft>
                <SvgIcon>
                    {props.boxIcon === "CustomerSince" ? <CustomerSince /> :
                        props.boxIcon === "PurchasesIcon" ? <PurchasesIcon /> :
                            props.boxIcon === "AmountIcon" ? <AmountIcon /> : <PointsIcon />
                    }
                </SvgIcon>
                <h5>{props.boxTitle}</h5>
            </MasterMainBoxLeft>
            <MasterMainBoxRight>
                <h4>{props.boxCount}</h4>
            </MasterMainBoxRight>
        </MatermainBoxeWrap>
    )
}

export default MasterMainBoxes

const MatermainBoxeWrap = styled.div`
   width: 100%;
   height: auto;
   padding: 10px;
   background: transparent linear-gradient(180deg, #FE9C00 0%, #FB2501 100%) 0% 0% no-repeat padding-box;
   box-shadow: 0px 3px 15px #00000014;
   border-radius: 7px;
   color: #ffffff;
   display: flex;
   justify-content: space-between;
`
const MasterMainBoxLeft = styled.div`
   display: flex;
   flex-direction: column;
   width: 70;

   & h5 {
    font-size: 12px;
    color: #ffffff;
    font-weight: 600;
   }

`
const MasterMainBoxRight = styled.div`
    width: 30%;
`
