import React, { Component } from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import TabProfile from './components/userprofile/tabProfile';
import TabPassword from './components/userprofile/tabPassword';
import AvatarsListModal from './modals/avatarsListModal';
import CropAvatarModal from './modals/cropAvatarModal';
import {onClick_selectTab} from 'handleEvents/tabListsHandleEvents';
import {tabListsInitialize, tabListsDestroy} from 'utils/tabListsUtils';
import 'css/tabsList.css';
import './css/users.min.css';
import { saveActiveComponentName } from 'utils/componentUtils';
import { COMPONENT_INST } from 'constants/componentConstants';
class UserProfile extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {            
        tabListsInitialize();
        saveActiveComponentName(COMPONENT_INST.USER_PROFILE_LAYOUT);
    }
    componentWillUnmount() {        
        tabListsDestroy();
    }
    render() {
        return (
            <div className="w100p">
                <div className="tabLists w100p">
                    <Tabs defaultActiveKey="profile" 
                          transition={false} 
                          id="user-profile-tabs"
                          onSelect={onClick_selectTab.bind(this)}>
                        <Tab eventKey="profile" title="Hồ sơ">
                            <TabProfile />
                        </Tab>
                        <Tab eventKey="password" title="Mật khẩu">
                            <TabPassword />
                        </Tab>
                    </Tabs>
                </div>
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
export default UserProfile;