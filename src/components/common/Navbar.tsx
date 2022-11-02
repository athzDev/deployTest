import styled from "styled-components";
// import Intl from "src/components/common/Intl";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader as DashboardHeader,
  SidebarContent,
} from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import data from "../../sd/menu.json";
import logo from "../../images/png/onflap-logo-black.png"
import smallLogo from "../../images/png/onflap-logo-black-small.png"
import NavbarIcons from "../Icon/NavbarIcons";
import { useState, useEffect } from "react";
import { FiArrowLeftCircle, FiArrowRightCircle } from "react-icons/fi";
import { theme } from 'styled-tools';

const findMenuIndex = (path) => {
  const route = path.split('/')[2];
  const id = (data.find(elm => elm.url === route) || {}).id;
  return Number(id) || 0;
}

const MenuHeading = ({ icon, title }) => {
  return (
    <>
      <NavbarIcons iconName={icon} />
      <span className="iconTitle">
        {title}
      </span>
    </>
  )
}

const Navbar = () => {
  const [openIndx, setOpenIndx] = useState(0);
  const { pathname } = useLocation();
  const navigate = useNavigate(); 
 //create initial menuCollapse state using useState hook
 const [menuCollapse, setMenuCollapse] = useState(false)

  useEffect(() => {
    const indx = findMenuIndex(pathname);
    setOpenIndx(indx)
  }, [pathname]);

  const customClass = pathname === '/member/profile/bankaccountform' && 'active';


    //create a custom function that will change menucollapse state from false to true and true to false
  const menuIconClick = () => {
    //condition checking to change state from true to false and vice versa
    menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
  };

  return (
    <SidebarWrapper >
      <ProSidebar collapsed={menuCollapse} toggled={true}>

        <SidebarHeader>
        {menuCollapse ? (
            <img src={smallLogo} alt="logo" className="small-logo"/>
            ) : (
             <img src={logo} alt="logo" />
            )}
         
        </SidebarHeader>

        <div className="closemenu" onClick={menuIconClick}>
            {/* changing menu collapse icon on click */}
            {menuCollapse ? (
            <FiArrowRightCircle/>
            ) : (
            <FiArrowLeftCircle/>
            )}
        </div>
        
        <SidebarContent>
          <Menu iconShape="square">
            {data.map((obj, indx) => {
              if (obj.menus && obj.menus.length > 0) {
                return (
                  <SubMenu
                    key={obj.id}
                    icon={<MenuHeading icon={obj.icon} title={obj.title} />}
                    defaultOpen={indx === openIndx}
                    // open={indx === openIndx}
                    // onOpenChange={() => setOpenIndx(indx)}
                  >
                    {obj.menus.map((submenu, i) => {
                      return (
                        <MenuItem icon={<MenuHeading icon={submenu.icon} title="" />} key={`${obj.id}.${i}`}>
                          <NavLink className={submenu.url === 'bankdetails' && customClass} to={`${obj.url}/${submenu.url}`}>
                            {submenu.title}
                         </NavLink>
                        </MenuItem>
                      );
                    })}
                  </SubMenu>
                );
              }
              else {
                return <SubMenu
                  key={obj.id}
                  icon={<MenuHeading icon={obj.icon} title={obj.title} />}
                  open={indx === openIndx}
                  className='hideArrow'
                  onOpenChange={() => navigate(obj.url)}
                ></SubMenu>
              }
            })}
          </Menu>
        </SidebarContent>
      </ProSidebar>
    </SidebarWrapper>
  );
};

export default Navbar;

const SidebarHeader = styled(DashboardHeader)`
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: none !important;
  padding:10px;
  color: #fff;
  font-weight: 400;
  font-size: 16px;
  text-align: center;
  -webkit-animation: tracking-in-expand 0.7s cubic-bezier(0.215, 0.610, 0.355, 1.000) 1000ms both;
	animation: tracking-in-expand 0.7s cubic-bezier(0.215, 0.610, 0.355, 1.000) 1000ms both;

  @-webkit-keyframes tracking-in-expand {
  0% {
    letter-spacing: -0.5em;
    opacity: 0;
  }
  40% {
    opacity: 0.6;
  }
  100% {
    opacity: 1;
  }
}
@keyframes tracking-in-expand {
  0% {
    letter-spacing: -0.5em;
    opacity: 0;
  }
  40% {
    opacity: 0.6;
  }
  100% {
    opacity: 1;
  }
}

& img {
    width: 175px;
    height: 65px;
    object-fit: contain;
}
  .headerIcon {
    svg {
      width: 24px;
      height: 24px;
    }
  }

  .small-logo{
    width: 50px;
    height: 50px;
  }
  
`;

