import React from 'react'
import TBButton from './buttons/tbButton'
import Delimiter from './delimiter'
import {default as TBTextField} from './fields/TBDefTextField'
export default function ToolbarUsersButtons({ tabId, 
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
                          onButtonClick = {toolbarData.onClick_refreshUsersListData} />
                {tabId === 'active' ? (
                    <TBButton type = 'primary' 
                            className = 'btnTrashAll disabled'
                            fontAwesomeIcon = 'fa-trash'
                            onButtonClick = {toolbarData.onClick_trashAllUsersListData} />
                ) : (
                    <TBButton type = 'primary' 
                            className = 'btnRestoreAll disabled'
                            fontAwesomeIcon = 'fa-recycle'
                            onButtonClick = {toolbarData.onClick_restoreAllUsersListData} />
                )}
            </div>
            <div className="toolRight">
                <div>
                    <TBTextField className = {searchFieldClassName}
                                 placeholder = {searchFieldPlaceholder}
                                 onChanged = {toolbarData.onChange_txtSearchUserNameChanged}
                                 onFieldKeyDown = {toolbarData.onKeyDown_txtSearchUserNameChanged} />
                    <TBButton type = 'primary' 
                          className = 'btnClearFilter'
                          fontAwesomeIcon = 'fa-remove'
                          clearFilter = {true}
                          onButtonClick = {toolbarData.onClick_clearSearchUserNameFilter} />
                </div>
            </div>
        </div>
    )        
}
