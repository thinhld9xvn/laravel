import React, { Component } from 'react';
import memoize from 'memoize-one';
import DataTable from 'react-data-table-component';
import {isEqual, cloneDeep} from 'lodash';
import { connect } from 'react-redux';
import {onClick_restoreDeactiveUser,
        onKeyDown_txtSearchUserNameChanged,
        onClick_clearSearchUserNameFilter,
        onClick_zoomIn, onClick_zoomOut,
        onClick_zoomReset, onClick_toggleTabFullScreen,
        onClick_refreshUsersListData, onClick_restoreAllUsersListData} from 'handleEvents/usersListHandleEvents';
import { onChange_handleSelectedRows, onMouseUp_handleSelectRow } from 'handleEvents/postTypesHandleEvents';
import ToolbarButtons from 'templates/allUsers/toolbarButtons';
import SweetLoading from 'templates/sweetLoading';
import ActionDeactiveButtons from 'templates/allUsers/actionDeactiveButtons';
import { addComponentInst } from 'utils/componentUtils';
import { COMPONENT_INST } from 'constants/componentConstants';
const columns = memoize(columnsData => [
    {
        name : '',
        maxWidth: '80px',
        cell : row => <ActionDeactiveButtons row={row} actionData={columnsData.actionData} />
    },
    {
        name: 'Avatar',
        grow: 0,
        cell: row => <img width="40px" alt={row.display_name} src={row.avatar.concat(`?t=${columnsData.userAvatarTimeStamp}`)} />,
    },
    {
        name: 'Tên người dùng',
        selector: 'username',
        sortable: true,
    },
    {
        name: 'Tên hiển thị',
        selector: 'display_name',
        sortable: true,
    },
    {
        name: 'Thư điện tử',
        selector: 'email'
    },
    {
        name: 'Vai trò',
        selector: 'role_name'
    }
]);
const EmptyData = <p style={{ paddingBottom: 10 }}>Không có dữ liệu nào để hiển thị.</p>;
class TabAllDeActiveUsers extends Component {    
    constructor(props) {
        super(props);
        this.state = {
            searchUserNameKey : '',
            filteredItems : [],
            data : [],
            isFullScreen : false,
            zoom : 1,
            loadingData : true
        };
        this.keywords = '';
        this.rowsIdSelectedRef = [];
        this.onMouseUp_handleSelectRow = onMouseUp_handleSelectRow.bind(this);
    }
    async componentDidMount() {
        addComponentInst({
            name : COMPONENT_INST.DEACTIVE_USERS_TAB,
            instance : this
        });
    }   
    componentDidUpdate(nextProps, nextState) {
        const {filteredItems} = this.state;
        const {deactiveUsersList} = this.props;
        addComponentInst({
            name : COMPONENT_INST.DEACTIVE_USERS_TAB,
            instance : this
        });
        if ( !isEqual(filteredItems, deactiveUsersList) ) {
            if ( !this.keywords ) { // not searching
                this.setState({
                    filteredItems : cloneDeep(deactiveUsersList),
                    data : cloneDeep(deactiveUsersList)
                });
            }
        }
    }
    shouldComponentUpdate(nextProps, nextState) {
        if ( !isEqual(this.state, nextState) ) return true;
        if ( !isEqual(this.props, nextProps) ) return true;
        return false;
    }
    render() {
        const { loadingData, filteredItems, zoom, isFullScreen, usersListIdSelected  } = this.state,
              { userAvatarTimeStamp } = this.props;
        const columnsData = {
            userAvatarTimeStamp,
            actionData : {
                onClick_restoreDeactiveUser : onClick_restoreDeactiveUser.bind(this)
            }
        };
        const toolbarData = {
            onClick_zoomIn : onClick_zoomIn.bind(this),
            onClick_zoomOut : onClick_zoomOut.bind(this),
            onClick_zoomReset : onClick_zoomReset.bind(this),
            onClick_toggleTabFullScreen : onClick_toggleTabFullScreen.bind(this),
            onClick_refreshUsersListData : onClick_refreshUsersListData.bind(this),
            onClick_restoreAllUsersListData : onClick_restoreAllUsersListData.bind(this),
            onKeyDown_txtSearchUserNameChanged : onKeyDown_txtSearchUserNameChanged.bind(this),
            onClick_clearSearchUserNameFilter : onClick_clearSearchUserNameFilter.bind(this)
        }; 
        return (
            <div className={"myTabContainer ".concat(isFullScreen ? 'fullscreen' : '')}>
                <div className="mainHeader" style={{ zoom : zoom }}>
                    {!loadingData ? 
                            <ToolbarButtons s = {this.keywords}
                                            tabId = "deactive"
                                            toolbarData={toolbarData} /> : 
                            <SweetLoading loading={loadingData} />}
                    <h4 className="headingTable" style={{marginTop: 20}}>
                        Danh sách người dùng đã xóa
                    </h4>
                </div>
                <div className={"mainContent dtUsersContainer ".concat(loadingData ? 'disabled' : '')}
                    style={{ paddingTop : 0 }}>
                    { !loadingData ? (
                            <div style={{ zoom }}>
                                <DataTable
                                    title="Danh sách người dùng"
                                    columns={columns(columnsData)}
                                    data={filteredItems}
                                    className="dtAllUsers dtAllActiveUsers"
                                    noDataComponent={EmptyData}
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
        usersList : state.usersListReducer.usersList,  
        deactiveUsersList : state.usersListReducer.deactiveUsersList,    
        userRolesList : state.userProfileReducer.userRolesList,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        updateDeactiveUsersList : (payload) => {
            dispatch({
                reducer : 'usersListReducer',
                type : "UPDATE_DEACTIVE_USERS_LIST",
                payload : payload
            });        
        },  
        updateUsersList : (payload) => {
            dispatch({
                reducer : 'usersListReducer',
                type : "UPDATE_USERS_LIST",
                payload : payload
            });        
        },       
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(TabAllDeActiveUsers);