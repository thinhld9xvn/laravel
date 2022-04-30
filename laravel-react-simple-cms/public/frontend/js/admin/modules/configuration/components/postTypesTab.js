import React, { Component } from 'react';
import DataTable from 'react-data-table-component';
import memoize from 'memoize-one';
import { css } from "@emotion/core";
import { connect } from 'react-redux';
import {performPostTypesTabMountHook} from 'utils/postTypesUtils';
import {onClick_zoomIn, onClick_zoomOut, 
        onClick_zoomReset, onClick_toggleTabFullScreen} from 'handleEvents/usersListHandleEvents';
import {onClick_showNewPostTypeModal,
        onClick_showEditPostTypeModal,
        onClick_removePostType,
        onClick_refreshPostTypesListData, 
        onChange_handleSelectedRows,
        onClick_trashAllPostTypesListData,
        onMouseUp_handleSelectRow,
        onChange_txtSearchChanged,
        onKeyDown_searchPostType,
        onClick_clearTxtSearchPostType} from 'handleEvents/postTypesHandleEvents';
import {addComponentInst} from 'utils/componentUtils';
import 'css/tabsList.css';
import '../css/configuration.css';
import { COMPONENT_INST } from 'constants/componentConstants';
import { isEqual } from 'lodash';
import ToolbarButtons from 'templates/postTypes/toolbar-buttons';
import SweetLoading from 'templates/sweetLoading';
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;
const ActionButtons = ({ row, actionData }) => (    
    <div className="actionButtons">
        <a className="btn btn-primary btn-link btn-sm"
            data-pid={row.id} 
            onClick={actionData.onClick_showEditPostTypeModal}                    
            href="#">
            <i className="fa fa-pencil"></i>
        </a>
        <a className="btn btn-danger btn-link btn-sm"  
            data-pid={row.id} 
            onClick={actionData.onClick_removePostType}
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
class PostTypesTab extends Component {
    constructor(props) {
        super(props);
        this.state = {                      
            filteredItems : [], 
            data : [],       
            isFullScreen : false,            
            rowsIdSelected : [],
            zoom : 1,       
            loadingData : true
        };
        this.s = '';
        this.rowsIdSelectedRef = [];
        this.onMouseUp_handleSelectRow = onMouseUp_handleSelectRow.bind(this);
    }
    async componentDidMount() {
        addComponentInst({
            name : COMPONENT_INST.POST_TYPES_TAB,
            instance : this
        });
        await performPostTypesTabMountHook.call(this);
        try {
            document.querySelectorAll('.tabLists .tab-pane .dtPostTypesContainer')
                    .forEach(elem => elem.addEventListener('mouseup', this.onMouseUp_handleSelectRow));
        } catch {}

    } 
    shouldComponentUpdate(nextProps, nextState) {
        if ( !isEqual(this.state, nextState) ) return true;
        if ( !isEqual(this.props, nextProps) ) return true;        
        return false;
    }
    componentDidUpdate() {        
        addComponentInst({
            name : COMPONENT_INST.POST_TYPES_TAB,
            instance : this
        });
    }   
    componentWillUnmount() {
        try {
            document.querySelectorAll('.tabLists .tab-pane .dtPostTypesContainer')
                    .forEach(elem => elem.removeEventListener('mouseup', this.onMouseUp_handleSelectRow));
        } catch {}
    }
    render() {
        const { loadingData, filteredItems, zoom, isFullScreen } = this.state,
              { userAvatarTimeStamp } = this.props;
        const columnsData = {
            userAvatarTimeStamp,
            actionData : {
                onClick_showEditPostTypeModal : onClick_showEditPostTypeModal.bind(this),
                onClick_removePostType : onClick_removePostType.bind(this)               
            }
        };
        const toolbarData = {
            onClick_zoomIn : onClick_zoomIn.bind(this),
            onClick_zoomOut : onClick_zoomOut.bind(this),
            onClick_zoomReset : onClick_zoomReset.bind(this),
            onClick_toggleTabFullScreen : onClick_toggleTabFullScreen.bind(this),
            onClick_showNewPostTypeModal : onClick_showNewPostTypeModal.bind(this),            
            onClick_refreshPostTypesListData : onClick_refreshPostTypesListData.bind(this),
            onClick_trashAllPostTypesListData : onClick_trashAllPostTypesListData.bind(this),
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
                                            toolbarData={toolbarData} /> : 
                            <SweetLoading loading={loadingData} />}
                    <h4 className="headingTable" style={{marginTop: 20}}>
                        Danh sách mục bài viết hiện có
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
        postTypeEditing : state.postTypesReducer.postTypeEditing,
        postTypesList : state.postTypesReducer.postTypesList,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        updatePostTypesList : (payload) => {
            dispatch({
                reducer : 'postTypesReducer',
                type : "UPDATE_POST_TYPES_LIST",
                payload : payload
            });
        },
        updatePostTypeEditing : (payload) => {
            dispatch({
                reducer : 'postTypesReducer',
                type : "UPDATE_POST_TYPE_EDITING",
                payload : payload
            });
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(PostTypesTab);