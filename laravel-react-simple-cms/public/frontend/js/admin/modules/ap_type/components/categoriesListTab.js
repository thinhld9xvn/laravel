import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addComponentInst } from 'utils/componentUtils';
import CustomTreeListView from '../../custom-select/customTreeListView';
import { onClick_handleChooseCategoryNodeItem, 
            onKeyDown_handleFilter, 
            onClick_handleOpenModalCategoryNodeItem, 
            onClick_handleRemoveCategoryNodeItem, 
            onClick_refreshCategoriesListData, 
            onClick_saveCategoriesListData, 
            onClick_importDefSampleData,
            onDblClick_handleChooseCategoryNodeItem, 
                    onSort_handleSortNodeItem, 
                    onClick_clearTxtSearchFilter} from 'handleEvents/categoriesHandleEvents'
import 'css/tabsList.css';
import '../css/style.css';
import {
    onClick_zoomIn, onClick_zoomOut,
    onClick_zoomReset, onClick_toggleTabFullScreen
} from 'handleEvents/usersListHandleEvents';
import { EMPTY_PARENT_CATEGORY } from 'constants/categoryConstants'
import CategoryNodeDetails from 'templates/ap_type/categoryNodeDetails';
import EmptyCategoryNodeDetails from 'templates/ap_type/emptyCategoryNodeDetails';
import { COMPONENT_INST } from 'constants/componentConstants';
import { cloneDeep, isEqual } from 'lodash';
import ToolbarCategoryButtons from 'templates/toolbarCategoryButtons';
import SweetLoading from 'templates/sweetLoading';
import { handleDidMountHook } from 'utils/categoryPostTypes/handleDidMountHook';
class CategoriesListTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            protectedCategoriesData : [], // mảng dữ liệu này chỉ reset khi nhấn nút lưu
            categoriesData : [],
            originCategoriesData : [],
            rmIds : [],
            categoryNodeSelectedValue : EMPTY_PARENT_CATEGORY.value,
            categoryNodeActive : null,
            zoom: 1,
            s : '',
            post_type : 'post',
            tax : 'categories',
            isFullScreen: false,
            loadingData : true
        };        
        this.categoriesListInst = null;
        this.categoriesListSelected = EMPTY_PARENT_CATEGORY.value;
        this._rmIds = [];
    }
    async componentDidMount() {
        await handleDidMountHook.call(this);
    }
    componentDidUpdate(nextProps, nextState) {
        const { activeCategoriesLists, activeCategoryNode } = this.props;
        const { s } = this.state;
        if ( !isEqual(activeCategoriesLists, nextProps.activeCategoriesLists) ) {
            if ( s ) { // đang trong chế độ tìm kiếm
                this.setState({
                    originCategoriesData : cloneDeep(activeCategoriesLists)
                });
            }
            else {
                this.setState({
                    categoriesData : cloneDeep(activeCategoriesLists),
                    originCategoriesData : cloneDeep(activeCategoriesLists)
                });
            }
        }
        if ( !isEqual(activeCategoryNode, nextProps.activeCategoryNode) ) {
            this.setState({
                categoryNodeActive : cloneDeep(activeCategoryNode)
            });
        }
        addComponentInst({
            name: COMPONENT_INST.CATEGORIES_TAB,
            instance: this
        });        
    }
    render() {
        const { categoriesData, categoryNodeSelectedValue, categoryNodeActive, 
                    isFullScreen, loadingData, zoom, s } = this.state;
        const toolbarData = {
            onClick_zoomIn: onClick_zoomIn.bind(this),
            onClick_zoomOut: onClick_zoomOut.bind(this),
            onClick_zoomReset: onClick_zoomReset.bind(this),
            onClick_toggleTabFullScreen: onClick_toggleTabFullScreen.bind(this),
            onClick_handleOpenModalCategoryNodeItem : onClick_handleOpenModalCategoryNodeItem.bind(this),
            onClick_handleRemoveCategoryNodeItem : onClick_handleRemoveCategoryNodeItem.bind(this, categoryNodeActive ? categoryNodeActive.id : null),
            onClick_saveCategoriesListData : onClick_saveCategoriesListData.bind(this),
            onClick_importDefSampleData: onClick_importDefSampleData.bind(this),
            onClick_refreshCategoriesListData : onClick_refreshCategoriesListData.bind(this),
            onKeyDown_txtSearchChanged: onKeyDown_handleFilter.bind(this),
            onClick_clearTxtSearchFilter: onClick_clearTxtSearchFilter.bind(this)
        };
        return (
            <>
                <div className={"myTabContainer ".concat(isFullScreen ? ' fullscreen' : '')}>
                    <div className={"mainHeader ".concat(loadingData ? 'disabled' : '')}>    
                        {!loadingData ? (
                            <ToolbarCategoryButtons toolbarData={toolbarData}
                                                    s = {s} />
                        ) : <SweetLoading loading={loadingData} />}
                    </div>
                    <div className={"mainContent ".concat(loadingData ? 'disabled' : '')}>
                        {!loadingData ? (
                            <div className="grid-two-columns h100p-ms"  style={{ zoom }}>
                                <div className="element">
                                    <CustomTreeListView placeholder="--- Xin mời chọn một danh mục ---"
                                                        parent={this}
                                                        componentInst = "categoriesListInst"
                                                        variableReturn = "categoriesListSelected"
                                                        data={categoriesData} 
                                                        handleChooseItemCallback={onClick_handleChooseCategoryNodeItem.bind(this)}
                                                        handleDblChooseItemCallback={onDblClick_handleChooseCategoryNodeItem.bind(this)}
                                                        handleSortItemCallback={onSort_handleSortNodeItem.bind(this)}
                                                        />
                                </div>
                                <div className="element node-element">
                                    <h4 className="headingNodeElement">Thông tin danh mục</h4>
                                    {categoryNodeSelectedValue !== EMPTY_PARENT_CATEGORY.value && 
                                        categoryNodeActive ? (
                                            <CategoryNodeDetails inst={this}
                                                                data = {categoryNodeActive} />
                                    ) : <EmptyCategoryNodeDetails inst={this} /> }
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
        activeCategoriesLists : state.categoryReducer.activeCategoriesLists,
        activeCategoryNode : state.categoryReducer.activeCategoryNode
    }
}
const mapDispatchToProps = dispatch => {
    return {
        updateActiveCategoriesLists : (payload) => {
            dispatch({
                reducer : 'categoryReducer',
                type : "UPDATE_ACTIVE_CATEGORIES_LISTS",
                payload : payload
            });
        },
        updateActiveCategoryNode : (payload) => {
            dispatch({
                reducer : 'categoryReducer',
                type : "UPDATE_ACTIVE_CATEGORY_NODE",
                payload : payload
            });
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CategoriesListTab);