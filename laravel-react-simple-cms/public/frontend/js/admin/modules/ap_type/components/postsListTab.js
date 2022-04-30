import React, { Component } from 'react';
import DataTable from 'react-data-table-component';
import memoize from 'memoize-one';
import { css } from "@emotion/core";
import { connect } from 'react-redux';
import { isPagePostType, performPostsListTabMountHook } from 'utils/postTypesUtils';
import {
    onClick_zoomIn, onClick_zoomOut,
    onClick_zoomReset, onClick_toggleTabFullScreen
} from 'handleEvents/usersListHandleEvents';
import {
    onClick_newPost,
    onClick_editPost,
    onClick_trashPost,
    onClick_refreshPostsListData,
    onClick_trashAllPostsListData,
    onClick_authorFilter,
    onClick_handleFilter,
    onClick_clearFilter,
    onKeyDown_txtSearchChanged,
    onChange_txtSearchChanged,
    onClick_cleartxtSearchFilter,
    onChange_handleSelectedRows,
    onMouseUp_handleSelectRow,
    onChange_handlePerRowsChange,
    onChange_handlePageChange,
    onSort_handleSort
} from 'handleEvents/postTypesHandleEvents';
import { addComponentInst } from 'utils/componentUtils';
import 'css/tabsList.css';
import '../css/style.css';
import {cloneDeep, isEqual} from 'lodash';
import { COMPONENT_INST } from 'constants/componentConstants';
import { handleSetFilterChanged } from 'handleEvents/postTypes/filter/handleSetFilterChanged';
import ActionButtons from 'templates/postsList/action-buttons';
import CategoriesList from 'templates/postsList/categories-list';
import ToolbarButtons from 'templates/postsList/toolbar-buttons';
import {EmptyData} from 'templates/emptyData';
import SweetLoading from 'templates/sweetLoading';
import { handleGetDate } from 'utils/dateTime/handleGetDate';
import { isUndefined } from 'utils/libUtils';
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;
const columns = memoize(columnsData => [
    {
        name: '',
        maxWidth: '80px',
        cell: row => <ActionButtons inst={columnsData.inst} row={row} actionData={columnsData.actionData} />
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
        selector: 'post_date',
        sortable: true,
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
const columnsPg = memoize(columnsData => [
    {
        name: '',
        maxWidth: '80px',
        cell: row => <ActionButtons inst={columnsData.inst} row={row} actionData={columnsData.actionData} />
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
        selector: 'post_date',
        cell: row => <>{`${handleGetDate(row.post_date.date)} ${row.post_date.day}/${row.post_date.month}/${row.post_date.year} ${row.post_date.time}`}</>
    },
    {
        name: 'Ảnh đại diện',
        selector: 'post_thumbnail',
        cell: row => <img width="50" src={row.post_thumbnail.src || null} alt="" />
    }
]);
class PostsListTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filteredItems: [],
            data: [],   
            activeUsersFilterList : [],
            categoriesList : [],
            isFullScreen: false,
            rowsIdSelected: [],
            zoom: 1,
            post_type : !isUndefined(props.post_type) ? props.post_type : 'post',
            tax : 'categories',
            showFilterCategoriesBox : true,
            loadingData: true,
            totalRows : 0,
            numPerPage : 10,
            order : 'id',
            orderBy : 'desc',
            paged : 1,
            embbed : false,
            id : 'public'
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
        this.markupRowId = 0;
        this.onMouseUp_handleSelectRow = onMouseUp_handleSelectRow.bind(this);
    }
    async componentDidMount() {
        addComponentInst({
            name: COMPONENT_INST.POSTS_LIST_TAB,
            instance: this
        });
        performPostsListTabMountHook.call(this); 
        try {
            document.querySelectorAll('.tabLists .tab-pane .dtPostsListContainer')
                    .forEach(elem => elem.addEventListener('mouseup', this.onMouseUp_handleSelectRow));
        } catch {

        }
    }
    shouldComponentUpdate(nextProps, nextState) {
        if ( !isEqual(this.state, nextState) ) return true;
        if ( !isEqual(this.props, nextProps) ) return true;        
        return false;
    }
    componentDidUpdate(prevProps, prevState) {
        const {post_type : post_typeState} = this.state;
        const {post_type} = this.props;
        if ( post_type && !isEqual(post_type, post_typeState) ) {
            this.setState({
                post_type : cloneDeep(post_type)
            });
        }
        addComponentInst({
            name: COMPONENT_INST.POSTS_LIST_TAB,
            instance: this
        });
        handleSetFilterChanged.call(this, false);
    }
    componentWillUnmount() {
        try {
            document.querySelectorAll('.tabLists .tab-pane .dtPostsListContainer')
                    .forEach(elem => elem.removeEventListener('mouseup', this.onMouseUp_handleSelectRow));
        } catch {}
    }
    render() {
        const { loadingData, filteredItems, zoom, isFullScreen, activeUsersFilterList, totalRows, post_type } = this.state,
              { userAvatarTimeStamp } = this.props;
        const columnsData = {
            userAvatarTimeStamp,
            inst : this,
            actionData: {
                onClick_editPost: onClick_editPost.bind(this),
                onClick_trashPost: onClick_trashPost.bind(this)
            }
        };
        const toolbarData = {
            onClick_zoomIn: onClick_zoomIn.bind(this),
            onClick_zoomOut: onClick_zoomOut.bind(this),
            onClick_zoomReset: onClick_zoomReset.bind(this),
            onClick_toggleTabFullScreen: onClick_toggleTabFullScreen.bind(this),
            onClick_refreshPostsListData: onClick_refreshPostsListData.bind(this),
            onClick_trashAllPostsListData: onClick_trashAllPostsListData.bind(this),
            onClick_handleFilter :  onClick_handleFilter.bind(this),
            onClick_clearFilter : onClick_clearFilter.bind(this),
            onKeyDown_txtSearchChanged: onKeyDown_txtSearchChanged.bind(this),
            onChange_txtSearchChanged : onChange_txtSearchChanged.bind(this),
            onClick_cleartxtSearchFilter: onClick_cleartxtSearchFilter.bind(this),
            onClick_newPost : onClick_newPost.bind(this),
            activeUsersFilterList : cloneDeep(activeUsersFilterList)
        };
        return (
            <>
                <div className={"myTabContainer ".concat(isFullScreen ? 'fullscreen' : '')}>
                    <div className="mainHeader">                    
                        {!loadingData ? 
                            <ToolbarButtons inst={this}
                                            toolbarData={toolbarData}
                                            s = {this.s} /> : 
                            <SweetLoading loading={loadingData} />}
                        <h4 className="headingTable">
                            Danh sách bài viết hiện có
                        </h4>
                    </div>
                    <div className={"mainContent dtPostsListContainer ".concat(loadingData ? 'disabled' : '')}
                         style={{ paddingTop: 0 }}>
                        {!loadingData ? (
                            <div style={{ zoom }}>       
                                <DataTable
                                    title="Danh sách bài viết"
                                    columns={!isPagePostType(post_type) ? columns(columnsData) : columnsPg(columnsData)}
                                    data={filteredItems}
                                    className="dtAllUsers dtPostsList dtAllActivePostsList"
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
        userAvatarTimeStamp : state.userAvatarReducer.avatarTimeStamp,
    }
}
const mapDispatchToProps = dispatch => {
    return {
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(PostsListTab);