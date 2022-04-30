import * as _ from 'utils/libUtils';
import { handleLoadingFilesList } from './filemanager/handleLoadingFilesList';
import { handleChangeInfoFile } from './filemanager/handleChangeInfoFile';
import { handleChooseFile } from './filemanager/handleChooseFile';
import { handleShowModalChooseFile } from './filemanager/handleShowModalChooseFile';
import { handleShowInfoFile } from './filemanager/handleShowInfoFile';
import { handleKeyDownRemoveFile } from './filemanager/handleKeyDownRemoveFile';
import { handleChooseFolder } from './filemanager/handleChooseFolder';
import { handleCaptureKeypressRenameDir } from './filemanager/handleCaptureKeypressRenameDir';
import { handleShowContextMenu } from './filemanager/handleShowContextMenu';
import { handleContextMenuAction } from './filemanager/handleContextMenuAction';
import { handleDisableContextMenu } from './filemanager/handleDisableContextMenu';
import { handleDropFile } from './filemanager/handleDropFile';
import { handleShowUploadFileModal } from './filemanager/handleShowUploadFileModal';
import { handleCreateDir } from './filemanager/handleCreateDir';
import { handleInitRenameFolder } from 'utils/filemanager/folders/handleInitRenameFolder';
import { handleRenameFolderAction } from 'utils/filemanager/folders/handleRenameFolderAction';
import { handleRemoveDirAction } from './filemanager/handleRemoveDirAction';
//#region Files Events
export function onScroll_LoadingFilesList(e) {
    handleLoadingFilesList.call(this, e);
}
export function onChange_InfoFileChanged(e) {
    handleChangeInfoFile.call(this, e);
}
export function onMouseDown_ChooseFile(evt) {  
    handleChooseFile.call(this, evt);
}
export function onDragStart_DropFile(evt) {
    evt.preventDefault();
}
export function onDragOver_DropFile(evt) {
    evt.preventDefault();  
}
export function onDrop_DropFile(evt) {
    evt.preventDefault();
    handleDropFile.call(this, evt);
}
export function onClick_ShowModalChooseFile(evt) {
    evt.preventDefault();
    handleShowModalChooseFile.call(this, evt);
}
export function onClick_UploadFile(evt) {
    evt.preventDefault();
    handleShowUploadFileModal.call(this, evt);
}
export function onDblClick_InfoFile(evt) {
    evt.preventDefault();
    handleShowInfoFile.call(this, evt);
}
export function onKeyDown_RemoveFile(evt) {
    handleKeyDownRemoveFile.call(this, evt);    
}
//#endregion Files Events
//#region Folders Events
export function onClick_ChooseFolder(e) {
    e.preventDefault();         
    handleChooseFolder.call(this, e);
}
export function onClick_CreateDir(e) {
    e.preventDefault();  
    handleCreateDir.call(this, e);
}
export function onBlur_RenameDirName(e) {
    handleRenameFolderAction.call(this, e);
}
export function onClick_RenameDir(e) {
    handleInitRenameFolder.call(this, e);
}
export function onKeyPress_RenameDirName(e) {
    handleCaptureKeypressRenameDir.call(this, e);
}
export function onClick_RemoveDir(e) {
    e.preventDefault();
    handleRemoveDirAction.call(this, e);
}
//#endregion Folders Events
//#region Context Menu Events
export function onContextMenu_ShowContextMenu(e) {
    e.preventDefault();
    handleShowContextMenu.call(this, e);
}
export function onClick_PerformContextMenuAction(e) {
    e.preventDefault();
    handleContextMenuAction.call(this, e);
}
export function onMouseUp_DisableContextMenu(e) {
    handleDisableContextMenu.call(this, e);            
}
//#endregion Context Menu Events
