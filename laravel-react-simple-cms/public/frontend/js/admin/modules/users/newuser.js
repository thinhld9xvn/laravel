import React, { Component } from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import TabNewProfile from './components/userprofile/tabNewProfile';
import AvatarsListModal from './modals/newUser/avatarsListModal';
import CropAvatarModal from './modals/newUser/cropAvatarModal';
import {onClick_selectTab} from 'handleEvents/tabListsHandleEvents';
import {tabListsInitialize, tabListsDestroy} from 'utils/tabListsUtils';
import 'css/tabsList.css';
import './css/users.min.css';
import { saveActiveComponentName } from 'utils/componentUtils';
import { COMPONENT_INST } from 'constants/componentConstants';
class NewUser extends Component {
    constructor(props) {
        super(props);
    }    
    componentDidMount() {           
        tabListsInitialize();
        saveActiveComponentName(COMPONENT_INST.NEW_USER_LAYOUT);
    }
    componentWillUnmount() {
        tabListsDestroy();
    } 
    render() {
        return (
            <div className="w100p">
                <div className="tabLists w100p">
                    <Tabs id="user-add-newprofile-tabs"
                          defaultActiveKey="new-profile"
                          transition={false}
                          onSelect={onClick_selectTab.bind(this)}>
                        <Tab eventKey="new-profile" title="Thông tin thành viên">
                            <TabNewProfile />
                        </Tab>
                    </Tabs>
                </div>  
                <AvatarsListModal heading="Mời chọn một avatar"                               
                              chooseText="Chọn avatar"
                              closeText="Đóng lại" />  
                <CropAvatarModal heading="Mời chọn một avatar"                               
                              chooseText="Chọn avatar"
                              closeText="Đóng lại" />            
            </div>
        );
    }
}
export default NewUser;