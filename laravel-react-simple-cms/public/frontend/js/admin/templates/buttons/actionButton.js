import React from 'react'

export default function ActionButton({ type = "primary", fontAwesomeIcon = "fa-plus", value = "", onButtonClick = null }) {
    return (
        <a className={"btn btn-sm btn-link btn-".concat(type)}
            href="#"
            data-uid={value}
            onClick={onButtonClick}>
            <i className={"fa fa-icon ".concat(fontAwesomeIcon)}></i>
        </a>
    )
}
