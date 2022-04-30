import React from 'react'
import FilterHeadingBox from 'templates/postsList/filter-heading-box';
import ToolbarPostsListButtons from 'templates/toolbarPostsListButtons';
export default function ToolbarButtons({ inst, 
                                        tabId = "active",
                                        toolbarData, 
                                        searchFieldClassName = "searchUserNameKey searchPostKey",
                                        searchFieldPlaceholder = "Tên bài viết cần tìm ...",
                                        s = '' }) {
    return (
        <>
            <ToolbarPostsListButtons tabId = {tabId}
                                      toolbarData = {toolbarData}
                                      searchFieldClassName = {searchFieldClassName}
                                      searchFieldPlaceholder = {searchFieldPlaceholder}
                                      s = {s} />
            <FilterHeadingBox inst={inst} toolbarData={toolbarData} />
        </>
    )
}
