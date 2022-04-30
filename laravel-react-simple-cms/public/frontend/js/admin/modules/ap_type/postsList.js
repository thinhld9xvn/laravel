import React, { Component } from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import PostsListTab from './components/postsListTab';
import {tabListsInitialize, tabListsDestroy} from 'utils/tabListsUtils';
import { COMPONENT_INST } from 'constants/componentConstants';
import { saveActiveComponentName } from 'utils/componentUtils';
import DeactivePostsListTab from './components/deactivePostsListTab';
import { onClick_selectTab } from 'handleEvents/tabListsHandleEvents';
import EditPostModal from './modals/editPostModal';
class PostsList extends Component {
    componentDidMount() {
        tabListsInitialize();
        saveActiveComponentName(COMPONENT_INST.POSTS_LIST_LAYOUT);
    }
    componentWillUnmount() {
        tabListsDestroy();
    }
    render() {
        return (
            <>
                <div className="w100p">
                    <div className="tabLists w100p">
                        <Tabs defaultActiveKey="active-posts-list-tab"
                            transition={false}
                            id="posts-list-tab"
                            onSelect={onClick_selectTab.bind(this)}>
                            <Tab eventKey="active-posts-list-tab" title="Danh sách bài viết">
                                <PostsListTab />
                            </Tab>
                            <Tab eventKey="deactive-posts-list-tab" title="Thùng rác">
                                <DeactivePostsListTab />
                            </Tab>
                        </Tabs>
                    </div>     
                </div>
                <EditPostModal embbed = {true}
                               heading = "Chỉnh sửa bài viết"
                               closeText = "Đóng lại" />
            </>
        );
    }
}
export default PostsList;