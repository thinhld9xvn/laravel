import { COMPONENT_INST } from "constants/componentConstants";
import { ADMIN_AJAX_URLS } from "constants/UrlConstants";
import { getApi } from "utils/apiUtils";
import { getComponentInst } from "utils/componentUtils";
import { closeLoadingOverlay, showLoadingOverlay } from "utils/libUtils";
import { cloneDeep } from 'lodash';
import { handleDeselectRows } from "utils/datatableUtils";
import { addPostInList, removePostInList } from "../remove/handleRemovePost";
export async function handleRestorePost(guids, post_type = 'post') {
    showLoadingOverlay();
    const inst = getComponentInst(COMPONENT_INST.POSTS_LIST_TAB);
    const dePostInst = getComponentInst(COMPONENT_INST.DEACTIVE_POSTS_LIST_TAB);
    //
    const filteredItems = cloneDeep(inst.state.filteredItems);
    const data = cloneDeep(inst.state.data);
    const deFilteredItems = cloneDeep(dePostInst.state.filteredItems);
    const deData = cloneDeep(dePostInst.state.data);
    //
    const {RESTORE_POST_URL} = ADMIN_AJAX_URLS;
    const fd = new FormData();
    fd.append('guid', JSON.stringify(guids));
    fd.append('post_type', post_type);
    const response = await getApi("POST", RESTORE_POST_URL, fd);
    if ( !response ) return;
    const results = response.data.data;
    if ( results ) {
        handleDeselectRows.call(this, guids, () => {
            guids.forEach(guid => {
                const orphanPost = removePostInList(deData, guid);
                removePostInList(deFilteredItems, guid);
                removePostInList(dePostInst._filteredItems, guid);
                //
                addPostInList(data, orphanPost);
                addPostInList(filteredItems, orphanPost);
                addPostInList(inst._filteredItems, orphanPost);
                //
                dePostInst.setState({
                    filteredItems : cloneDeep(deFilteredItems),
                    data : cloneDeep(deData)
                }, () => {
                    inst.setState({
                        filteredItems : cloneDeep(filteredItems),
                        data : cloneDeep(data)
                    });
                });
            });
        });
    }
    closeLoadingOverlay();    
}