import { useState, createContext } from 'react'
import cookieUtil from 'src/util/cookieUtil'
import { ECookieName } from 'src/util/utilModel'

export const GlobalApiContext: any = createContext({})

export default function GlobalApiContextProvider(props) {
    const [isAuth, setIsAuth] = useState(cookieUtil.get(ECookieName.COOKIE_TOKEN) ? true : false)
    const [userDetails, setUserInfo] = useState((cookieUtil.get(ECookieName.COOKIE_USERINFO)) || {})
    const [isIframe, setIsIframe] = useState({})
    const [username, setUsername] = useState(cookieUtil.get(ECookieName.COOKIE_USERNAME) || {})
   
    const handleLogin = () => {
        setIsAuth(true)
    }

    const handleLogout = () => {
        setIsAuth(false)
    }

    const handleUserInfo = (data) => {
        let memberId = data.memberId
        setUserInfo({memberId})
    }

    const handleuserName = (data) => {
        setUsername(data)
    }
    function openIframe(){
		setIsIframe(!isIframe);
  }
    const values = { isAuth, handleLogin, handleLogout, handleUserInfo, userDetails, isIframe, openIframe, username,handleuserName }
    return (
        <GlobalApiContext.Provider value={values}>
            {
                props.children
            }
        </GlobalApiContext.Provider>
    )
}
