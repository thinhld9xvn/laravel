import React, { Component } from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import NewCategoryNodeModal from './modals/newCategoryNodeModal';
import EditCategoryNodeModal from './modals/editCategoryNodeModal';
import CategoriesListTab from './components/categoriesListTab';
import * as tabListsEvents from 'utils/tabListsUtils';
import MediaEmbbedModal from 'modules/filemanager/modals/mediaEmbbedModal';
import { isUndefined } from 'utils/libUtils';
import { saveActiveComponentName } from 'utils/componentUtils';
import { COMPONENT_INST } from 'constants/componentConstants';
export default class CategoriesList extends React.Component {  
    constructor(props) {
        super(props);
        this.state = {
            loadMediaEmbbed : !isUndefined(props.loadMediaEmbbed) ? props.loadMediaEmbbed : true
        }
    }
    componentDidMount() {
        tabListsEvents.initWindowResize();
        window.addEventListener('resize', tabListsEvents.windowResizeEvent);
        document.addEventListener('fullscreenchange', tabListsEvents.windowResizeEvent);
        document.addEventListener('keydown', tabListsEvents.onKeyDownShortcut);    
        saveActiveComponentName(COMPONENT_INST.CATEGORIES_LIST_LAYOUT);
    }
    componentWillUnmount() {
        tabListsEvents.resetWindowResize();
        window.removeEventListener('resize', tabListsEvents.windowResizeEvent);
        document.removeEventListener('fullscreenchange', tabListsEvents.windowResizeEvent);
        document.removeEventListener('keydown', tabListsEvents.onKeyDownShortcut);
    }
render() {
    return (
        <div className="w100p">
            <div className="tabLists w100p">
                <Tabs defaultActiveKey="active-posts-list-tab"
                    transition={false}
                    id="posts-list-tab">
                    <Tab eventKey="active-posts-list-tab" title="Danh sách danh mục">
                        <CategoriesListTab />
                    </Tab>
                </Tabs>
            </div>
            <NewCategoryNodeModal heading="Hộp thoại tạo danh mục"
                                   saveText="Tạo danh mục"
                                   closeText="Đóng lại" />
            <EditCategoryNodeModal heading="Hộp thoại sửa danh mục"
                                   saveText="Lưu thay đổi"
                                   closeText="Đóng lại" />
            {this.state.loadMediaEmbbed ? (
                <MediaEmbbedModal heading="Thư viện ảnh"
                                    chooseText="Chọn đối tượng"
                                    closeText="Đóng lại" />
            ) : null}
        </div>
    );
}
}
