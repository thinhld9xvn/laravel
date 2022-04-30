import React from 'react'

export default function TBButton({ type = '', 
                                    className = '', 
                                    fontAwesomeIcon = '', 
                                    clearFilter = false,
                                    onButtonClick = null }) {
    return (
        <a className={`btn btn-${type} ${clearFilter ? '' : 'btn-link'} btn-sm ${className}`}
            href="#"
            onClick={onButtonClick}>
            <span className={`fa ${fontAwesomeIcon}`}></span>
        </a>
    )
}
