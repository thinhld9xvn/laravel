import React, { Component } from 'react';
import DataTable from 'react-data-table-component';
import memoize from 'memoize-one';
import { css } from "@emotion/core";
import { connect } from 'react-redux';
import {onClick_zoomIn, onClick_zoomOut, 
        onClick_zoomReset, onClick_toggleTabFullScreen} from 'handleEvents/usersListHandleEvents';
import {onChange_handleSelectedRows,
        onClick_authorFilter,
        onClick_clearFilter,
        onClick_cleartxtSearchFilter,
        onClick_removePermantlyPost,
        onClick_handleFilter,
        onClick_refreshPostsListData,
        onClick_restorePost,
        onClick_removePermantlyAllPostsListData,
        onClick_restoreAllPostsListData,
        onKeyDown_txtSearchChanged,
        onChange_handlePerRowsChange,
        onChange_handlePageChange,
        onSort_handleSort,
        onChange_txtSearchChanged} from 'handleEvents/postTypesHandleEvents';
import {addComponentInst} from 'utils/componentUtils';
import 'css/tabsList.css';
import { COMPONENT_INST } from 'constants/componentConstants';
import {EmptyData} from 'templates/emptyData';
import { handleGetDate } from 'utils/dateTime/handleGetDate';
import CategoriesList from 'templates/postsList/categories-list';
import {isEqual, cloneDeep} from 'lodash';
import ToolbarButtons from 'templates/postsList/toolbar-buttons';
import { handleSetFilterChanged } from 'handleEvents/postTypes/filter/handleSetFilterChanged';
import SweetLoading from 'templates/sweetLoading';
import DeactiveActionButtons from 'templates/postsList/deactive-action-buttons';
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;
const columns = memoize(columnsData => [
    {
        name: '',
        maxWidth: '80px',
        cell: row => <DeactiveActionButtons inst={columnsData.inst} row={row} actionData={columnsData.actionData} />
    },
    {
        name: 'Tên bài viết',
        selector: 'post_title',
        sortable: true,
        cell: row => <div className="post_title">{row.post_title}</div>
    },
    {
        name: 'Tác giả',
        selector: 'display_name',
        cell: row => <div className="post_author">
                        <a onClick={onClick_authorFilter.bind(columnsData.inst, row.display_name, row.post_author)}
                           href="#">{row.display_name}</a>
                     </div>
    },
    {
        name: 'Ngày đăng',
        sortable: true,
        selector: 'post_date',
        cell: row => <>{`${handleGetDate(row.post_date.date)} ${row.post_date.day}/${row.post_date.month}/${row.post_date.year} ${row.post_date.time}`}</>
    },
    {
        name: 'Danh mục',
        selector: 'post_categories',
        cell: row => <CategoriesList row={row} inst={columnsData.inst} />
    },
    {
        name: 'Ảnh đại diện',
        selector: 'post_thumbnail',
        cell: row => <img width="50" src={row.post_thumbnail.src || null} alt="" />
    }
]);
class DeactivePostsListTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filteredItems: [],
            data: [],   
            activeUsersFilterList : [],
            categoriesList : [],
            isFullScreen: false,
            rowsIdSelected: [],
            post_type : 'post',
            tax : 'categories',
            zoom: 1,
            loadingData: true,
            totalRows : 0,
            numPerPage : 10,
            order : 'id',
            orderBy : 'desc', 
            paged : 1,
            id : 'trash'
        };
        this.s = '';
        this._filteredItems = [];
        this.authorFilterInst = null;
        this.postModifiedFilterInst = null;
        this.categoryFilterInst = null;
        this.authorFilterSelected = '-1';
        this.postModifiedFilterSelected = '-1';
        this.categoryFilterSelected = '-1';        
        this.isFilterChanged = true;
        this.rowsIdSelectedRef = [];
        this.categoriesDataCache = null;
    }
    componentDidMount() {
        addComponentInst({
            name: COMPONENT_INST.DEACTIVE_POSTS_LIST_TAB,
            instance: this
        });
    } 
    shouldComponentUpdate(nextProps, nextState) {
        if ( !isEqual(this.state, nextState) ) return true;
        if ( !isEqual(this.props, nextProps) ) return true;
        return false;
    }
    componentDidUpdate() {        
        addComponentInst({
            name: COMPONENT_INST.DEACTIVE_POSTS_LIST_TAB,
            instance: this
        });
        handleSetFilterChanged.call(this, false);
    }   
    render() {
        const { loadingData, filteredItems, zoom, isFullScreen, activeUsersFilterList, totalRows } = this.state,
              { userAvatarTimeStamp } = this.props;
        const columnsData = {
            userAvatarTimeStamp,
            inst : this,
            actionData: {
                onClick_removePermantlyPost: onClick_removePermantlyPost.bind(this),
                onClick_restorePost: onClick_restorePost.bind(this)
            }
        };
        const toolbarData = {
            onClick_zoomIn: onClick_zoomIn.bind(this),
            onClick_zoomOut: onClick_zoomOut.bind(this),
            onClick_zoomReset: onClick_zoomReset.bind(this),
            onClick_toggleTabFullScreen: onClick_toggleTabFullScreen.bind(this),
            onClick_refreshPostsListData: onClick_refreshPostsListData.bind(this),
            onClick_removePermantlyAllPostsListData: onClick_removePermantlyAllPostsListData.bind(this),
            onClick_restoreAllPostsListData: onClick_restoreAllPostsListData.bind(this),
            onClick_handleFilter :  onClick_handleFilter.bind(this),
            onClick_clearFilter : onClick_clearFilter.bind(this),
            onKeyDown_txtSearchChanged: onKeyDown_txtSearchChanged.bind(this),
            onChange_txtSearchChanged : onChange_txtSearchChanged.bind(this),
            onClick_cleartxtSearchFilter: onClick_cleartxtSearchFilter.bind(this),
            activeUsersFilterList : cloneDeep(activeUsersFilterList)
        };
        return (
            <>
                <div className={"myTabContainer ".concat(isFullScreen ? 'fullscreen' : '')}>
                    <div className="mainHeader">                    
                        {!loadingData ? 
                            <ToolbarButtons inst={this} 
                                            tabId="deactive"
                                            toolbarData={toolbarData}
                                            s={this.s} /> : 
                            <SweetLoading loading={loadingData} />}
                        <h4 className="headingTable">
                            Danh sách bài viết đã xóa
                        </h4>
                    </div>
                    <div className={"mainContent dtPostsListContainer ".concat(loadingData ? 'disabled' : '')}
                         style={{ paddingTop: 0 }}>
                        {!loadingData ? (
                            <div style={{ zoom }}>                                
                                <DataTable
                                    title="Danh sách bài viết"
                                    columns={columns(columnsData)}
                                    data={filteredItems}
                                    className="dtAllUsers dtPostsList dtAllDeActivePostsList"
                                    noDataComponent={EmptyData}
                                    noHeader={true}
                                    onSelectedRowsChange={onChange_handleSelectedRows.bind(this)}   
                                    clearSelectedRows={this.rowsIdSelectedRef.length === 0}
                                    selectableRows
                                    highlightOnHover                           
                                    pagination
                                    sortServer
                                    paginationServer
                                    paginationTotalRows={totalRows}
                                    onChangeRowsPerPage={onChange_handlePerRowsChange.bind(this)}
                                    onChangePage={onChange_handlePageChange.bind(this)}
                                    onSort={onSort_handleSort.bind(this)} />
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
        userAvatarTimeStamp : state.userAvatarReducer.avatarTimeStamp
    }
}
const mapDispatchToProps = dispatch => {
    return {
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(DeactivePostsListTab);