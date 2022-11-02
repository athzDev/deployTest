import React from 'react'
import styled from "styled-components"

type Props = {}

const OrderHistoryCard = (props: Props) => {
  return (
    <OrderHistoryCardWrap>
        <OrderHistoryCardLeft>
          <h5>TJ/SO/220400001</h5>
          <p>Walking Customer</p>
          <p>20/03/2022</p>
        </OrderHistoryCardLeft>
        <OrderHistoryCardRight>
          <OrderHistoryStatusBtn>Ordered</OrderHistoryStatusBtn>
          <p>2 : 22 PM</p>
          <h5>KWD 4.90</h5>
        </OrderHistoryCardRight>
    </OrderHistoryCardWrap>
  )
}

export default OrderHistoryCard

const OrderHistoryCardWrap = styled.div`
    display: flex;
    justify-content: space-between;
    background: var(--unnamed-color-ffffff) 0% 0% no-repeat padding-box;
    border: 4px solid var(--unnamed-color-ffffff);
    background: #FFFFFF 0% 0% no-repeat padding-box;
    border: 4px solid #FFFFFF;
    border-radius: 7px;
    padding: 1rem;
    font-family: "Inter";
    margin: 10px 0px;
`
const OrderHistoryCardLeft = styled.div`
    width: 70%;

    & h5 {
        font-size: 16px;
        color: #3C3C3C;
        font-weight: 700;
        margin: 0px 0px;
    }
    & p {
        font-size: 13px;
        color: #3C3C3C;
        font-weight: 400;
        margin: 0px 0px;
    }
`
const OrderHistoryCardRight = styled.div`
    width: 30%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;

    & h5 {
        font-size: 15px;
        color: #3C3C3C;
        font-weight: 700;
        margin: 0px 0px;
    }
    & p {
        font-size: 13px;
        color: #3C3C3C;
        font-weight: 400;
        margin: 0px 0px;
    }
`
const OrderHistoryStatusBtn = styled.button`
    background: #FFB84D 0% 0% no-repeat padding-box;
    border-radius: 4px;
    width: auto;
    height: 20px;
    border: none;
    outline: none;
    color: #fff;
    margin-bottom: 3px;
`