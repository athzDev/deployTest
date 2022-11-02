import styled  from 'styled-components';

export const PosBtn = styled.button`
    background: transparent linear-gradient(180deg, #FE9C00 0%, #FB2501 100%) 0% 0% no-repeat padding-box;
    border-radius: 7px;
    opacity: 1;
    padding: 10px;
    font-size: 12px;
    color: white;
    outline: none;
    border: none;
    cursor: pointer;
    min-width: 100px;
    width: auto;
    height: auto;
    font-family: "Inter";
`
export const PosBlackBtn = styled.button`
    background: #3C3C3C;
    border-radius: 7px;
    opacity: 1;
    padding: 10px;
    font-size: 12px;
    color: white;
    outline: none;
    border: none;
    cursor: pointer;
    min-width: 100px;
    width: auto;
    height: auto;
    font-family: "Inter";

    & > a {
       text-decoration: none;
       color: white;
    }
`
export const PosTransparentBtn = styled.button`
    background: transparent;
    border-radius: 7px;
    opacity: 1;
    padding: 10px;
    font-size: 12px;
    color: black;
    outline: none;
    border: none;
    cursor: pointer;
    width: auto;
    height: auto;
    font-family: "Inter";
`

export const Breadcrumbs = styled.div`
  font-size: 12px;
  color: #8b9bca;
  margin: 10px 0;
  a {
    color: #8b9bca;
    font-size: 12px;
    text-decoration: none;
  }
  a:hover {
    text-decoration: underline;
  }
  span {
    color: #fff;
  }
`;

export const Tittle = styled.div`
  color: #3C3C3C;
  font-size: 20px;
  font-weight: 700;
  letter-spacing: 0.03em;
  text-transform: capitalize;
`;

export const Header = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 10px;
  margin-bottom: 15px;
`;

export const FirstCol = styled.div``;

export const MainInfoWrapper = styled.div`
    width: 100%;
    height: auto;
`
export const SubBodyWrapper = styled.div`
    width: 100%;
    height: auto;
`
export const SubBodyHeader = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
`
export const SubBodyHeadLeft = styled.div`
    width: 60%;
    display: flex;
    gap: 7px;
`
export const SubBodyHeadRight = styled.div`
    width: 40%;
    display: flex;
    gap: 25px;
    justify-content: flex-end;
    align-items: center;

    & img {
        width: 25px;
        height: 25px;
        object-fit: contain;
        cursor: pointer;
    }
`
export const SearchInputWrap = styled.div`
    display: flex;
    align-items: center;
    width: 48%;
    border: 2px solid #EBEBEB;
    border-radius: 9px;
    opacity: 1;
    padding: 10px;
    margin-right: 10px;
    height: 20px;

    & input {
        border: none;
        outline: none;
        color: #666363;
        height: 40px;
        background-color: transparent;
        font-family: "Inter";
    }
    & img {
        width: 20px;
        height: 20px;
        margin-right: 5px;
    }
`
export const ErrorWrap = styled.div`
& p {
  font-size: 15px;
  text-align: center;
  color: white;
  font-weight: 500;
  background-color: #c91414;
  padding: 5px;
  border-radius: 30px;
}
`;

export const SubBodyMain = styled.div`
    width: 100%;
    height: auto;
    margin:20px 0px 10px 0px;
`
export const TableContainer = styled.table`
    width: 100%;
    height: auto;
`
export const TableContainerWrapper = styled.div`
    width: 100%;
    height: auto;
    background: transparent linear-gradient(180deg, #fb260126 0%, #fb26011d 100%) 0% 0% no-repeat padding-box;
    box-shadow: 0px 4px 6px #FB000054;
    border: 2px solid #FB260145;
    border-radius: 7px;
    font-family: 'Inter';
`
export const ActionsWrap = styled.td`
    display: flex;
    justify-content: space-between;
    align-items: center;

    & svg {
        width:20px;
        height: 20px;
        cursor: pointer;
    }
`
export const TableContainerHead = styled.thead`
      & th {
        padding: 10px 5px;
        border-bottom: 0.5px solid #fb000023;
        font-size: 15px;
        font-weight: 600;
        color: #000000;
        text-align: left;
        font-family: 'Inter';
      }
`
export const TableContainerBody = styled.tbody`

      & td {
        padding: 10px;
        font-size: 13px;
        font-weight: 500;
        color: #3C3C3C;
        font-family: 'Inter';
      }
`
export const TableContainerFooter = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 97%;
    margin: auto;
    border-top: 0.5px solid #fb000023;
    padding: 10px;
    
    & p {
        font-size: 13px;
        font-weight: 600;
        font-family: 'Inter';
    }
`
export const SvgIcon = styled.div`
   & svg {
        width: 20px;
        height: 20px;
   }
`
//MasterFormStyles

export const MasterFormWrapper = styled.div`
    display: flex;
    width: 100%;
    
