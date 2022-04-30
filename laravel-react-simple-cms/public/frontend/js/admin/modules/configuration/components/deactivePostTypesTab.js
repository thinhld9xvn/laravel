import React, { Component } from 'react';
import DataTable from 'react-data-table-component';
import memoize from 'memoize-one';
import { css } from "@emotion/core";
import { connect } from 'react-redux';
import {onKeyDown_txtSearchUserNameChanged as onKeyDown_txtSearchChanged, 
        onClick_clearSearchUserNameFilter as onClick_clearSearchFilter,
        onClick_zoomIn, onClick_zoomOut, 
        onClick_zoomReset, onClick_toggleTabFullScreen} from 'handleEvents/usersListHandleEvents';
import {onClick_restoreDeactivePostType,
        onClick_trashPermantlyPostType,
        onClick_refreshPostTypesListData,
        onClick_restoreAllDeactivePostType, 
        onClick_trashPermantlyAllPostType,
        onKeyDown_searchPostType,
        onChange_txtSearchChanged,
        onClick_clearTxtSearchPostType,
        onChange_handleSelectedRows,
        onMouseUp_handleSelectRow} from 'handleEvents/postTypesHandleEvents';
import {addComponentInst} from 'utils/componentUtils';
import 'css/tabsList.css';
import '../css/configuration.min.css';
import { COMPONENT_INST } from 'constants/componentConstants';
import { cloneDeep, isEqual } from 'lodash';
import ToolbarButtons from 'templates/postTypes/toolbar-buttons';
import SweetLoading from 'templates/sweetLoading';
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;
const ActionButtons = ({ row, actionData }) => (    
    <div className="actionButtons">     
        <a className="btn btn-danger btn-link btn-sm"  
            data-pid={row.id} 
            onClick={actionData.onClick_restoreDeactivePostType}                  
            href="#">
            <i className="fa fa-recycle"></i>
        </a>
        <a className="btn btn-default btn-link btn-sm"  
            data-pid={row.id} 
            onClick={actionData.onClick_trashPermantlyPostType}                  
            href="#">
            <i className="fa fa-trash"></i>
        </a>
    </div>
);
const columns = memoize(columnsData => [
    {
        name : '',
        maxWidth: '80px',
        cell : row => <ActionButtons row={row} actionData={columnsData.actionData} />
    },      
    {
        name: 'Tên loại bài viết',
        selector: 'name',
        sortable: true,
    },
    {
        name: 'Mô tả',
        selector: 'description'
    },
    {
        name: 'Slug',
        selector: 'slug'              
    }
]);
const emptyData = <p style={{ paddingBottom: 10 }}>Không có dữ liệu nào để hiển thị.</p>;
class DeactivePostTypesTab extends Component {
    constructor(props) {
        super(props);
        this.state = {                      
            filteredItems : [], 
            data : [],       
            isFullScreen : false,            
            rowsIdSelected : [],
            zoom : 1,       
            loadingData : false
        };
        this.s = '';
        this.rowsIdSelectedRef = [];
        this.onMouseUp_handleSelectRow = onMouseUp_handleSelectRow.bind(this);
    }
    componentDidMount() {
        addComponentInst({
            name : COMPONENT_INST.DEACTIVE_POST_TYPES_TAB,
            instance : this
        });
    } 
    shouldComponentUpdate(nextProps, nextState) {
        if ( !isEqual(this.state, nextState) ) return true;
        if ( !isEqual(this.props, nextProps) ) return true;        
        return false;
    }
    componentDidUpdate() {        
        addComponentInst({
            name : COMPONENT_INST.DEACTIVE_POST_TYPES_TAB,
            instance : this
        })
    }   
    render() {
        const { loadingData, filteredItems, zoom, isFullScreen } = this.state,
              { userAvatarTimeStamp } = this.props;
        const columnsData = {
            userAvatarTimeStamp,
            actionData : {
                onClick_restoreDeactivePostType : onClick_restoreDeactivePostType.bind(this),
                onClick_trashPermantlyPostType : onClick_trashPermantlyPostType.bind(this)
            }
        };
        const toolbarData = {
            onClick_zoomIn : onClick_zoomIn.bind(this),
            onClick_zoomOut : onClick_zoomOut.bind(this),
            onClick_zoomReset : onClick_zoomReset.bind(this),
            onClick_toggleTabFullScreen : onClick_toggleTabFullScreen.bind(this),          
            onClick_refreshPostTypesListData : onClick_refreshPostTypesListData.bind(this),
            onClick_trashPermantlyAllPostType : onClick_trashPermantlyAllPostType.bind(this),
            onClick_restoreAllDeactivePostType : onClick_restoreAllDeactivePostType.bind(this),
            onKeyDown_searchPostType : onKeyDown_searchPostType.bind(this),
            onChange_txtSearchChanged : onChange_txtSearchChanged.bind(this),
            onClick_clearTxtSearchPostType : onClick_clearTxtSearchPostType.bind(this)
        };
        return (
            <div className={"myTabContainer ".concat(isFullScreen ? 'fullscreen' : '')}>
                 <div className="mainHeader">
                    {!loadingData ? 
                            <ToolbarButtons inst={this}
                                            s = {this.s}
                                            tabId = 'deactive'
                                            toolbarData={toolbarData} /> : 
                            <SweetLoading loading={loadingData} />}
                    <h4 className="headingTable" style={{marginTop: 20}}>
                        Danh sách mục bài viết đã xóa
                    </h4>
                </div>
                <div className={"mainContent dtPostTypesContainer ".concat(loadingData ? 'disabled' : '')}
                     style={{ paddingTop: 0 }}>
                    { !loadingData ? (
                            <div style={{ zoom }}>                                
                                <DataTable
                                    title="Danh sách mục bài viết"
                                    columns={columns(columnsData)}
                                    data={filteredItems}
                                    className="dtAllUsers dtPostTypes dtAllActivePostTypesList"
                                    noDataComponent={emptyData}
                                    noHeader={true}
                                    onSelectedRowsChange={onChange_handleSelectedRows.bind(this)}   
                                    clearSelectedRows={this.rowsIdSelectedRef.length === 0}                            
                                    selectableRows
                                    highlightOnHover                         
                                    pagination />
                            </div>
                        ) : null}                        
                </div>
                <div className="mainFooter"></div>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        deactivePostTypesList : state.postTypesReducer.deactivePostTypesList,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        updateDeactivePostTypesList : (payload) => {
            dispatch({
                reducer : 'postTypesReducer',
                type : "UPDATE_DEACTIVE_POST_TYPES_LIST",
                payload : payload
            });
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(DeactivePostTypesTab);