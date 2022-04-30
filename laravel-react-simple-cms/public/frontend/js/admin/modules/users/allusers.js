import React, { Component } from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import TabAllActiveUsers from './components/allUsers/tabAllActiveUsers';
import TabAllDeactiveUsers from './components/allUsers/tabAllDeActiveUsers';
import {onClick_selectTab} from 'handleEvents/tabListsHandleEvents';
import {tabListsInitialize, tabListsDestroy} from 'utils/tabListsUtils';
import AvatarsListModal from './modals/editUser/avatarsListModal';
import CropAvatarModal from './modals/cropAvatarModal';
import EditUserModal from './modals/editUserModal';
import ChangePasswordModal from './modals/editUser/changePasswordModal';
import 'css/tabsList.css';
import './css/users.css';
import { saveActiveComponentName } from 'utils/componentUtils';
import { COMPONENT_INST } from 'constants/componentConstants';
class AllUsers extends Component {
    constructor(props) {
        super(props);
    }    
    componentDidMount() {
        tabListsInitialize();
        saveActiveComponentName(COMPONENT_INST.ALL_USERS_LAYOUT);
    }
    componentWillUnmount() {        
        tabListsDestroy();
    }
    render() {
        return (
            <div className="w100p">
                <div className="tabLists w100p">
                    <Tabs defaultActiveKey="active-users" 
                          transition={false} 
                          id="all-users-tabs"
                          onSelect={onClick_selectTab.bind(this)}>
                        <Tab eventKey="active-users" title="Người dùng hiện có">
                            <TabAllActiveUsers />
                        </Tab>
                        <Tab eventKey="inactive-users" title="Người dùng đã xóa">
                            <TabAllDeactiveUsers />
                        </Tab>
                    </Tabs>
                </div>  
                <EditUserModal heading="Profile người dùng"                               
                              chooseText="Lưu thay đổi"
                              closeText="Đóng lại" />
                <ChangePasswordModal heading="Thay đổi mật khẩu"
                              closeText="Đóng lại" />
                <AvatarsListModal heading="Mời chọn một avatar"                               
                              chooseText="Chọn avatar"
                              closeText="Đóng lại" />
                <CropAvatarModal heading="Chỉnh sửa avatar"                               
                              chooseText="Chọn"
                              closeText="Đóng lại" />              
            </div>
        );
    }
}
export default AllUsers;