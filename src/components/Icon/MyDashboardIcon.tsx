import React from 'react'

type Props = {}

const MyDashboardIcon = (props: Props) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="27.458" height="27.458" viewBox="0 0 27.458 27.458">
    <defs>
      <linearGradient id="linear-gradient" x1="0.5" x2="0.5" y2="1" gradientUnits="objectBoundingBox">
        <stop offset="0" stop-color="#fe9c00"/>
        <stop offset="1" stop-color="#fb2501"/>
      </linearGradient>
    </defs>
    <path id="Icon_material-dashboard" data-name="Icon material-dashboard" d="M4.5,19.755H16.7V4.5H4.5Zm0,12.2H16.7V22.805H4.5Zm15.255,0h12.2V16.7h-12.2Zm0-27.458v9.153h12.2V4.5Z" transform="translate(-4.5 -4.5)" fill="url(#linear-gradient)"/>
  </svg>  )
}

export default MyDashboardIcon