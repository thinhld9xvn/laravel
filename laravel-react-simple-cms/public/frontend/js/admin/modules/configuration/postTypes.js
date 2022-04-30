import React, { Component } from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import PostTypesTab from './components/postTypesTab';
import DeactivePostTypesTab from './components/deactivePostTypesTab';
import NewPostTypeModal from './modals/newPostTypeModal';
import EditPostTypeModal from './modals/editPostTypeModal';
import { saveActiveComponentName } from 'utils/componentUtils';
import { COMPONENT_INST } from 'constants/componentConstants';
import { tabListsDestroy, tabListsInitialize } from 'utils/tabListsUtils';
import { onClick_selectTab } from 'handleEvents/tabListsHandleEvents';
class PostTypes extends Component {
    componentDidMount() {
        tabListsInitialize();
        saveActiveComponentName(COMPONENT_INST.POST_TYPES_LAYOUT);
    }
    componentWillUnmount() {
        tabListsDestroy();
    }
    render() {
        return (
            <div className="w100p">
                <div className="tabLists w100p">
                    <Tabs defaultActiveKey="list-posts-types-tab"
                        transition={false}
                        id="advanced-post-types-tabs"
                        onSelect={onClick_selectTab.bind(this)}>
                        <Tab eventKey="list-posts-types-tab" title="Danh sách mục bài viết nâng cao">
                            <PostTypesTab />
                        </Tab>
                        <Tab eventKey="list-deactive-posts-types-tab" title="Thùng rác">
                            <DeactivePostTypesTab />
                        </Tab>
                    </Tabs>
                </div>
                <NewPostTypeModal heading="Hộp thoại tạo mục bài viết"
                    chooseText="Tạo mục bài viết"
                    closeText="Đóng lại" />
                <EditPostTypeModal heading="Hộp thoại sửa mục bài viết"
                    chooseText="Sửa mục bài viết"
                    closeText="Đóng lại" />
            </div>
        );
    }
}
export default PostTypes;