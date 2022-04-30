import { removeNonExistCategories, setConvertCategoriesListPostData, setDeSelectCategoryNode, setSelectedCategoryNode, todoSearchCategoryNode } from 'utils/categoryPostTypesUtils';
import { COMPONENT_INST } from 'constants/componentConstants';
import { closeLoadingOverlay, showLoadingOverlay } from 'utils/libUtils';
import { handleGetNowFromServer } from 'utils/dateTime/handleGetNow';
import { attachDomFixedPosSideListener } from 'utils/domUtils';
import { getComponentInst } from 'utils/componentUtils';
import { cloneDeep } from 'lodash';
import { POST_ACTIONS } from 'constants/globalConstants';
import { getPost, isPagePostType } from 'utils/postTypesUtils';
import { getParameterFromUrl } from 'utils/urlUtils';
import { setCheckedTagNode, setUnCheckedTagNode, sortTagsByList } from 'utils/tagPostTypesUtils';
import { handleDidMountHook as handleCatListDidMountHook } from 'utils/categoryPostTypes/handleDidMountHook';
import { handleGetAllActiveUsers } from 'utils/membership/handleGetAllActiveUsers';
import { getClientUserInfo } from 'utils/membershipUtils';
async function performCallback(callback, reloadCatList = false) {
    const _performCallback = async () => {
        const {protectedTagsData} = tagsInst.state; 
        let tagsList = [],
            resultsCatData = [];  
        if ( !isPagePostType(post_type) ) {                      
            tagsList = cloneDeep(protectedTagsData);
        }
        let formFields = cloneDeep(_formFields),
            postFormValidate = cloneDeep(_postFormValidate);
        const currentAuthorId = (getClientUserInfo()).guid;
        const dateTimeRes = action === POST_ACTIONS.new ? (await handleGetNowFromServer.call(this)).data.data : dateTimeInt;
        const _authorsList = ((await handleGetAllActiveUsers.call(this)).data.data);
        const authorsList = _authorsList.map(author => ({name : author.display_name, 
                                                            value : author.guid, 
                                                            selected : parseInt(currentAuthorId) === parseInt(author.guid) }));
        let selectedCLists = [],
            tagsChosen = [];        
        if ( action === POST_ACTIONS.new ) {            
            tagsInst.tagsChosen = [];
            setUnCheckedTagNode(tagsList);
            tagsInst.setState({
                tagsData : cloneDeep(tagsList),
                originTagsData : cloneDeep(tagsList)
            });
        }
        if ( action === POST_ACTIONS.edit ) {
            const _guid = !embbed ? getParameterFromUrl(window.location.href, 'guid') : embbedPostId;
            const results = await getPost(_guid, post_type);
            const {id, guid, post_title, post_url, post_content, post_excerpt, post_status, post_thumbnail, post_categories, post_tags, post_author, post_date, post_modified_date} = results.data.data;
            if ( post_categories && post_categories.length ) {                
                // xóa những danh mục không tồn tại
                const catListsData = cloneDeep(inst.state.protectedCategoriesData);
                removeNonExistCategories(catListsData, post_categories); // return post_categories
                //
                selectedCLists = cloneDeep(post_categories);
            }
            if ( !isPagePostType(post_type) ) {    
                if ( post_tags && post_tags.length ) {                        
                    tagsChosen = sortTagsByList(post_tags, protectedTagsData);
                }                    
                tagsInst.tagsChosen = cloneDeep(tagsChosen);
                setCheckedTagNode(tagsList, tagsChosen);
                tagsInst.setState({
                    tagsData : cloneDeep(tagsList),
                    originTagsData : cloneDeep(tagsList)
                });
            }
            authorsList.map(author => author.selected = parseInt(author.value) === parseInt(post_author));
            formFields = {...formFields, id, guid, post_title, post_url, post_content, post_excerpt, post_status, post_thumbnail, post_categories, post_tags, post_date, post_modified_date};
        }
        if ( !isPagePostType(post_type) ) { 
            resultsCatData = cloneDeep(inst.state.protectedCategoriesData); 
            setDeSelectCategoryNode(resultsCatData);
            setSelectedCategoryNode(resultsCatData, selectedCLists);
            setConvertCategoriesListPostData(resultsCatData);
            this.chooseCategoriesList = cloneDeep(selectedCLists);
        }
        const t1 = attachDomFixedPosSideListener('.option-custom.categoriesBoxListDropDown',
                                                    '.select-list');        
        this.setState({                    
            categoriesList : cloneDeep(resultsCatData),
            tagsListChosen : cloneDeep(tagsChosen),
            _authorsList : cloneDeep(_authorsList),
            authorsList : cloneDeep(authorsList),
            refTimerAttachDomOptionCustom : t1,
            dateTimeInt : cloneDeep(dateTimeRes),
            formFields : cloneDeep(formFields),
            _formFields : cloneDeep(formFields),
            postFormValidate : cloneDeep(postFormValidate)
        }, () => {
            if ( callback ) {
                callback();
            }
            closeLoadingOverlay();
        });
    }
    showLoadingOverlay();
    let inst = null,
        tagsInst = null;
    const {action, _formFields, dateTimeInt, embbed, embbedPostId, _postFormValidate, categoriesList, post_type} = this.state;
    const tmr = setInterval(async () => {
        inst = getComponentInst(COMPONENT_INST.CATEGORIES_TAB);
        tagsInst = getComponentInst(COMPONENT_INST.TAGS_TAB);
        if ( inst && !inst.state.loadingData && 
                tagsInst && !tagsInst.state.loadingData ) {
            clearInterval(tmr);
            setTimeout(async () => {
                if ( !isPagePostType(post_type) && reloadCatList ) {
                    await handleCatListDidMountHook.call(inst, async () => {
                        await _performCallback();
                    });
                    return;
                }
                await _performCallback.call(this);
            }, 200);
        }
    }, 200);
}
export async function handleInitializePostLayout(callback, reloadCatList = false) {    
    const {post_type} = this.state;
    const postTypeSlug = getParameterFromUrl(window.location.href, 'slug');
    this.setState({
        categoriesList : [],
        tagsListChosen : [],
    }, async () => {
        if ( postTypeSlug !== post_type ) {
            this.setState({
                post_type : postTypeSlug,           
                showPostCategoriesBox : !isPagePostType(postTypeSlug),
                showPostTagsBox : !isPagePostType(postTypeSlug),
            }, async () => {
                await performCallback.call(this, callback, reloadCatList);
            });
            return;
        }
        await performCallback.call(this, callback, reloadCatList);
    });    
}