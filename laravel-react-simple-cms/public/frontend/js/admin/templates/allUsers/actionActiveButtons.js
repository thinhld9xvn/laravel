import React from 'react'
import ActionButton from '../buttons/actionButton'
export default function ActionActiveButtons({ row, actionData }) {
    return (
        <div className="actionButtons">
            <ActionButton type = "primary"
                          value = {row.guid || row.id}
                          fontAwesomeIcon = "fa-pencil"
                          onButtonClick = {actionData.onClick_editUser} />
            {actionData.username !== row.username && (
                <ActionButton type = "danger"
                            value = {row.guid || row.id}
                            fontAwesomeIcon = "fa-trash"
                            onButtonClick = {actionData.onClick_removeUser} />
            )}
        </div>
    )
}
