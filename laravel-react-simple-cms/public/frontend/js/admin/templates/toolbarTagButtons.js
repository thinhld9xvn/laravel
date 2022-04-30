import React from 'react'
import TBButton from './buttons/tbButton'
import Delimiter from './delimiter'
import TBTextField from './fields/tbTextField'
export default function ToolbarTagButtons({ toolbarData, 
                                              s = '',
                                              searchFieldClassName = 'searchUserNameKey searchCatText',
                                              searchFieldPlaceholder = 'Tìm kiếm thẻ ...' }) {
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
                          className = 'btnNewTag'
                          fontAwesomeIcon = 'fa-plus'
                          onButtonClick = {toolbarData.onClick_handleOpenModalTagNodeItem} />
                <TBButton type = 'primary' 
                          className = 'btnRemoveTag'
                          fontAwesomeIcon = 'fa-trash'
                          onButtonClick = {toolbarData.onClick_handleRemoveTagNodeItem} />
                <TBButton type = 'primary' 
                          className = 'btnRefresh'
                          fontAwesomeIcon = 'fa-refresh'
                          onButtonClick = {toolbarData.onClick_refreshTagsListData} />
                <TBButton type = 'primary'
                          className = 'btnSave'
                          fontAwesomeIcon = 'fa-upload'
                          onButtonClick = {toolbarData.onClick_importDefSampleData} />  
                <TBButton type = 'primary'
                          className = 'btnSave'
                          fontAwesomeIcon = 'fa-floppy-o'
                          onButtonClick = {toolbarData.onClick_saveTagsListData} />                
            </div>
            <div className="toolRight">
                <div>
                    <TBTextField className = {searchFieldClassName}
                                 placeholder = {searchFieldPlaceholder}
                                 onChanged = {toolbarData.onKeyDown_txtSearchChanged}
                                 value = {s} />
                    <TBButton type = 'primary' 
                                className = 'btnClearFilter'
                                fontAwesomeIcon = 'fa-remove'
                                clearFilter = {true}
                                onButtonClick = {toolbarData.onClick_clearTxtSearchFilter} />
                </div>
            </div>
        </div>
    )        
}
