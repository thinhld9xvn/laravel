import { FORM_IDS } from 'constants/formConstants';
import {closeLoadingOverlay, setUnFocusForm, showLoadingOverlay} from 'utils/libUtils';
import { getClientUserInfo } from 'utils/membershipUtils';
import { closeAllPopboxModal, showAlertDialog } from "utils/modalUtils";
import { handlePublishPostToServer } from "utils/postTypes/handlePublishPostToServer";
import { redirectRouterHook } from 'hooks/routerHook/redirectRouterHook';
import { ACTIONS_HOOKS } from 'constants/globalConstants';
import { getComponentInst, getComponentNameFromActiveUrl } from 'utils/componentUtils';
import { COMPONENT_INST } from 'constants/componentConstants';
import { cloneDeep } from 'lodash';
export async function handlePublishPost() {
    const {formFields, postFormValidate, dateTimeInt, post_type, post_action, _authorsList} = this.state;
    const {post_title, post_categories, post_thumbnail, post_author} = formFields;
    const {dateTimeLocale : post_date} = dateTimeInt;
    const {display_name, email} = _authorsList.find(au => parseInt(au.guid) === parseInt(post_author));
    const activeComponentName = getComponentNameFromActiveUrl();
    const isPostsListLayout = activeComponentName === COMPONENT_INST.POSTS_LIST_LAYOUT;
    let postsListInst = null, filteredItems = [], data = [];
    if ( isPostsListLayout ) {
        postsListInst = getComponentInst(COMPONENT_INST.POSTS_LIST_TAB);    
        filteredItems = cloneDeep(postsListInst.state.filteredItems);
        data = cloneDeep(postsListInst.state.data);
    }    
    showLoadingOverlay();    
    const form = document.querySelector('.postUpdateForm');
    setUnFocusForm( form );
    setTimeout(async () => {
        let formValidate = postFormValidate.formValidate;
        if ( post_type === 'post' ) {
            formValidate = formValidate && ( post_categories && post_categories.length );
        }
        if ( ! formValidate ) {
            showAlertDialog({
                title : 'Thông báo',
                message : 'Mời nhập đầy đủ các thông tin bài viết theo yêu cầu',
                icon : 'error',
                ok_label : 'Đồng ý',
                ok_callback : () => {}
            });
            closeLoadingOverlay();
            return false;
        }        
        const results = await handlePublishPostToServer.call(this, {...formFields, post_date, post_author}, post_type, post_action);  
        closeLoadingOverlay(() => {
            if ( !results ) return;
            const {id, guid} = results.data.data;
            if ( isPostsListLayout ) {
                const postData = {id, guid, post_title, post_categories, post_thumbnail, post_author, display_name, email, post_date : dateTimeInt};
                data.splice(0, 0, cloneDeep(postData));
                filteredItems.splice(0, 0, cloneDeep(postData));
                //
                postsListInst.setState({
                    filteredItems: cloneDeep(filteredItems),
                    data: cloneDeep(data)
                }, () => {
                    postsListInst._filteredItems = cloneDeep(filteredItems);
                    closeAllPopboxModal();
                });
            }
            else {
                const props = {
                    actions : { 
                        from : ACTIONS_HOOKS.PUBLISH_POST, 
                        to : ACTIONS_HOOKS.EDIT_POST
                    }, 
                    data : { 
                        id : results.data.data 
                    }
                }
                redirectRouterHook(props);
            }
            //redirectToEditPostUrl(results.data.data);
        });
    }, 200);
}