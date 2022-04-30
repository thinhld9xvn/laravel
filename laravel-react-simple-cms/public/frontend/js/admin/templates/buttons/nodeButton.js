import React from 'react'

export default function NodeButton({ type = "primary", 
                                    size = "default", 
                                    className = "", 
                                    fontAwesomeIcon = "fa-plus", 
                                    label = "", 
                                    onButtonClick = null }) {
    return (
        <a className={`btn ${size === 'default' ? '' : 'btn-'.concat(size)} btn-${type} ${className}`}
            href="#"
            onClick={onButtonClick}>
            <span className={"fa fa-icon ".concat(fontAwesomeIcon)}>                                                       
            </span>
            <span className="padLeft10">
                {label}
            </span>
        </a>
    )
}
