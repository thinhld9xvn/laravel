import { closePopboxModal } from "utils/modalUtils";
import { handleDidMountHook } from "utils/tagPostTypes/handleDidMountHook";
import { handleCatTextField } from "./categories/handleCatTextField";
import { handleChooseTagNodeItem } from "./tags/handleChooseTagNodeItem";
import { handleClearTxtSearchFilter } from "./tags/handleClearTxtSearchFilter";
import { handlecloseEditTagNodeModal } from "./tags/handlecloseEditTagNodeModal";
import { handleCreateTagNodeItem } from "./tags/handleCreateTagNodeItem";
import { handleEditTagNodeItem } from "./tags/handleEditTagNodeItem";
import { handleOpenModalTagNodeItem } from "./tags/handleOpenModalTagNodeItem";
import { handleRemoveTagNodeItem } from "./tags/handleRemoveTagNodeItem";
import { handleSaveTagNodeItem } from "./tags/handleSaveTagNodeItem";
import { handleSaveTagsListData } from "./tags/handleSaveTagsListData";
import { handleSearchNodeItems } from "./tags/handleSearchNodeItems";
import { handleSortNodeItem } from "./tags/handleSortNodeItem";
import { handleImportDefSampleData } from "./tags/import/handleImportDefSampleData";
import { handleRemovePostTag } from "./tags/remove/handleRemovePostTag";
export function onClick_handleChooseTagNodeItem(v, n, props) {
    handleChooseTagNodeItem.call(this, v, n, props);
}
export function onDblClick_handleChooseTagNodeItem(v) {
    handleEditTagNodeItem.call(this, v);
}
export function onSort_handleSortNodeItem(node, data) {
    handleSortNodeItem.call(this, node, data);
}
export function onClick_handleEditTagNodeItem(id, e) {
    e && e.preventDefault();
    handleEditTagNodeItem.call(this, id);
}
export function onClick_handleRemoveTagNodeItem(id, e) {
    e.preventDefault();
    handleRemoveTagNodeItem.call(this, id);
}
export function onClick_closeEditTagNodeModal(modal_id, e) {
    e.preventDefault();
    handlecloseEditTagNodeModal.call(this, modal_id);
}
export function onClick_handleSaveTagNodeItem(modal_id, e) {
    e.preventDefault();    
    handleSaveTagNodeItem.call(this, modal_id);
}
export function onClick_handleOpenModalTagNodeItem(e) {
    e.preventDefault();
    handleOpenModalTagNodeItem.call(this);
}
export function onClick_handleCreateTagNodeItem(e) {
    e.preventDefault();
    handleCreateTagNodeItem.call(this);
}
export function onClick_closeCreateTagNodeModal(modal_id, e) {
    e && e.preventDefault();
    closePopboxModal(modal_id);
}
export function onChange_handleTagTextField(e) {
    handleCatTextField.call(this, e);
}
export async function onClick_refreshTagsListData(e) {
    e.preventDefault();
    await handleDidMountHook.call(this);
}
export async function onClick_saveTagsListData(e) {
    e.preventDefault();
    await handleSaveTagsListData.call(this);
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
export function onClick_removePostTag(v, e) {
    e.preventDefault();
    handleRemovePostTag.call(this, v);
}
export function onClick_importDefSampleData(e) {
    e.preventDefault();
    handleImportDefSampleData.call(this);
}