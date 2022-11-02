import styled from "styled-components"

//image imports
import AddCustomerIcon from "../../../images/png/addcustomers-icon.png"
import TakeAwayIcon from "../../../images//png/takeaway-icon.png"

type Props = {
    optionImage?: string;
    optionTitle: string;
    optionCount?: any;
    imageId: any;
    onClick?:(e: any) => void;
}

type StyleProps = {
    optionType?: string
}

const HomeOption = (props: Props) => {

  return (
    <HomeOptionsWrap optionType={props.optionCount && "true"} onClick={props.onClick}>
        {props.optionCount ? 
           <p>{props.optionCount}</p>
           :
           <img src={props.imageId === "1" ? AddCustomerIcon : TakeAwayIcon} alt="option-icon" />
        }
         <h6>{props.optionTitle}</h6>
    </HomeOptionsWrap>
  )
}

export default HomeOption

const HomeOptionsWrap = styled.div<Pick<StyleProps, "optionType">>`
    background: transparent linear-gradient(180deg, #fb00002c 0%, #e6e1e137 100%) 0% 0% no-repeat padding-box;
    box-shadow: 0px 4px 6px #FB000054;
    border: 2px solid #F9F9F9;
    border-radius: 7px;
    min-width: ${(props) => (props.optionType ? "60px" : "130px")};
    width: ${(props) => (props.optionType ? "50px" : "130px")};
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: ${(props) => (props.optionType ? "20px" : "30px")};
    margin-right: 20px;
    cursor: ${(props) => (props.optionType ? "none" : "pointer")};
    margin-top: 10px;

    & img {
        width: 50px;
        height: 50px;
        object-fit: contain;
    }
    & h6 {
        font-size: 15px;
        font-size: ${(props) => (props.optionType ? "12px" : "15px")};
        font-weight: 600;
        color: #3C3C3C;
        text-align: center;
        margin-top: 10px;
    }
    & p {
        font-size: 25px;
        font-weight: 600;
        color: #FB2601;
        text-align: center;
        margin: 3px 0px;
    }
`