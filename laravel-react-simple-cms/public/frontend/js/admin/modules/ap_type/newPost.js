import React, { Component } from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import PostLayout from './layout/postLayout';
import MediaEmbbedModal from 'modules/filemanager/modals/mediaEmbbedModal';
import * as tabListsEvents from 'utils/tabListsUtils';
import 'css/tabsList.css';
import './css/style.css';
import { COMPONENT_INST } from '../../constants/componentConstants';
import CategoryEmbbedModal from './modals/categoryEmbbedModal';
import TagEmbbedModal from './modals/tagEmbbedModal';
import { saveActiveComponentName } from 'utils/componentUtils';
import { FORM_IDS } from 'constants/formConstants';
import { POST_ACTIONS } from 'constants/globalConstants';
class NewPost extends Component {
    componentDidMount() {
        tabListsEvents.initWindowResize();
        window.addEventListener('resize', tabListsEvents.windowResizeEvent);
        document.addEventListener('fullscreenchange', tabListsEvents.windowResizeEvent);
        document.addEventListener('keydown', tabListsEvents.onKeyDownShortcut);    
        saveActiveComponentName(COMPONENT_INST.NEW_POST_LAYOUT);
    }
    componentWillUnmount() {
        tabListsEvents.resetWindowResize();
        window.removeEventListener('resize', tabListsEvents.windowResizeEvent);
        document.removeEventListener('fullscreenchange', tabListsEvents.windowResizeEvent);
        document.removeEventListener('keydown', tabListsEvents.onKeyDownShortcut);
    }
    onClick_selectTab(k, e) {
        if ( ! e.currentTarget.classList.contains('active') ) {
            setTimeout(() => {
                tabListsEvents.windowResizeEvent();
            }, 100);
        }
    }
    render() {
        return (
            <div className="w100p">
                <div className="tabLists w100p">
                    <Tabs defaultActiveKey="active-new-post-tab"
                        transition={false}
                        id="new-post-tab"
                        onSelect={this.onClick_selectTab.bind(this)}>
                        <Tab eventKey="active-new-post-tab" title="????ng b??i vi???t m???i">
                            <PostLayout formid={FORM_IDS.PUBLISH_POST}
                                        name={COMPONENT_INST.NEW_POST_LAYOUT}
                                        action={POST_ACTIONS.new} />
                        </Tab>
                    </Tabs>
                </div>              
                <CategoryEmbbedModal heading = "H???p tho???i danh m???c"
                                     closeText = "????ng l???i"
                                     loadMediaEmbbed = {false} />
                <TagEmbbedModal heading = "H???p tho???i th???"
                                ChooseText = "?????ng ??"
                                loadMediaEmbbed = {false} />  
                <MediaEmbbedModal heading="Th?? vi???n ???nh"
                                chooseText="Ch???n ?????i t?????ng"
                                closeText="????ng l???i" />
            </div>            
        );
    }
}
export default NewPost;