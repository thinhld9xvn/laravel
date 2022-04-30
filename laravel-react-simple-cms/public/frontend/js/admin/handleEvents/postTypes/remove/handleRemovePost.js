import { COMPONENT_INST } from "constants/componentConstants";
import { ADMIN_AJAX_URLS } from "constants/UrlConstants";
import { getApi } from "utils/apiUtils";
import { getComponentInst } from "utils/componentUtils";
import { closeLoadingOverlay, showLoadingOverlay } from "utils/libUtils";
import { cloneDeep } from 'lodash';
import { POST_ACTIONS } from "constants/globalConstants";
import { handleDeselectRows, handleSelectRow } from "utils/datatableUtils";
function findPostIndex(data, guid) {
    return data.findIndex(post => parseInt(post.guid) === parseInt(guid));
}
export function removePostInList(data, guid) {
    const index = findPostIndex(data, guid);
    if ( index !== -1 ) {
        return (data.splice(index, 1))[0];
    }
    return false;
}
export function addPostInList(data, post) {
    const index = findPostIndex(data, post.guid);
    if ( index === -1 ) {
        data.splice(0, 0, cloneDeep(post));
        return true;
    }
    return false;
}
function refreshDtTrashAction(params) {
    const {postsListInst, deactivePostsListInst, data, deactiveData, filteredItems, deactiveFilteredItems, guids} = params;
    guids.forEach(guid => {
        const orphanPost = removePostInList(data, guid);
        removePostInList(filteredItems, guid);
        removePostInList(postsListInst._filteredItems, guid);
        //
        addPostInList(deactiveData, orphanPost);
        addPostInList(deactiveFilteredItems, orphanPost);
        addPostInList(deactivePostsListInst._filteredItems, orphanPost);
        postsListInst.setState({
            filteredItems : cloneDeep(filteredItems),
            data : cloneDeep(data)
        }, () => {
            deactivePostsListInst.setState({
                filteredItems : cloneDeep(deactiveFilteredItems),
                data : cloneDeep(deactiveData)
            });
        });
    });
}
function refreshDtTrashPermantlyAction(params) {
    const {deactivePostsListInst, deactiveData, deactiveFilteredItems, guids} = params;
    guids.forEach(guid => {
        removePostInList(deactiveData, guid);
        removePostInList(deactiveFilteredItems, guid);
        removePostInList(deactivePostsListInst._filteredItems, guid);
        //
        deactivePostsListInst.setState({
            filteredItems : cloneDeep(deactiveFilteredItems),
            data : cloneDeep(deactiveData)
        });
    });
}
export async function handleRemovePost(guids, post_type, post_action = POST_ACTIONS.trash) {
    showLoadingOverlay();
    const inst = getComponentInst(COMPONENT_INST.POSTS_LIST_TAB);
    const dePostInst = getComponentInst(COMPONENT_INST.DEACTIVE_POSTS_LIST_TAB);
    //
    const filteredItems = cloneDeep(inst.state.filteredItems);
    const data = cloneDeep(inst.state.data);
    const deFilteredItems = cloneDeep(dePostInst.state.filteredItems);
    const deData = cloneDeep(dePostInst.state.data);
    //
    const {REMOVE_POST_URL} = ADMIN_AJAX_URLS;
    const fd = new FormData();
    fd.append('guid', JSON.stringify(guids));
    fd.append('post_type', post_type);
    fd.append('post_action', post_action);
    const response = await getApi("POST", REMOVE_POST_URL, fd);
    if ( !response ) return;
    const results = response.data.data;
    if ( results ) {
        handleDeselectRows.call(this, guids, () => {
            if ( post_action === POST_ACTIONS.trash ) {
                refreshDtTrashAction({postsListInst : inst, 
                                        deactivePostsListInst : dePostInst, 
                                            data, 
                                            deactiveData : deData, 
                                            filteredItems, 
                                            deactiveFilteredItems : deFilteredItems, 
                                            guids});
            }
            if ( post_action === POST_ACTIONS.remove_permantly ) {
                refreshDtTrashPermantlyAction({deactivePostsListInst : dePostInst, 
                                                deactiveData : deData, 
                                                deactiveFilteredItems : deFilteredItems, 
                                                guids});
            }
        });
    }
    closeLoadingOverlay();    
}