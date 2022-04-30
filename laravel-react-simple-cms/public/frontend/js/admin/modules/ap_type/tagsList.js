import React, { Component } from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import NewTagNodeModal from './modals/newTagNodeModal';
import EditTagNodeModal from './modals/editTagNodeModal';
import * as tabListsEvents from 'utils/tabListsUtils';
import MediaEmbbedModal from 'modules/filemanager/modals/mediaEmbbedModal';
import { isUndefined } from 'utils/libUtils';
import TagsListTab from './components/tagsListTab';
import { saveActiveComponentName } from 'utils/componentUtils';
import { COMPONENT_INST } from 'constants/componentConstants';
export default class TagsList extends React.Component {  
    constructor(props) {
        super(props);
        this.state = {
            loadMediaEmbbed : !isUndefined(props.loadMediaEmbbed) ? props.loadMediaEmbbed : true,
            showCheckboxes : !isUndefined(props.showCheckboxes) ? props.showCheckboxes : false
        }
    }
    componentDidMount() {
        tabListsEvents.initWindowResize();
        window.addEventListener('resize', tabListsEvents.windowResizeEvent);
        document.addEventListener('fullscreenchange', tabListsEvents.windowResizeEvent);
        document.addEventListener('keydown', tabListsEvents.onKeyDownShortcut);    
        saveActiveComponentName(COMPONENT_INST.TAGS_LIST_LAYOUT);
    }
    componentWillUnmount() {
        tabListsEvents.resetWindowResize();
        window.removeEventListener('resize', tabListsEvents.windowResizeEvent);
        document.removeEventListener('fullscreenchange', tabListsEvents.windowResizeEvent);
        document.removeEventListener('keydown', tabListsEvents.onKeyDownShortcut);
    }
render() {
    const {showCheckboxes, loadMediaEmbbed} = this.state;
    return (
        <div className="w100p">
            <div className="tabLists w100p">
                <Tabs defaultActiveKey="active-tags-list-tab"
                    transition={false}
                    id="tags-list-tab">
                    <Tab eventKey="active-tags-list-tab" title="Danh sách thẻ">
                        <TagsListTab showCheckboxes = {showCheckboxes} />
                    </Tab>
                </Tabs>
            </div>
            <NewTagNodeModal heading="Hộp thoại tạo thẻ"
                                   saveText="Tạo thẻ"
                                   closeText="Đóng lại" />
            <EditTagNodeModal heading="Hộp thoại sửa thẻ"
                                   saveText="Lưu thay đổi"
                                   closeText="Đóng lại" />
            {loadMediaEmbbed ? (
                <MediaEmbbedModal heading="Thư viện ảnh"
                                    chooseText="Chọn đối tượng"
                                    closeText="Đóng lại" />
            ) : null}
        </div>
    );
}
}
