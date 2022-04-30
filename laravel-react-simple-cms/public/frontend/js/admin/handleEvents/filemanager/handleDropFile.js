import { handleUploadFiles } from "utils/filemanager/files/handleUploadFiles";
export function handleDropFile(evt) {
    handleUploadFiles.call(this, evt.dataTransfer.files); 
}