const SidebarWrapper = styled.div`
    width: auto;
    max-width: 25%;
    height: auto;
    min-height: 100vh;
    display: flex;
    align-items: flex-start;
    background: #fff;
    box-shadow: 0px 0px 50px rgba(204, 204, 204, 0.4);
    position: absolute;


    .pro-sub-menu.hideArrow { 
      .react-slidedown {
        display: none;
      }
    }

  .pro-sidebar {
    height: auto;
  }
   .closemenu {
    color: #000;
    position: absolute;
    right: 0;
    z-index: 9999;
    line-height: 20px;
    border-radius: 50%;
    font-weight: bold;
    font-size: 22px;
    top: 55px;
    cursor: pointer;
  }
   .pro-sidebar.collapsed {
    width: 85px;
    min-width: 75px;

    /* :hover {
      width: 300px;
      min-width: 300px;
    } */
  }

  .pro-sidebar-inner .pro-sidebar-layout .active {
    color: #240303 !important;
    font-size: 14px;
}
   .pro-sidebar-inner {
    background-color: white;
    box-shadow: 0.5px 0.866px 2px 0px rgba(0, 0, 0, 0.15);
  }
   .pro-sidebar-inner .pro-sidebar-layout {
    overflow-y: hidden;
  }
   .pro-sidebar-inner .pro-sidebar-layout .logotext p {
    font-size: 20px;
    padding: 0 20px;
    color: #000;
    font-weight: bold;
  }
   .pro-sidebar-inner .pro-sidebar-layout ul {
    padding: 0 5px;
  }
  /* .pro-sidebar.collapsed .pro-menu > ul > .pro-menu-item.pro-sub-menu {
    position: relative;
    /* background: white;
    box-shadow: 0.5px 0.866px 2px 0px rgba(0, 0, 0, 0.15); */
} */
   .pro-sidebar-inner .pro-sidebar-layout ul .pro-inner-item {
    color: #000;
    margin: 5px 0px 5px 0px;
    font-weight: bold;
  }
   .pro-sidebar-inner .pro-sidebar-layout ul .pro-inner-item .pro-icon-wrapper {
    /* background-color: #fbf4cd; */
    color: #000;
    border-radius: 3px;
  }
   .pro-sidebar-inner .pro-sidebar-layout ul .pro-inner-item .pro-icon-wrapper .pro-item-content {
    color: #000;
  }
   .pro-sidebar-inner .pro-sidebar-layout .active {
    color: #fff;
    /* background: transparent linear-gradient(180deg, #FE9C00 0%, #FB2501 100%) 0% 0% no-repeat padding-box;    */
    }
   .logo {
    padding: 20px;
  }

  .pro-sidebar > .pro-sidebar-inner > .pro-sidebar-layout .pro-sidebar-content {
    flex-grow: 1;
    min-height: 90vh;
    height: 91vh;
    overflow-x: auto;
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */

    /* Hide scrollbar for Chrome, Safari and Opera */
   ::-webkit-scrollbar {
      display: none;
    }
}

  .pro-sidebar.collapsed .pro-menu > ul > .pro-menu-item.pro-sub-menu > .pro-inner-list-item > .popper-inner {
    max-height: 100vh;
    overflow-y: auto;
    background-color: #FBFBFB;
    padding-left: 20px;
    border-radius: 4px;
    box-shadow: 0px 1px 16px #FFE7CC;
    border-radius: 0px 7px 7px 0px;
    display: none;
}
  
  @media only screen and (max-width: 720px) {
    html {
      overflow: hidden;
    }
  }

  .pro-sidebar .pro-menu a {
    text-decoration: none;
    color: #3C3C3C;
}

  .pro-sidebar .pro-menu .pro-menu-item.pro-sub-menu.hideArrow > .pro-inner-item > .pro-arrow-wrapper  {
      display: none;
    }

    .pro-sidebar .pro-menu .pro-menu-item.pro-sub-menu.open > .pro-inner-item {
        /* background: transparent linear-gradient(180deg, #FE9C00 0%, #FB2501 100%) 0% 0% no-repeat padding-box;        */
         -webkit-transition: none !important;
        -moz-transition: none !important;
        -o-transition: none !important;
        transition: none !important;
        color: #fff;
        font-weight: 700 !important;
        box-shadow: 0px 1px 16px #FFE7CC;
        background-color: white;
        border-right: 3px solid #F76F20;


        .pro-icon-wrapper {

          background: ${theme('palette.UdbSideBarIconBG')};
          border: 1px solid #FFFFFF;
          /* box-shadow: 0px 0px 50px rgba(99, 105, 173, 0.4); */
    
          path {
              fill: #F76F20;
          }
        }   
    }

    .pro-sidebar .pro-menu.square .pro-menu-item > .pro-inner-item > .pro-icon-wrapper svg {
          width: 22px;
          height: 22px;
          
         
      }

    .pro-sidebar .pro-menu .pro-menu-item.pro-sub-menu.open > .pro-inner-item > .pro-item-content {
        color: #FFFFFF;
        -webkit-transition: none !important;
        -moz-transition: none !important;
        -o-transition: none !important;
        transition: none !important;
    }

    .pro-sidebar .pro-menu .pro-menu-item > .pro-inner-item > .pro-item-content {
        /* color: #FFFFFF; */
        -webkit-transition: none !important;
        -moz-transition: none !important;
        -o-transition: none !important;
        transition: none !important;
        font-weight: 500 !important;

    :hover {
      font-weight: bold;
    }
  }
    
    .pro-sidebar .pro-menu > ul > .pro-sub-menu > .pro-inner-list-item > div > ul {
        padding-top: 0px;
        padding-bottom: 10px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        margin-left: 40px;
    }


    .pro-sidebar .pro-menu .pro-menu-item.pro-sub-menu > .pro-inner-item > .pro-arrow-wrapper .pro-arrow {
        border-color: #000;
    }

 
  .pro-sidebar
    .pro-menu
    > ul
    > .pro-sub-menu
    > .pro-inner-list-item
    > div
    > ul {
    padding-top: 0px;
    padding-bottom: 10px;
    -webkit-transition: none !important;
        -moz-transition: none !important;
        -o-transition: none !important;
        transition: none !important;
  }

  .pro-sidebar
    .pro-menu
    .pro-menu-item.pro-sub-menu.open
    > .pro-inner-item
    > .pro-arrow-wrapper
    .pro-arrow {
    border-color: #000;
  }

  .pro-sidebar .pro-menu .pro-menu-item > .pro-inner-item:hover {
    /* background: transparent linear-gradient(180deg, #FE9C00 0%, #FB2501 100%) 0% 0% no-repeat padding-box;   */
}

  .pro-sidebar .pro-menu .pro-menu-item.pro-sub-menu.open > .pro-inner-item {
    /* background: transparent linear-gradient(180deg, #FE9C00 0%, #FB2501 100%) 0% 0% no-repeat padding-box;   */
   }
  
  .pro-sidebar
    .pro-menu
    .pro-menu-item.pro-sub-menu.open
    > .pro-inner-item
    > .pro-item-content {
    color: #ffffff;
  }

  .pro-sidebar .pro-menu .pro-menu-item > .pro-inner-item > .pro-item-content {
    color: #ffffff;
  }
  .eDgotV .pro-sidebar .pro-menu .pro-menu-item.pro-sub-menu.open > .pro-inner-item > .pro-item-content {
    font-weight: 600;
  }

  .pro-sidebar .pro-menu .pro-menu-item > .pro-inner-item {
    padding: 10px 15px;
    border-bottom: 1px solid rgba(253, 253, 253, 0.37);
    font-weight: 500 !important;
  }

  .pro-sidebar .pro-menu .pro-menu-item:last-child > .pro-inner-item {
    border-bottom: none;
  }

  .pro-sidebar
    .pro-menu
    .pro-menu-item.pro-sub-menu
    .pro-inner-list-item
    .pro-inner-item {
    padding: 0;
    border: none;
    position: relative;
    margin-bottom: 15px;



    :hover {
      background: transparent;
      border-radius: 3px;
    }
  }

  .pro-sidebar .pro-menu > ul > .pro-sub-menu > .pro-inner-list-item {
    position: relative;
    background-color: transparent;
    padding-right: 20px;
    padding-left: 10px;
    padding-top: 15px;
   
  }

  .pro-sidebar > .pro-sidebar-inner > .pro-sidebar-layout .pro-sidebar-footer {
    border: none;
    margin-bottom: 2em;
  }

  .kGa-Dzq .pro-sidebar .pro-menu .pro-menu-item.pro-sub-menu.open > .pro-inner-item > .pro-arrow-wrapper .pro-arrow {
    border-color: #0000 !important;
    color: #000 !important;
}

  .pro-sidebar .pro-menu.square .pro-menu-item > .pro-inner-item > .pro-icon-wrapper {
    background: none !important;
    border: none !important;
    /* box-shadow: 0px 0px 50px rgba(16, 12, 70, 0.25); */
    border-radius: 5px;

    .iconTitle {
        position: absolute;
        white-space: nowrap;
        left: 80px;
        color: #3C3C3C;
        overflow: hidden;
        text-overflow: ellipsis;
        width: 100px;
        text-align: left;
    }

    svg {
      width: 22px;
      height: 22px;
    }
  }

  .pro-sidebar .pro-menu .pro-menu-item > .pro-inner-item:hover .pro-icon-wrapper .pro-icon {
    animation: none!important;
  }

  .pro-sidebar > .pro-sidebar-inner > .pro-sidebar-layout:hover {
    font-weight: normal;
  }
`;

export const SvgIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-right: 10px;

  svg {
    width: 17px;
    height: 17px;
  }

  img {
    width: 16px;
    height: 16px;
  }
`;