import React from 'react'
import styled from 'styled-components'
import moment from 'moment'

//image imports
import clockIcon from "../../images/png/clock-icon.png"
import calendarIcon from "../../images/png/calendar-icon.png"
import bellIcon from "../../images/png/notification-icon.png"
import earthIcon from "../../images/png/earth-icon.png"
import profileIcon from "../../images/png/profile-icon.png"
import searchIcon from "../../images/png/search-icon.png"
import LogoutIcon from '@mui/icons-material/Logout';
import { SearchInputWrap } from '../udb/commonStyle'
import cookieUtil from 'src/util/cookieUtil'
import { ECookieName } from 'src/util/utilModel'
import { useNavigate } from 'react-router-dom'



type Props = {}

const Header = (props: Props) => {
    const navigate = useNavigate()

    //logout function
     const logout = () => {
        cookieUtil.remove(ECookieName.COOKIE_TOKEN);
        navigate("/login")
    };
    const [date, setDate] = React.useState(new Date());

     //Replaces componentDidMount and componentWillUnmount
        React.useEffect(() => {
            var timerID = setInterval( () => tick(), 1000 );
            return function cleanup() {
                clearInterval(timerID);
            };
        });
  
     function tick() {
      setDate(new Date());
     }

    var currDate = moment();

    var currentDate = currDate.format('ll'); 

  return (
    <HeaderMainWrap>
        <HeaderLeft>
            <SearchInputWrap>
                <img src={searchIcon} alt="icon" />
                <input type="text" placeholder='Search here'/>
            </SearchInputWrap>
            <select name="" id="">
                <option value="">Track your order</option>
                <option value="">1</option>
            </select>
        </HeaderLeft>
        <HeaderMiddle>
            <img src={clockIcon} alt="icon" />
            <img src={calendarIcon} alt="icon" />
            <img src={bellIcon} alt="icon" />
            <img src={earthIcon} alt="icon" />
            <img src={profileIcon} alt="icon" />
        </HeaderMiddle>
        <HeaderRight>
             <HeaderClockWrap>
                <p>{currentDate}</p>
                <h6>{date.toLocaleTimeString()}</h6>
             </HeaderClockWrap>
        </HeaderRight>
        <LogOutSec><LogoutIcon onClick={logout} /></LogOutSec>
    </HeaderMainWrap>
  )
}

export default Header

const HeaderMainWrap = styled.div`
    display: flex;
    width: 83%;
    padding: 10px;
    align-items: center;
    justify-content: flex-end;
    margin: auto;

`
const HeaderLeft = styled.div`
    width: 50%;
    display: flex;

   
    & select {
        width: 48%;
        border: 2px solid #EBEBEB;
        border-radius: 9px;
        opacity: 1;
        color: #666363;
        padding: 10px;
        height: 40px;
        font-family: "Inter";
    }
`

const HeaderMiddle = styled.div`
    width: 25%;
    display: flex;
    gap: 20px;
    margin-left: 20px;
    align-items: center;

    & img {
        width: 25px;
        height: 25px;
        cursor: pointer;
    }
`
const HeaderRight = styled.div`
    width: 15%;
    box-shadow: 0px 3px 6px #00000029;
    background: linear-gradient(180deg, #ffffff7f 0%, #f8f2f2 100%) 0% 0% no-repeat padding-box;
    border: 3px solid #FFFFFF;
    border-radius: 8px;
    opacity: 1;
    padding: 7px;
    display: flex;
    flex-direction: column;
    align-items: center;

    & p {
        font-size: 13px;
        color: #FE9A00;
        font-weight: 400;
        text-align: center;
        margin-bottom: 5px;
    }
    & h6 {
        font-size: 15px;
        color: #FF5903;
        font-weight: bold;
        letter-spacing: 3px;
    }
`

const HeaderClockWrap = styled.div`
    
`
const LogOutSec = styled.div`
    margin-left: 15px;
    cursor: pointer;
`