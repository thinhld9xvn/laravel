import { handleInitLoadingFilesList } from './files/handleInitLoadingFilesList';
import { handleResetLoadTreesEvents } from './folders/handleResetLoadTreesEvents';
import { handleMapSearchFolderNode } from './folders/handleMapSearchFolderNode';
import { handleSelectFolder } from './folders/handleSelectFolder';
import { handleGetFolderTreeNodes } from './folders/handleGetFolderTreeNodes';
import { handleGetSelectedFolderObject } from './folders/handleGetSelectedFolderObject';
import { handleCreateFolderAction } from './folders/handleCreateFolderAction';
import { handleRenameFolderAction } from 'utils/filemanager/folders/handleRenameFolderAction';
import { handleInitRenameFolder } from './folders/handleInitRenameFolder';
import { handleRemoveFolderAction } from './folders/handleRemoveFolderAction';
export function initLoadTrees() {
    handleInitLoadingFilesList.call(this);
}
export function resetLoadTreesEvents() {
    handleResetLoadTreesEvents();
}
export function mapSearchFolderNode(fld, i, path, isRef = false) {    
    handleMapSearchFolderNode.call(this, fld, i, path, isRef = false);
}
export function selectFolder(path) {
    handleSelectFolder.call(this, path);
}
export async function getFolderTreeNodes(ajax_url) {   
    return handleGetFolderTreeNodes.call(this, ajax_url);
}
export function getSelectedFolderObject( isRef = false ) {
    return handleGetSelectedFolderObject.call(this, isRef);
}
export function createFolderAction() {
    handleCreateFolderAction.call(this);
}
export function renameFolderAction() {
    handleRenameFolderAction.call(this);
}
export function handleClick_RenameFolder(e) {
    handleInitRenameFolder.call(this);
}
export function removeFolderAction(e) {
    handleRemoveFolderAction.call(this);
}