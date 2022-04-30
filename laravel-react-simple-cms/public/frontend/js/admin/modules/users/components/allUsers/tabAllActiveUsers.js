import React, { Component } from 'react';
import DataTable from 'react-data-table-component';
import memoize from 'memoize-one';
import {isEqual, cloneDeep} from 'lodash';
import {performUsersTabDidMountHook} from 'utils/membershipUtils';
import { connect } from 'react-redux';
import {onClick_editUser, onClick_removeUser, 
        onKeyDown_txtSearchUserNameChanged, 
        onClick_clearSearchUserNameFilter,
        onClick_zoomIn, onClick_zoomOut, 
        onClick_zoomReset, onClick_toggleTabFullScreen, 
        onClick_refreshUsersListData, onClick_trashAllUsersListData, onChange_txtSearchUserNameChanged} from 'handleEvents/usersListHandleEvents';
import ActionActiveButtons from 'templates/allUsers/actionActiveButtons';
import ToolbarButtons from 'templates/allUsers/toolbarButtons';
import SweetLoading from 'templates/sweetLoading';
import { COMPONENT_INST } from 'constants/componentConstants';
import { addComponentInst } from 'utils/componentUtils';
import { onChange_handleSelectedRows, onMouseUp_handleSelectRow } from 'handleEvents/postTypesHandleEvents';
const EmptyData = <p style={{ paddingBottom: 10 }}>Không có dữ liệu nào để hiển thị.</p>;
const columns = memoize(columnsData => [
    {
        name : '',
        maxWidth: '80px',
        cell : row => <ActionActiveButtons row={row} actionData={columnsData.actionData} />
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
class TabAllActiveUsers extends Component {    
    constructor(props) {
        super(props);
        this.state = {
            filteredItems : [],
            data : [],
            isFullScreen : false,
            zoom : 1,
            searching : false,
            loadingData : true
        };
        this.keywords = '';
        this.rowsIdSelectedRef = [];
        this.onMouseUp_handleSelectRow = onMouseUp_handleSelectRow.bind(this);
    }
    async componentDidMount() {
        addComponentInst({
            name : COMPONENT_INST.USERS_TAB,
            instance : this
        });
        await performUsersTabDidMountHook();
        try {
            document.querySelectorAll('.tabLists .tab-pane .dtUsersContainer')
                    .forEach(elem => elem.addEventListener('mouseup', this.onMouseUp_handleSelectRow));
        } catch {}
    } 
    componentWillUnmount() {
        try {
            document.querySelectorAll('.tabLists .tab-pane .dtUsersContainer')
                    .forEach(elem => elem.removeEventListener('mouseup', this.onMouseUp_handleSelectRow));
        } catch {}
    }
    componentDidUpdate(nextProps, nextState) {
        const {filteredItems} = this.state;
        const {usersList} = this.props;
        const keywords = this.keywords;
        addComponentInst({
            name : COMPONENT_INST.USERS_TAB,
            instance : this
        });
        if ( !isEqual(filteredItems, usersList) ) {
            if ( !keywords ) { // not searching
                this.setState({
                    filteredItems : cloneDeep(usersList),
                    data : cloneDeep(usersList)
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
        const { loadingData, filteredItems, zoom, isFullScreen } = this.state,
              { userAvatarTimeStamp, userProfile } = this.props,
              username = userProfile.username;   
        const columnsData = {
            userAvatarTimeStamp,
            actionData : {
                username,
                onClick_editUser : onClick_editUser.bind(this),
                onClick_removeUser : onClick_removeUser.bind(this)               
            }
        };
        const toolbarData = {
            onClick_zoomIn : onClick_zoomIn.bind(this),
            onClick_zoomOut : onClick_zoomOut.bind(this),
            onClick_zoomReset : onClick_zoomReset.bind(this),
            onClick_toggleTabFullScreen : onClick_toggleTabFullScreen.bind(this),
            onClick_refreshUsersListData : onClick_refreshUsersListData.bind(this),
            onClick_trashAllUsersListData : onClick_trashAllUsersListData.bind(this),
            onChange_txtSearchUserNameChanged : onChange_txtSearchUserNameChanged.bind(this),
            onKeyDown_txtSearchUserNameChanged : onKeyDown_txtSearchUserNameChanged.bind(this),
            onClick_clearSearchUserNameFilter : onClick_clearSearchUserNameFilter.bind(this)
        };
        return (
            <div className={"myTabContainer ".concat(isFullScreen ? 'fullscreen' : '')}>
                <div className="mainHeader" style={{ zoom : zoom }}>
                    {!loadingData ? 
                            <ToolbarButtons s = {this.keywords}
                                            toolbarData={toolbarData} /> : 
                            <SweetLoading loading={loadingData} />}
                    <h4 className="headingTable" style={{marginTop: 20}}>
                        Danh sách người dùng hiện có
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
                                    selectableRowDisabled={row => row.username === username}                           
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
        userAvatarTimeStamp : state.userAvatarReducer.avatarTimeStamp,
        userProfile : state.userProfileReducer.userProfile,
        userRolesList : state.userProfileReducer.userRolesList,
        deactiveUsersList : state.usersListReducer.deactiveUsersList,
        //editUserModalProps : state.usersListReducer.editUserModalProps,
        usersList : state.usersListReducer.usersList,  
        userAvatarsList : state.userAvatarReducer.avatars_list,
        //currentModeComponent : state.componentReducer.currentModeState
    }
}
const mapDispatchToProps = dispatch => {
    return {
        updateUsersList : (payload) => {
            dispatch({
                reducer : 'usersListReducer',
                type : "UPDATE_USERS_LIST",
                payload : payload
            });        
        },
        updateUserSelectedAvatar : (id) => {
            dispatch({
                reducer : 'userAvatarReducer',
                type : "UPDATE_USER_SELECTED_AVATAR",            
                id : id
            });        
        },    
        updateOriginalUserProfile : (userprofile) => {
            dispatch({
                reducer : 'userProfileReducer',
                type : "UPDATE_USER__PROFILE",            
                payload : userprofile
            });        
        },
        updateEditUserModalProps : (payload) => {
            dispatch({
                reducer : 'usersListReducer',
                type : "UPDATE_EDIT_USER_MODAL_PROPS",
                payload : payload
            });        
        },
        updateDeactiveUsersList : (payload) => {
            dispatch({
                reducer : 'usersListReducer',
                type : "UPDATE_DEACTIVE_USERS_LIST",
                payload : payload
            });        
        },    
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(TabAllActiveUsers);