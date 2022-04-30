import { handleConvertFileSize } from './files/handleConvertFileSize';
import { handleGetURLUploadPath } from './files/handleGetURLUploadPath';
import { handleDisplayFListInFolder } from './files/handleDisplayFListInFolder';
import { handleInitLoadingFilesList } from './files/handleInitLoadingFilesList';
import { handleLoadingFilesList } from './files/handleLoadingFilesList';
import { handleGetSelectedFiles } from './files/handleGetSelectedFiles';
import { handleDeSelectAllFiles } from './files/handleDeSelectAllFiles';
import { handleUploadFiles } from './files/handleUploadFiles';
import { handleRemoveFile } from './files/handleRemoveFile';
import { handleGetEditorImageSrc } from './files/handleGetEditorImageSrc';
import { handleGetEditorImageSize } from './files/handleGetEditorImageSize';
import { handleCheckImageType } from './files/handleCheckImageType';
export function convertFileSize(size) {
    return handleConvertFileSize(size);
}
export function getURLUploadPath() {
    return handleGetURLUploadPath();
}
export async function displayFListInFolder(ajax_url, path) {    
    return handleDisplayFListInFolder(ajax_url, path);
}
export function LoadingFilesList(files_list, num_per_page, paged) {
    return handleLoadingFilesList(files_list, num_per_page, paged);
}
export function initLoadingFilesList() {
    handleInitLoadingFilesList.call(this);
}
export function getSelectedFiles() {
    return handleGetSelectedFiles.call(this);
}
export function deSelectAllFiles() {
    handleDeSelectAllFiles.call(this);
}
export function uploadFiles(ufs) {
    handleUploadFiles.call(this, ufs);
}
export function onRemoveFile() {
    handleRemoveFile.call(this);
}
export function getEditorImageSrc(image) {
    return handleGetEditorImageSrc(image);
}
export function getEditorImageSize(image) {
    return handleGetEditorImageSize(image);
}
export function isImageType(image) {
    return handleCheckImageType(image);
}
export function getAttachmentPathFromUrl(url, key = 'avatars') {
    if (!url) return '';
    const pkey = key + '/';
    const index = url.indexOf(pkey);
    const v = url.substr(index + pkey.length);
    return v.split('?')[0];
}