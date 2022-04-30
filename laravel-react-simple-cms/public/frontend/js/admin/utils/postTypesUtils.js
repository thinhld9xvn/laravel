import { COMPONENT_INST } from 'constants/componentConstants';
import { POST_ACTIONS, POST_STATUS, POST_TYPE_ENTRIES_MENU } from 'constants/globalConstants';
import { getComponentInst } from './componentUtils';
import { handleGetPostsList } from './postTypes/handleGetPostsList';
import { handleGetAllActivePostTypesList } from './postTypes/handleGetAllActivePostTypesList';
import { handleGetDeActivePostTypesList } from './postTypes/handleGetDeActivePostTypesList';
import { handleGetPost } from './postTypes/handleGetPost';
import { handleGetPostsListMilesData } from './postTypes/handleGetPostsListMilesData';
import { handleInitializePostLayout } from './postTypes/handleInitializePostLayout';
import { handlePostsListTabMountHook } from './postTypes/handlePostsListTabMountHook';
import { isEditPostPage, isNewPostPage } from './urlUtils';
import { getListIdsPopboxModal } from './modalUtils';
import { MODAL_IDS } from 'constants/modalConstants';
import { handlePostTypesTabMountHook } from './postTypes/handlePostTypesTabMountHook';
import { handleUpdatePostTypesListInSidebar } from './postTypes/handleUpdatePostTypesListInSidebar';
import { decodeBase64, encodeBase64, checkBase64 } from './stringsUtils';
export async function getAllActivePostTypesList() {
    return handleGetAllActivePostTypesList.call(this);
}
export async function getDeActivePostTypesList() {
    return handleGetDeActivePostTypesList.call(this);
}
export async function getAllActivePostsList() {
    return handleGetPostsList.call(this);
}
export function getPostStatusCaption(status) {
   return status === POST_STATUS.public ? 'Công khai' : 'Bản nháp';
}
export function getPostBoxStatusCaption(action) {
    return action === POST_ACTIONS.edit ? 'Cập nhật' : 'Đăng bài';
}
export function getPostSubmitCaption(action) {
    return action === POST_ACTIONS.edit ? 'Cập nhật' : 'Đăng bài';
}
export function getPostsListMilesData(data) {
    return handleGetPostsListMilesData.call(this, data);
}
export async function performPostsListTabMountHook(callback, reloadCatList = false) {
    handlePostsListTabMountHook.call(this, callback, reloadCatList);
}
export async function initializePostLayout(callback, reloadCatList = false) {
    await handleInitializePostLayout.call(this, callback, reloadCatList);
}
export async function getPost(guid, post_type = 'post') {
    return handleGetPost.call(this, guid, post_type);
}
export function getPostLayoutInst() {
    const modal_ids = getListIdsPopboxModal();
    if ( isNewPostPage() ) {
        return getComponentInst(COMPONENT_INST.NEW_POST_LAYOUT);
    }
    if ( isEditPostPage() ) {
        return getComponentInst(COMPONENT_INST.EDIT_POST_LAYOUT);
    }
    if ( modal_ids.indexOf(MODAL_IDS.EDIT_POST) !== -1 ) {
        return getComponentInst(COMPONENT_INST.EDIT_POST_LAYOUT);
    }
    return null;
}
export function isPagePostType(slug) {
    return slug === POST_TYPE_ENTRIES_MENU.PAGES.id;
}
export async function performPostTypesTabMountHook(callback) {
    await handlePostTypesTabMountHook.call(this, callback);
}
export function convertFFToPostType(formFields) {
    const {id, labelPostType, namePostType, slugPostType, descriptionPostType,
            allPostsLabel, newPostLabel, postNameLabel, publishPostLabel, taxLists, template} = formFields;
    taxLists.map(tax => (tax.id = createBase64PostTypeId(tax.id)));
    return {
        id : createBase64PostTypeId(id),
        label : labelPostType,
        name : namePostType,
        slug : slugPostType,
        description : descriptionPostType,
        all_posts_label : allPostsLabel,
        new_post_label : newPostLabel,
        post_name_label : postNameLabel,
        publish_post_label : publishPostLabel,
        taxonomies : [...taxLists],
        template
    }
}
export function updatePostTypesListInSidebar(sidebarMenuItems, postTypesList) {
    handleUpdatePostTypesListInSidebar.call(this, sidebarMenuItems, postTypesList);
}
export function createBase64PostTypeId(id) {
    if ( checkBase64(id) ) return id;
    return encodeBase64(id);
}
export function getBase64PostTypeId(id) {
    if ( checkBase64(id) ) return id;
    return decodeBase64(id);
}
