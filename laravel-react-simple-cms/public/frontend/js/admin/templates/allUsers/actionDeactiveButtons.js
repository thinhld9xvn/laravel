import React from 'react'
import ActionButton from '../buttons/actionButton'
export default function ActionDeactiveButtons({ row, actionData }) {
    return (
        <div className="actionButtons">
            <ActionButton type = "danger"
                          value = {row.guid || row.id}
                          fontAwesomeIcon = "fa-recycle"
                          onButtonClick = {actionData.onClick_restoreDeactiveUser} />
        </div>
    )
}
