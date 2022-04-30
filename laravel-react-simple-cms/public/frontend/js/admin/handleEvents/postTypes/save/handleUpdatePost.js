import { COMPONENT_INST } from 'constants/componentConstants';
import { FORM_IDS } from 'constants/formConstants';
import { getComponentInst, getComponentNameFromActiveUrl } from 'utils/componentUtils';
import {closeLoadingOverlay, setUnFocusForm, showLoadingOverlay} from 'utils/libUtils';
import { showAlertDialog } from "utils/modalUtils";
import { handlePublishPostToServer } from "utils/postTypes/handlePublishPostToServer";
import {cloneDeep} from 'lodash';
export async function handleUpdatePost() {
    const {formFields, postFormValidate, dateTimeInt, post_type, _authorsList, action} = this.state;
    const activeComponentName = getComponentNameFromActiveUrl();
    const isPostsListLayout = activeComponentName === COMPONENT_INST.POSTS_LIST_LAYOUT;
    let postsListInst = null, filteredItems = [], data = [];
    if ( isPostsListLayout ) {
        postsListInst = getComponentInst(COMPONENT_INST.POSTS_LIST_TAB);    
        filteredItems = cloneDeep(postsListInst.state.filteredItems);
        data = cloneDeep(postsListInst.state.data);
    }    
    const {guid, post_title, post_thumbnail, post_categories, post_author} = formFields;
    const {dateTimeLocale : post_date} = dateTimeInt;
    const {display_name, email} = _authorsList.find(au => parseInt(au.guid) === parseInt(post_author));
    //const post_author = (getClientUserInfo()).guid;
    showLoadingOverlay();    
    setUnFocusForm( document.getElementById(FORM_IDS.EDIT_POST) );
    let formValidate = postFormValidate.formValidate;
    if ( post_type === 'post' ) {
        formValidate = formValidate && ( post_categories && post_categories.length );
    }
    if ( ! formValidate ) {
        showAlertDialog({
            title : 'Thông báo',
            message : 'Mời nhập đầy đủ các thông tin bài viết theo yêu cầu (tiêu đề, đường dẫn, danh mục, ...)',
            icon : 'error',
            ok_label : 'Đồng ý',
            ok_callback : () => {}
        });
        closeLoadingOverlay();
        return false;
    }        
    const results = await handlePublishPostToServer.call(this, {...formFields, post_date, post_author}, post_type, action);  
    if ( !results ) return;    
    closeLoadingOverlay(() => {
        if ( isPostsListLayout ) {
            let index = filteredItems.findIndex(item => parseInt(item.guid) === parseInt(guid));
            if ( index !== -1 ) {
                filteredItems[index] = {...filteredItems[index], post_title, post_categories, post_thumbnail, post_author, display_name, email};
            }
            //
            index = data.findIndex(item => parseInt(item.guid) === parseInt(guid));
            if ( index !== -1 ) {
                data[index] = {...data[index], post_title, post_categories, post_thumbnail, post_author, display_name, email};
            }
            //
            postsListInst.setState({
                filteredItems: cloneDeep(filteredItems),
                data: cloneDeep(data)
            }, () => {
                postsListInst._filteredItems = cloneDeep(filteredItems);
            });
        }
    });
}