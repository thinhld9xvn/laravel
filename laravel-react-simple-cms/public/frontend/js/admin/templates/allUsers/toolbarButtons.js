import React from 'react'
import {default as ToolbarUsersButtonsTemplate} from 'templates/toolbarUsersButtons'
export default function ToolbarButtons({ tabId = 'active', 
                                        s,
                                        toolbarData, 
                                        searchFieldClassName = "searchUserNameKey",
                                        searchFieldPlaceholder = "Tên người dùng cần tìm ..." }) {
    return (
        <ToolbarUsersButtonsTemplate tabId = {tabId}
                                    s = {s}
                                    toolbarData = {toolbarData}
                                    searchFieldClassName = {searchFieldClassName}
                                    searchFieldPlaceholder = {searchFieldPlaceholder} />
    )        
}
