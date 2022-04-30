import * as modalUtils from 'utils/modalUtils';
import * as _ from 'utils/libUtils';
import { MODAL_IDS } from 'constants/modalConstants';
import { handleShowNewPostTypeModal } from './postTypes/modals/handleShowNewPostTypeModal';
import { handleShowEditPostTypeModal } from './postTypes/modals/handleShowEditPostTypeModal';
import { handleShowMediaDialog } from './postTypes/modals/handleShowMediaDialog';
import { handlePerformCreateNewPostType } from './postTypes/handlePerformCreateNewPostType';
import { handlePerformEditPostType } from './postTypes/handlePerformEditPostType';
import { handleRemovePostType } from './postTypes/remove/handleRemovePostType';
import { handleRemoveFeaturedImage } from './postTypes/remove/handleRemoveFeaturedImage';
import { handleTrashPermantlyPostType } from './postTypes/trash/handleTrashPermantlyPostType';
import { handleTrashPermantlyAllPostType } from './postTypes/trash/handleTrashPermantlyAllPostType';
import { handleTextChanged } from './postTypes/handleTextChanged';
import { handleRestoreDeactivePostType } from './postTypes/restore/handleRestoreDeactivePostType';
import { handleRestoreAllDeactivePostType } from './postTypes/restore/handleRestoreAllDeactivePostType';
import { handleAuthorFilter } from './postTypes/filter/handleAuthorFilter';
import { handleCategoryFilter } from './postTypes/filter/handleCategoryFilter';
import { handleFilter } from './postTypes/filter/handleFilter';
import { handleCleartxtSearchFilter } from './postTypes/filter/handleCleartxtSearchFilter';
import { handleClearFilter } from './postTypes/filter/handleClearFilter';
import { handleTxtSearchChanged } from './postTypes/handleTxtSearchChanged';
import { handleEditorChanged } from './postTypes/handleEditorChanged';
import { handleShowCtModal } from './postTypes/modals/embbed/handleShowCtModal';
import { handleTrashAllPostTypesListData } from './postTypes/trash/handleTrashAllPostTypesListData';
import { handleCloseEditPostTypeModal } from './postTypes/modals/handleCloseEditPostTypeModal';
import { handleCloseNewPostTypeModal } from './postTypes/modals/handleCloseNewPostTypeModal';
import { handleChangeSelectedRows } from './postTypes/handleChangeSelectedRows';
import { handleCloseCtModal } from './postTypes/modals/embbed/handleCloseCtModal';
import { handleShowCTagModal } from './postTypes/modals/embbed/handleShowCTagModal';
import { handleChooseEmbbedTagsList } from './postTypes/modals/embbed/handleChooseEmbbedTagsList';
import { handleChangedPostField } from './postTypes/handleChangedPostField';
import { handleChoosePostCategoryItem } from './postTypes/handleChoosePostCategoryItem';
import { handlePublishPost } from './postTypes/save/handlePublishPost';
import { handleFillPostSlug } from './postTypes/handleFillPostSlug';
import { handleUpdatePost } from './postTypes/save/handleUpdatePost';
import { handleTrashPost } from './postTypes/trash/handleTrashPost';
import { handleSelectRow } from './postTypes/handleSelectRow';
import { handleTrashAllPostsListData } from './postTypes/trash/handletrashAllPostsListData';
import { handleRemovePermantlyAllPostsListData } from './postTypes/remove/handleRemovePermantlyAllPostsListData';
import { handleRestoreAllPostsListData } from './postTypes/restore/handleRestoreAllPostsListData';
import { handleRemovePermantlyPost } from './postTypes/remove/handleRemovePermantlyPost';
import { handlePerformRestorePost } from './postTypes/restore/handlePerformRestorePost';
import { performPostsListTabMountHook } from 'utils/postTypesUtils';
import { handleShowEditPostModal } from './postTypes/modals/handleShowEditPostModal';
import { handlePostTypesTabMountHook } from 'utils/postTypes/handlePostTypesTabMountHook';
import { handleShowNewPostModal } from './postTypes/modals/handleShowNewPostModal';
import { handleTxtSearchKeyDown } from './postTypes/handleTxtSearchKeyDown';
import { handleAddNewTax } from './postTypes/handleAddNewTax';
import { handleRemoveTax } from './postTypes/restore/handleRemoveTax';
import { handleSearchPostType } from './postTypes/handleSearchPostType';
import { handleClearTxtSearchPostType } from './postTypes/filter/handleClearTxtSearchPostType';
//#region Post Type Action
export function onClick_showNewPostTypeModal(e) {
    e.preventDefault();
    handleShowNewPostTypeModal.call(this);
}
export function onClick_showEditPostTypeModal(e) {
    e.preventDefault();
    handleShowEditPostTypeModal.call(this, e);
}
export function onClick_closeNewPostTypeModal(e) {
    e.preventDefault();
    handleCloseNewPostTypeModal.call(this);
}
export function onClick_closeEditPostTypeModal(e) {
    e && e.preventDefault();
    handleCloseEditPostTypeModal.call(this);
}
export function onSubmit_performCreateNewPostType(e) {
    e.preventDefault();
    handlePerformCreateNewPostType.call(this);
}
export function onSubmit_performEditPostType(e) {
    e.preventDefault();
    handlePerformEditPostType.call(this);    
}
export function onClick_removePostType(e) {
    e.preventDefault();
    handleRemovePostType.call(this, e);
}
export function onClick_refreshPostTypesListData(e) {
    e.preventDefault();
    handlePostTypesTabMountHook.call(this);
}
export function onClick_trashAllPostTypesListData(e) {
    e.preventDefault();
    handleTrashAllPostTypesListData.call(this);   
}
export function onChange_handleTextChanged(e) {
    handleTextChanged.call(this, e);    
}
export function onClick_restoreDeactivePostType(e) {
    e.preventDefault();
    handleRestoreDeactivePostType.call(this, e);
}
export function onClick_restoreAllDeactivePostType(e) {
    e.preventDefault();
    handleRestoreAllDeactivePostType.call(this);    
}
export function onClick_trashPermantlyPostType(e) {
    e.preventDefault();
    handleTrashPermantlyPostType.call(this, e);
}
export function onClick_trashPermantlyAllPostType(e) {
    e.preventDefault();
    handleTrashPermantlyAllPostType.call(this);
}
export function onClick_addNewTax(e) {
    e.preventDefault();
    handleAddNewTax.call(this);
}
export function onClick_removeTax(id, e) {
    e.preventDefault();
    handleRemoveTax.call(this, id);
}
export function onKeyDown_searchPostType(e) {
    handleSearchPostType.call(this, e);
}
export function onClick_clearTxtSearchPostType(e) {
    handleClearTxtSearchPostType.call(this, e);
}
//#endregion
//#region Post Action
export function onClick_newPost(e) {
    e.preventDefault();
    handleShowNewPostModal.call(this);
    //modalUtils.openPopboxModal(MODAL_IDS.EDIT_POST);
}
export function onClick_editPost(id, e) {
    e.preventDefault();    
    handleShowEditPostModal.call(this, id);
}
export function onClick_trashPost(id, e) {
    e.preventDefault();
    handleTrashPost.call(this, id, this.state.post_type);
}
export function onClick_SavePostChange(e) {
    e.preventDefault();
}
export function onClick_CloseEditPostModal(e) {
    e.preventDefault();
    modalUtils.closePopboxModal(MODAL_IDS.EDIT_POST);
}
export function onClick_refreshPostsListData(e) {
    e.preventDefault();
    performPostsListTabMountHook.call(this);
}
export function onClick_trashAllPostsListData(e) {
    e.preventDefault();
    handleTrashAllPostsListData.call(this, this.state.post_type);
}
export function onClick_handleChooseAuthorFilter(v) { }
export function onClick_handleChoosePostModifiedFilter(v) { }
export function onClick_handleChooseCategoryFilter(v) { }
export function onClick_authorFilter(n, v, e) {
    e.preventDefault();
    handleAuthorFilter.call(this, n, v);
}
export function onClick_categoryFilter(n, v, e) {
    e.preventDefault();
    handleCategoryFilter.call(this, n, v);
}
export function onClick_handleFilter(e) {
    e.preventDefault();
    handleFilter.call(this);
}
export function onClick_clearFilter(e) {
    e.preventDefault();
    handleClearFilter.call(this);    
}
export function onKeyDown_txtSearchChanged(e) {
    handleTxtSearchKeyDown.call(this, e);
}
export function onChange_txtSearchChanged(e) {
    handleTxtSearchChanged.call(this, e);
}
export function onClick_cleartxtSearchFilter(e) {
    e.preventDefault();
    handleCleartxtSearchFilter.call(this);
}
export function onChange_handleEditorChanged(content) {   
    handleEditorChanged.call(this, content);
}
export function onClick_showMediaDialog(command, e) {
    e.preventDefault();     
    handleShowMediaDialog.call(this, command, e);
}
export function onClick_removeFeaturedImage(e) {
    e.preventDefault();
    handleRemoveFeaturedImage.call(this);
}
export function onChange_handleSelectedRows(state) {
    handleChangeSelectedRows.call(this, state);
}
export function onMouseUp_handleSelectRow(e) {
    e.preventDefault();
    handleSelectRow.call(this, e);
}
//#endregion Post Action
export function onClick_showPostCategoryModal(e) {
    e.preventDefault();
    handleShowCtModal.call(this);
}
export function onClick_closePostCategoryModal(e) {
    e.preventDefault();
    handleCloseCtModal.call(this);
}
export function onClick_showPostTagModal(e) {
    e.preventDefault();
    handleShowCTagModal.call(this);
}
export function onClick_chooseEmbbedTagsList(e) {
    e.preventDefault();
    handleChooseEmbbedTagsList.call(this);
}
export function onChange_handlePostField(e) {
    e.preventDefault();
    handleChangedPostField.call(this, e);
}
export function onBlur_handleFillPostSlug(e) {
    e.preventDefault();
    handleFillPostSlug.call(this, e);
}
export function onClick_handleChoosePostCategoryItem(value) {
    handleChoosePostCategoryItem.call(this, value);
}
export function onClick_handlePublishPost(e) {
    e.preventDefault();
    handlePublishPost.call(this);
}
export function onClick_handleUpdatePost(e) {
    e.preventDefault();
    handleUpdatePost.call(this);
}
export async function onClick_removePermantlyPost(ids, post_type = 'post', e) {
    e.preventDefault();
    handleRemovePermantlyPost.call(this, ids, post_type);
}
export function onClick_removePermantlyAllPostsListData(e) {
    e.preventDefault();
    handleRemovePermantlyAllPostsListData.call(this);   
}
export function onClick_restoreAllPostsListData(e) {
    e.preventDefault();
    handleRestoreAllPostsListData.call(this, this.state.post_type);
}
export function onClick_restorePost(id, post_type = 'post', e) {
    e.preventDefault();    
    handlePerformRestorePost.call(this, [id], post_type);
}
export async function onChange_handlePerRowsChange(newPerPage, paged) {
    this.setState({ numPerPage : newPerPage,
                    paged }, async () => {
        handleFilter.call(this);
    });
}
export async function onChange_handlePageChange(paged) {
    this.setState({ paged }, async () => {
        handleFilter.call(this);
    });
}
export async function onSort_handleSort(column, sortDirection) {
    this.setState({
        order : column.selector,
        orderBy : sortDirection
    }, async () => {
       handleFilter.call(this);
    });
}