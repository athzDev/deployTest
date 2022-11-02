import React from 'react'

type Props = {}

const ViewIcon = (props: Props) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="23.5" height="15.667" viewBox="0 0 23.5 15.667">
            <defs>
                <linearGradient id="linear-gradient" x1="0.5" x2="0.5" y2="1" gradientUnits="objectBoundingBox">
                    <stop offset="0" stop-color="#fe9c00" />
                    <stop offset="1" stop-color="#fb2501" />
                </linearGradient>
            </defs>
            <path id="Icon_awesome-eye" data-name="Icon awesome-eye" d="M23.358,11.738A13.086,13.086,0,0,0,11.75,4.5,13.088,13.088,0,0,0,.142,11.738a1.32,1.32,0,0,0,0,1.191A13.086,13.086,0,0,0,11.75,20.167a13.088,13.088,0,0,0,11.608-7.238A1.32,1.32,0,0,0,23.358,11.738ZM11.75,18.208a5.875,5.875,0,1,1,5.875-5.875A5.875,5.875,0,0,1,11.75,18.208Zm0-9.792a3.888,3.888,0,0,0-1.033.155A1.952,1.952,0,0,1,7.988,11.3,3.908,3.908,0,1,0,11.75,8.417Z" transform="translate(0 -4.5)" fill="url(#linear-gradient)" />
        </svg>
    )
}

export default ViewIcon