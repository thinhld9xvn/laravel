import { EMPTY_PARENT_CATEGORY } from 'constants/categoryConstants';
import { COMPONENT_INST } from 'constants/componentConstants';
import { handleGetCategoriesListData } from 'handleEvents/categories/handleGetCategoriesListData';
import { cloneDeep } from 'lodash';
import { setDeSelectCategoryNode } from 'utils/categoryPostTypesUtils';
import { getComponentInst } from 'utils/componentUtils';
import { getParameterFromUrl } from 'utils/urlUtils';
import { isPagePostType } from 'utils/postTypesUtils';
async function performCallback(post_type, tax, callback) {
    const {updateActiveCategoriesLists, updateActiveCategoryNode} = this.props;
    this.setState({
        rmIds : [],
        categoryNodeSelectedValue : EMPTY_PARENT_CATEGORY.value,
        categoryNodeActive : null,
        zoom: 1,
        isFullScreen: false,
        categoriesData : [],
        originCategoriesData : [],
        protectedCategoriesData : [],
        loadingData : true
    });
    updateActiveCategoryNode(null);
    updateActiveCategoriesLists([]);
    this.categoriesListInst = null;
    this.categoriesListSelected = EMPTY_PARENT_CATEGORY.value;
    const results = await handleGetCategoriesListData(post_type, tax);
    if ( !results ) {
        return;
    }
    const {data : res} = results;
    const {data} = res;
    this.setState({
        s : '',
        categoriesData : cloneDeep(data),
        originCategoriesData : cloneDeep(data),
        protectedCategoriesData : cloneDeep(data)
    });    
    updateActiveCategoriesLists(cloneDeep(data));
    setTimeout(() => {
        this.setState({
            loadingData : false
        }, () => {
            if ( callback ) {
                callback();                
            }
        });
    }, 200);
}
export async function handleDidMountHook(callback) {
    const {href} = window.location;    
    const {post_type, tax} = this.state;
    const slugPostType = getParameterFromUrl(href, 'slug');
    const taxSlug = getParameterFromUrl(href, 'tax');
    if ( isPagePostType(slugPostType) ) {
        this.setState({
            loadingData : false
        }, () => {
            if ( callback ) {
                callback();                
            }
        });
        return;
    }
    if ( slugPostType !== post_type ) {
        this.setState({
            post_type : slugPostType,
            tax : taxSlug || 'categories'
        }, async () => {            
            await performCallback.call(this, slugPostType, taxSlug, callback);         
        });
        return;
    }
    await performCallback.call(this, slugPostType, taxSlug, callback);
    
}
export function handleRefreshEmbbedModal(callback) {
    const inst = getComponentInst(COMPONENT_INST.CATEGORIES_TAB);
    const {updateActiveCategoriesLists, updateActiveCategoryNode} = inst.props;
    updateActiveCategoryNode(null);
    updateActiveCategoriesLists([]);
    inst.setState({
        rmIds : [],
        categoryNodeSelectedValue : EMPTY_PARENT_CATEGORY.value,
        categoryNodeActive : null,
        categoriesData : [],
        originCategoriesData : [],
        zoom: 1,
        isFullScreen: false,
        s : '',
        loadingData : true
    });
    const data = cloneDeep(inst.state.protectedCategoriesData);
    inst.categoriesListSelected = EMPTY_PARENT_CATEGORY.value;
    setDeSelectCategoryNode(data);
    updateActiveCategoriesLists(cloneDeep(data)); 
    inst.setState({
        categoriesData : cloneDeep(data),
        originCategoriesData : cloneDeep(data), 
        loadingData : false
    }, () => {
        setTimeout(() => {
            callback && callback();
        }, 200);
    });    
}