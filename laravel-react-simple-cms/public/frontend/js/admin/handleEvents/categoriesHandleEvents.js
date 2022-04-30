import { handleChooseCategoryNodeItem } from './categories/handleChooseCategoryNodeItem';
import { handleSortNodeItem } from './categories/handleSortNodeItem';
import { handleEditCategoryNodeItem } from './categories/handleEditCategoryNodeItem';
import { handleRemoveCategoryNodeItem } from './categories/handleRemoveCategoryNodeItem';
import { handleSaveCategoryNodeItem } from './categories/handleSaveCategoryNodeItem';
import { handleOpenModalCategoryNodeItem } from './categories/handleOpenModalCategoryNodeItem';
import { handleCreateCategoryNodeItem } from './categories/handleCreateCategoryNodeItem';
import { handleCatTextField } from './categories/handleCatTextField';
import { showMediaEmbbedModal } from './categories/showMediaEmbbedModal';
import { handlecloseEditCategoryNodeModal } from './categories/handlecloseEditCategoryNodeModal';
import { closePopboxModal } from 'utils/modalUtils';
import { handleSaveCategoriesListData } from './categories/handleSaveCategoriesListData';
import { handleDidMountHook } from 'utils/categoryPostTypes/handleDidMountHook';
import { handleCatEditorTextField } from './categories/handleCatEditorTextField';
import { handleSearchNodeItems } from './categories/handleSearchNodeItems';
import { handleClearTxtSearchFilter } from './categories/handleClearTxtSearchFilter';
import { handlePerformRemoveFeaturedImage } from './categories/remove/handlePerformRemoveFeaturedImage';
import { handleImportDefSampleData } from './categories/import/handleImportDefSampleData';
export function onClick_handleChooseCategoryNodeItem(v) {
    handleChooseCategoryNodeItem.call(this, v);
}
export function onDblClick_handleChooseCategoryNodeItem(v) {
    handleEditCategoryNodeItem.call(this, v);
}
export function onSort_handleSortNodeItem(node, data) {
    handleSortNodeItem.call(this, node, data);
}
export function onClick_handleEditCategoryNodeItem(id, e) {
    e && e.preventDefault();
    handleEditCategoryNodeItem.call(this, id);
}
export function onClick_handleRemoveCategoryNodeItem(id, e) {
    e.preventDefault();
    handleRemoveCategoryNodeItem.call(this, id);
}
export function onClick_closeEditCategoryNodeModal(modal_id, e) {
    e.preventDefault();
    handlecloseEditCategoryNodeModal.call(this, modal_id);
}
export function onClick_handleSaveCategoryNodeItem(modal_id, e) {
    e.preventDefault();    
    handleSaveCategoryNodeItem.call(this, modal_id);
}
export function onClick_handleOpenModalCategoryNodeItem(e) {
    e.preventDefault();
    handleOpenModalCategoryNodeItem.call(this);
}
export function onClick_handleCreateCategoryNodeItem(e) {
    e.preventDefault();
    handleCreateCategoryNodeItem.call(this);
}
export function onClick_closeCreateCategoryNodeModal(modal_id, e) {
    e && e.preventDefault();
    closePopboxModal(modal_id);
}
export function onChange_handleCatTextField(e) {
    handleCatTextField.call(this, e);
}
export function onChange_handleCatEditorTextField(name, content, e) {
    handleCatEditorTextField.call(this, name, content, e);
}
export function onClick_showMediaEmbbedModal(e) {
    e.preventDefault();
    showMediaEmbbedModal.call(this);
}
export function onClick_removeMediaEmbbedModal(e) {
    e.preventDefault();
    handlePerformRemoveFeaturedImage.call(this);
}
export async function onClick_refreshCategoriesListData(e) {
    e.preventDefault();
    await handleDidMountHook.call(this);
}
export function onClick_saveCategoriesListData(e) {
    e.preventDefault();
    handleSaveCategoriesListData.call(this, this.state.post_type, this.state.tax);
}
export function onKeyDown_handleFilter(e) {
    const v = e.currentTarget.value;
    handleSearchNodeItems.call(this, v);
    this.setState({ s : v });
}
export function onClick_clearTxtSearchFilter(e) {
    e.preventDefault();
    handleClearTxtSearchFilter.call(this);
}
export function onClick_importDefSampleData(e) {
    e.preventDefault();
    handleImportDefSampleData.call(this);
}