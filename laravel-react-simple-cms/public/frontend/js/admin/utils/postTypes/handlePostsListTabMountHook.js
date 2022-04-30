import { COMPONENT_INST } from 'constants/componentConstants';
import { POST_STATUS, POST_TYPE_ENTRIES_MENU } from 'constants/globalConstants';
import { handleGetCategoriesListData } from 'handleEvents/categories/handleGetCategoriesListData';
import { handleSetFilterChanged } from 'handleEvents/postTypes/filter/handleSetFilterChanged';
import { cloneDeep } from 'lodash';
import { removeNonExistCategories, setConvertCategoriesListPostData, setDeSelectCategoryNode } from 'utils/categoryPostTypesUtils';
import { getComponentInst } from 'utils/componentUtils';
import { closeLoadingOverlay, showLoadingOverlay } from 'utils/libUtils';
import { getAllActiveUsers, getUsersListFilterMilesData } from 'utils/membershipUtils';
import { isPagePostType } from 'utils/postTypesUtils';
import { initWindowResize } from 'utils/tabListsUtils';
import { getParameterFromUrl } from 'utils/urlUtils';
import { handleGetPostsList } from './handleGetPostsList';
function resetInstProps(callback) {
    this._filteredItems = [];
    this.authorFilterInst = null;
    this.postModifiedFilterInst = null;
    this.categoryFilterInst = null;
    this.authorFilterSelected = '-1';
    this.postModifiedFilterSelected = '-1';
    this.categoryFilterSelected = '-1';        
    this.isFilterChanged = true;
    this.setState({
        filteredItems: [],
        data: [],   
        activeUsersFilterList : [],
        categoriesList : [],        
        rowsIdSelected: [],
        zoom: 1,
        s : '',
        order : 'id',
        orderBy : 'desc', 
        paged : 1,
        totalRows : 0,
        numPerPage : 10,
        isFullScreen: false,
        loadingData: true
    }, () => {
        initWindowResize();
        callback && callback();
    });
}
export function setPostsList(data) {
    const postsList = data.map(post => {
        const {post_categories} = post;
        removeNonExistCategories(this.categoriesDataCache, post_categories);
        return post;
    });        
    handleSetFilterChanged.call(this, true);
    this.setState({
        data : cloneDeep(postsList),
        filteredItems : cloneDeep(postsList)
    });          
}
export async function fetchPostsList(params) {
    const {post_type, 
            paged, 
            numPerPage, 
            post_status, 
            order, 
            orderBy, 
            filtered_params, callback} = params;
    showLoadingOverlay();
    const {data : postsList, count} = (await handleGetPostsList.call(this, {post_type, post_status, paged, numPerPage, order, orderBy, filtered_params})).data.data;
    setPostsList.call(this, postsList);
    this.setState({
        totalRows : count
    }, () => {
        closeLoadingOverlay();
        callback && callback(postsList);
    });
}
async function perform(callback, reloadCatList = false) {
    let _categoriesData = [];
    const slugPostType = getParameterFromUrl(window.location.href, 'slug');
    const taxSlug = getParameterFromUrl(window.location.href, 'tax');
    const inst = getComponentInst(COMPONENT_INST.POSTS_LIST_TAB),
          dePostInst = getComponentInst(COMPONENT_INST.DEACTIVE_POSTS_LIST_TAB),    
    setUserFilterPostsList = (instance, data) => {
        const activeUsersFilterList = getUsersListFilterMilesData(data);
        instance.setState({
            activeUsersFilterList : cloneDeep(activeUsersFilterList)
        });          
    },
    performCallback = async () => {
        //
        resetInstProps.call(inst, async () => {
            resetInstProps.call(dePostInst);
            const {post_type, tax, paged, numPerPage, order, orderBy} = inst.state;
            let categoriesData = [];
            //
            if ( !isPagePostType(slugPostType) ) {
                if ( !inst.categoriesDataCache ) {
                    inst.categoriesDataCache = (await handleGetCategoriesListData(post_type, tax)).data.data;
                    dePostInst.categoriesDataCache = cloneDeep(inst.categoriesDataCache);
                }          
                _categoriesData = cloneDeep(inst.categoriesDataCache);
                categoriesData = cloneDeep(inst.categoriesDataCache);
                setConvertCategoriesListPostData(categoriesData);
                setDeSelectCategoryNode(categoriesData);
                categoriesData.splice(0, 0, {
                    name: 'Tất cả danh mục',
                    value: '-1',
                    selected: true
                });
            }
            const {public : publicPostsList, trash : trashPostsList} = (await handleGetPostsList.call(inst, {post_type, post_status : 'all', paged, numPerPage, order, orderBy, filtered_params : ''})).data.data;
            if ( !inst.activeUsersListCache ) {
                inst.activeUsersListCache = (await getAllActiveUsers.call(inst)).data.data;
            }
            setPostsList.call(inst, publicPostsList.data);
            setPostsList.call(dePostInst, trashPostsList.data);
            //
            setUserFilterPostsList(inst, inst.activeUsersListCache);
            setUserFilterPostsList(dePostInst, inst.activeUsersListCache);
            inst.setState({
                categoriesList : cloneDeep(categoriesData),
                showFilterCategoriesBox : !isPagePostType(slugPostType),
                totalRows : publicPostsList.count,
                loadingData: false
            }, () => {
                dePostInst.setState({
                    categoriesList : cloneDeep(categoriesData),
                    showFilterCategoriesBox : !isPagePostType(slugPostType),
                    totalRows : trashPostsList.count,
                    loadingData: false
                }, () => {
                    setTimeout(() => {
                        initWindowResize();
                    }, 200);
                });
                if ( callback ) {
                    callback();
                }
            });
        });
        //
    },
    perform = async () => {
        await performCallback();
    }
    if ( slugPostType ) {
        inst.setState({
            post_type : slugPostType,
            tax : taxSlug || 'categories'
        }, async () => {
            dePostInst.setState({
                post_type : slugPostType,
                tax : taxSlug || 'categories'
            });
            await perform();
        });        
        return;
    }
    await perform();
}
export async function handlePostsListTabMountHook(callback, reloadCatList = false) {
    setTimeout(async () => {
        await perform(callback, reloadCatList);
    }, 200);
}