`
export const MasterFormLeftSec = styled.div`
    width: 20%;
   
    & > div {
        border: 2px solid #ffffff;
        border-radius: 7px;
        background: transparent linear-gradient(180deg, #ffdcdc 100%, #fb00002c 0%) 0% 0% no-repeat padding-box;    
        box-shadow: 0px 4px 6px #FB000054;
    }
`
export const MasterFormRightSec = styled.div`
    width: 78%;
    margin-left: 2%;
`
export const MasterFormRightTop = styled.div`
    display: flex;
    width: 100%;
    gap: 10px;
`
export const MasterFormSec = styled.div`
    
`
export const MasterFormSecWrapper = styled.div`
    background: transparent linear-gradient(180deg, #ffffff3e 0%, #ffffff4b 100%) 0% 0% no-repeat padding-box;
    box-shadow: 0px 3px 6px #03030338;
    border-radius: 10px;
    width: 100%;
    height: auto;
    margin: 10px 0px;
    padding: 10px 0px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`
export const MasterFormSecTop = styled.div`
    width: 95%;
    margin: 10px auto;
    padding: 0px 0px 5px 0px;
    border-bottom: 1px solid lightgray;
    display: flex;
    justify-content: space-between;
    align-items: center;

    & h5 {
        font-size: 17px;
        color: #F76F20;
        font-weight: 600;
    }
`
export const MasterFormSecBody = styled.div`
    width: 97%;
    min-height: 50vh;
    height: auto;
    padding: 10px 10px 0px 10px;

    & form {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 100%;
        min-height: 50vh;
        height: auto;
    }
`
export const InputWrap = styled.div`
    display: flex;
    flex-direction: column;
    width: 30%;
    
   .react-datepicker{
     z-index: 9999;
   }

   &.error { 
        border:1px solid red;    
        background: #efdfdf;
    }

    & label {
        font-size: 15px;
        color: #000000;
        font-weight: 600;
    }

    & p {
        font-size: 12px;
        color: red;
        margin: 0px 0px 3px 0px;
    }

    & select {
        background: transparent linear-gradient(180deg, #FFFFFFDE 0%, #FFFFFF6B 100%) 0% 0% no-repeat padding-box;
        box-shadow: 0px 3px 6px #0000002E;
        border: 2px solid #FFFFFF;
        border-radius: 9px;
        letter-spacing: 0.01em;
        text-transform: capitalize;
        font-weight: 400;
        font-size: 14px;
        margin: 7px 0px;
        padding: 12px 10px;
        width: 100%;
      }

      & textarea {
        width: 100%;
        height: 100px;
        margin: 5px 0px;
        border: 2px solid var(--unnamed-color-ffffff);
        background: transparent linear-gradient(180deg, #FFFFFFDE 0%, #FFFFFF6B 100%) 0% 0% no-repeat padding-box;
        box-shadow: 0px 3px 6px #0000002E;
        border: 2px solid #FFFFFF;
        border-radius: 9px;
        padding: 10px;

        ::placeholder{
            font-family: 'Inter' !important;
        }
    }

   & input {
            border:none;
            width:90%;
            z-index: 1;
            display: flex;
            align-items: center;
            padding: 14px 10px;
            margin: 7px 0px;
            letter-spacing: 0.01em;
            font-weight: 400;
            font-size: 14px;
            color: #5b4b97;
            position: relative;
            background: transparent linear-gradient(180deg, #FFFFFFDE 0%, #FFFFFF6B 100%) 0% 0% no-repeat padding-box;
            box-shadow: 0px 3px 6px #0000002E;
            border-radius: 9px;
            outline: none;
            border: none;

            :focus-visible {
                outline: none;
                border: none;
            }
        }

      

                input[type=number]::-webkit-inner-spin-button, 
                input[type=number]::-webkit-outer-spin-button { 
                    -webkit-appearance: none;
                    -moz-appearance: none;
                    appearance: none;
                    margin: 0; 

                    /* Chrome, Safari, Edge, Opera */
                input::-webkit-outer-spin-button,
                input::-webkit-inner-spin-button {
                    -webkit-appearance: none;
                    margin: 0;
                    }

                    /* Firefox */
                    input[type=number] {
                    -moz-appearance: textfield;
                }
              }
`

export const MasterFormSecButtonsWrap = styled.div`
    width: 97%;
    display: flex;
    justify-content: space-between;
    margin: 20px auto 5px auto;

`
export const MasterFormSecButtonsLeft = styled.div`
    display: flex;
    gap: 10px;
`
export const MasterFormSecButtonsRight = styled.div`
    display: flex;
    gap: 10px; 

    ${PosBtn}{
        width: 150px;
    }
`
export const CheckboxWrap = styled.div`
    display: flex;
    
    input[type="checkbox"] {
        background-color: transparent !important;
        border: 1px solid #FE9C00 !important;
        margin: 0;
        font: inherit;
        color: #FE9C00;
        width: 1.15em;
        height: 1.15em;
        border-radius: 0.15em;
        transform: translateY(-0.075em);
    }

    input[type="checkbox"]:checked {
         transform: scale(1);
         background-color: transparent !important;
         border: 1px solid #FE9C00 !important;
         color: #FE9C00;
    }
`
export const FormFieldWrapper = styled.div`
    
`