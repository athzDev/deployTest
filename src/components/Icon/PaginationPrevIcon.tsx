import React from 'react'

type Props = {}

const PaginationPrevIcon = (props: Props) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="9.917" height="14" viewBox="0 0 9.917 14">
            <defs>
                <linearGradient id="linear-gradient" x1="0.5" x2="0.5" y2="1" gradientUnits="objectBoundingBox">
                    <stop offset="0" stop-color="#fe9c00" />
                    <stop offset="1" stop-color="#fb2501" />
                </linearGradient>
            </defs>
            <path id="Icon_material-skip-next" data-name="Icon material-skip-next" d="M23,23l-9.917-7L23,9Z" transform="translate(-13.083 -9)" fill="url(#linear-gradient)" />
        </svg>
    )
}

export default PaginationPrevIcon