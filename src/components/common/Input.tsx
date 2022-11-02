import React from 'react'
import styled from 'styled-components';


type InputProps = {
    onChange: (e: any) => void,
    value: string,
    placeholder?: any,
    type: string,
    id: string,
    error: { message?: string },
    name?: string,
    req: boolean,
    onBlur?: () => void;
    onKeyDown?: (e: any) => void;
    onWheel?: (e: any) => void;
    onKeyPress?: (e: any) => void;
    readonly?: boolean;
    onPaste?: (e: any) => void;
    onCopy?: (e: any) => void;
  }

const Input = ({onChange, onBlur, value, placeholder, type, id, error, onKeyDown, onWheel, onKeyPress, readonly, onPaste, onCopy, ...props }: InputProps) => {
  return (
          <>
            <Label>
              <PlaceHolder className={!value ? '' : 'dispN'}>
                {placeholder}{props.req && <span>*</span>}
              </PlaceHolder>
              <input value={value} type={type ? type : 'text'} onChange={onChange} onBlur={onBlur} id={id} onKeyDown={onKeyDown} readOnly={readonly} onWheel={onWheel} onKeyPress={onKeyPress} onPaste={onPaste} onCopy={onCopy} {...props} />
            </Label>
          </>
 )
 }

export default Input

export const LabelStyle = styled.label`
  display: flex;
  align-items: center;
  padding: 12px 10px;
  margin: 7px 0px;
  letter-spacing: 0.01em;
  font-weight: 400;
  font-size: 14px;
  color: #7568a6;
  position: relative;
  background: transparent linear-gradient(180deg, #FFFFFFDE 0%, #FFFFFF6B 100%) 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 6px #0000002E;
  border: 2px solid #FFFFFF;
  border-radius: 9px;
 
 :focus {
    outline: 1px solid #000000;
    border: 1px solid #000000;
 }
`;

export const Label = styled(LabelStyle)`
  input[type=password] {
     position: relative !important;
  }

   select {
        border:none;
        width:100%;
        z-index: 1;
        background: transparent;
      }
      input {
        border:none;
        width:94%;
        z-index: 1;
        background: transparent;

        :focus-visible {
            outline: none;
            border: none;
        }
      }
      .dispN {
        display:none
      }

      .disabled {
        opacity: 0.7;
        background: #c5c5c7;

         input {
            cursor: not-allowed;
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
`;

const PlaceHolder = styled.span`
  position: absolute;
  font-size: .8rem;
  font-weight: 500;
  z-index: 1;
  text-transform: capitalize;

  span {
    color:red;
    padding-left:2px;
  } 
`;