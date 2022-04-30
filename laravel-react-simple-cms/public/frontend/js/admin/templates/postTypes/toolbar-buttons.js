import React from 'react'
import ToolbarPostTypesButtons from 'templates/toolbarPostTypesButtons';
export default function ToolbarButtons({ inst, 
                                        tabId = "active",
                                        s = '',
                                        toolbarData, 
                                        searchFieldClassName = "searchUserNameKey searchPostKey",
                                        searchFieldPlaceholder = "Tên mục bài viết cần tìm ..." }) {
    return (
        <>
            <ToolbarPostTypesButtons tabId = {tabId}
                                      s = {s}
                                      toolbarData = {toolbarData}
                                      searchFieldClassName = {searchFieldClassName}
                                      searchFieldPlaceholder = {searchFieldPlaceholder} />
        </>
    )
}
