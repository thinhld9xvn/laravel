import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addComponentInst } from 'utils/componentUtils';
import CustomTreeListView from '../../custom-select/customTreeListView';
import { onClick_handleChooseTagNodeItem, 
            onKeyDown_handleFilter, 
            onClick_handleOpenModalTagNodeItem, 
            onClick_handleRemoveTagNodeItem, 
            onClick_refreshTagsListData, 
            onClick_saveTagsListData, 
            onDblClick_handleChooseTagNodeItem, 
                    onClick_importDefSampleData, 
                    onClick_clearTxtSearchFilter} from 'handleEvents/tagsHandleEvents'
import 'css/tabsList.css';
import '../css/style.css';
import {
    onClick_zoomIn, onClick_zoomOut,
    onClick_zoomReset, onClick_toggleTabFullScreen
} from 'handleEvents/usersListHandleEvents';
import { EMPTY_PARENT_CATEGORY } from 'constants/categoryConstants'
import TagNodeDetails from 'templates/ap_type/tagNodeDetails';
import EmptyTagNodeDetails from 'templates/ap_type/emptyTagNodeDetails';
import { COMPONENT_INST } from 'constants/componentConstants';
import { cloneDeep, isEqual } from 'lodash';
import ToolbarTagButtons from 'templates/toolbarTagButtons';
import SweetLoading from 'templates/sweetLoading';
import { handleDidMountHook } from 'utils/tagPostTypes/handleDidMountHook';
class TagsListTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            protectedTagsData : [], // mảng dữ liệu này chỉ reset khi nhấn nút lưu
            tagsData : [],
            originTagsData : [],
            rmIds : [],
            tagNodeSelectedValue : EMPTY_PARENT_CATEGORY.value,
            tagNodeActive : null,
            zoom: 1,
            s : '',
            isFullScreen: false,
            showCheckboxes : false,
            loadingData : true
        };        
        this.tagsListInst = null;
        this.tagsListSelected = EMPTY_PARENT_CATEGORY.value;
        this.tagsChosen = [];
    }
    async componentDidMount() {
        await handleDidMountHook.call(this);
    }
    componentDidUpdate(nextProps, nextState) {
        const { activeTagsLists, activeTagNode, showCheckboxes } = this.props;
        const { s, showCheckboxes : showCheckboxesState } = this.state;
        if ( !isEqual(activeTagsLists, nextProps.activeTagsLists) ) {
            if ( s ) { // đang trong chế độ tìm kiếm
                this.setState({
                    originTagsData : cloneDeep(activeTagsLists)
                });
            }
            else {
                this.setState({
                    tagsData : cloneDeep(activeTagsLists),
                    originTagsData : cloneDeep(activeTagsLists)
                });
            }
        }
        if ( !isEqual(activeTagNode, nextProps.activeTagNode) ) {
            this.setState({
                tagNodeActive : cloneDeep(activeTagNode)
            });
        }
        if ( !isEqual(showCheckboxesState, showCheckboxes) ) {
            this.setState({
                showCheckboxes
            });
        }
        addComponentInst({
            name: COMPONENT_INST.TAGS_TAB,
            instance: this
        });        
    }
    render() {
        const { tagsData, tagNodeSelectedValue, tagNodeActive, 
                    isFullScreen, loadingData, zoom, s, showCheckboxes } = this.state;
        const toolbarData = {
            onClick_zoomIn: onClick_zoomIn.bind(this),
            onClick_zoomOut: onClick_zoomOut.bind(this),
            onClick_zoomReset: onClick_zoomReset.bind(this),
            onClick_toggleTabFullScreen: onClick_toggleTabFullScreen.bind(this),
            onClick_handleOpenModalTagNodeItem : onClick_handleOpenModalTagNodeItem.bind(this),
            onClick_handleRemoveTagNodeItem : onClick_handleRemoveTagNodeItem.bind(this, tagNodeActive ? tagNodeActive.id : null),
            onClick_saveTagsListData : onClick_saveTagsListData.bind(this),
            onClick_importDefSampleData : onClick_importDefSampleData.bind(this),
            onClick_refreshTagsListData : onClick_refreshTagsListData.bind(this),
            onKeyDown_txtSearchChanged: onKeyDown_handleFilter.bind(this),
            onClick_clearTxtSearchFilter: onClick_clearTxtSearchFilter.bind(this)
        };
        return (
            <>
                <div className={"myTabContainer ".concat(isFullScreen ? ' fullscreen' : '')}>
                    <div className={"mainHeader ".concat(loadingData ? 'disabled' : '')}>    
                        {!loadingData ? (
                            <ToolbarTagButtons toolbarData={toolbarData}
                                                    s = {s} />
                        ) : <SweetLoading loading={loadingData} />}
                    </div>
                    <div className={"mainContent ".concat(loadingData ? 'disabled' : '')}>
                        {!loadingData ? (
                            <div className="grid-two-columns h100p-ms"  style={{ zoom }}>
                                <div className="element">
                                    <CustomTreeListView placeholder="--- Xin mời chọn một thẻ ---"
                                                        parent={this}
                                                        componentInst = "tagsListInst"
                                                        variableReturn = "tagsListSelected"
                                                        variableChosenCheckboxesReturn = "tagsChosen"
                                                        data={tagsData}
                                                        showCheckboxes={showCheckboxes}                                                        
                                                        draggable={false}
                                                        handleChooseItemCallback={onClick_handleChooseTagNodeItem.bind(this)}
                                                        handleDblChooseItemCallback={onDblClick_handleChooseTagNodeItem.bind(this)}
                                                        handleSortItemCallback={null}
                                                        />
                                </div>
                                <div className="element node-element">
                                    <h4 className="headingNodeElement">Thông tin thẻ</h4>
                                    {tagNodeSelectedValue !== EMPTY_PARENT_CATEGORY.value && 
                                        tagNodeActive ? (
                                            <TagNodeDetails inst={this}
                                                            data = {tagNodeActive} />
                                    ) : <EmptyTagNodeDetails inst={this} /> }
                                </div>
                            </div>
                        ) : null}
                    </div>
                    <div className="mainFooter"></div>
                </div>
            </>
        );
    }
}
const mapStateToProps = state => {
    return {
        activeTagsLists : state.tagReducer.activeTagsLists,
        activeTagNode : state.tagReducer.activeTagNode
    }
}
const mapDispatchToProps = dispatch => {
    return {
        updateActiveTagsLists : (payload) => {
            dispatch({
                reducer : 'tagReducer',
                type : "UPDATE_ACTIVE_TAGS_LISTS",
                payload : payload
            });
        },
        updateActiveTagNode : (payload) => {
            dispatch({
                reducer : 'tagReducer',
                type : "UPDATE_ACTIVE_TAG_NODE",
                payload : payload
            });
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(TagsListTab);