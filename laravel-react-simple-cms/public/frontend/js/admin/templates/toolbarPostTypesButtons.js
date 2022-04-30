import React from 'react'
import TBButton from './buttons/tbButton'
import Delimiter from './delimiter'
import TBTextField from './fields/tbTextField'
export default function ToolbarPostTypesButtons({ tabId, 
                                                    s,
                                                    toolbarData, 
                                                    searchFieldClassName,
                                                    searchFieldPlaceholder }) {
    return (
        <div className="toolbar">
            <div className="toolLeft">
                <TBButton type = 'primary' 
                          className = 'btnZoomIn'
                          fontAwesomeIcon = 'fa-search-plus'
                          onButtonClick = {toolbarData.onClick_zoomIn} />
                <TBButton type = 'primary' 
                          className = 'btnZoomIn'
                          fontAwesomeIcon = 'fa-search-minus'
                          onButtonClick = {toolbarData.onClick_zoomOut} />
                <TBButton type = 'primary' 
                          className = 'btnZoomReset'
                          fontAwesomeIcon = 'fa-arrows'
                          onButtonClick = {toolbarData.onClick_zoomReset} />
                <Delimiter />
                <TBButton type = 'primary' 
                          className = 'btnToggleFullScreen'
                          fontAwesomeIcon = 'fa-arrows-alt'
                          onButtonClick = {toolbarData.onClick_toggleTabFullScreen} />
                <Delimiter />                
                <TBButton type = 'primary' 
                          className = 'btnRefresh'
                          fontAwesomeIcon = 'fa-refresh'
                          onButtonClick = {toolbarData.onClick_refreshPostTypesListData} />
                {tabId === 'active' ? (
                    <>
                        <TBButton type = 'primary' 
                            className = 'btnNew'
                            fontAwesomeIcon = 'fa-plus'
                            onButtonClick = {toolbarData.onClick_showNewPostTypeModal} />
                        <TBButton type = 'primary' 
                            className = 'btnTrashAll disabled'
                            fontAwesomeIcon = 'fa-trash'
                            onButtonClick = {toolbarData.onClick_trashAllPostTypesListData} />
                    </>                    
                ) : (
                    <>
                        <TBButton type = 'primary'
                            className = 'btnRemovePermantlyAll disabled'
                            fontAwesomeIcon = 'fa-trash'
                            onButtonClick = {toolbarData.onClick_trashPermantlyAllPostType} />
                        <TBButton type = 'primary'
                                className = 'btnRestoreAll disabled'
                                fontAwesomeIcon = 'fa-recycle'
                                onButtonClick = {toolbarData.onClick_restoreAllDeactivePostType} />
                    </>
                )}
            </div>
            <div className="toolRight">
                <div>
                    <TBTextField className = {searchFieldClassName}
                                 placeholder = {searchFieldPlaceholder}
                                 value = {s}
                                 onChanged = {toolbarData.onChange_txtSearchChanged}
                                 onFieldKeyDown = {toolbarData.onKeyDown_searchPostType} />
                    <TBButton type = 'primary' 
                          className = 'btnClearFilter'
                          fontAwesomeIcon = 'fa-remove'
                          clearFilter = {true}
                          onButtonClick = {toolbarData.onClick_clearTxtSearchPostType} />
                </div>
            </div>
        </div>
    )        
}
