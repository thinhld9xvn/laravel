import { ADMIN_AJAX_URLS } from "constants/UrlConstants";
import { handleKeyDownRemoveFile } from "handleEvents/filemanager/handleKeyDownRemoveFile";
import { handleGetFolderTreeNodes } from "./handleGetFolderTreeNodes";
import { handleSelectFolder } from "./handleSelectFolder";
export function handleInitLoadTrees(path) {
    const {GET_FOLDERS} = ADMIN_AJAX_URLS;
    const {root_dir_path} = this.state;
    const newPath = typeof( path ) === 'undefined' ? root_dir_path : path;
    document.removeEventListener('keydown', handleKeyDownRemoveFile.bind(this));
    handleGetFolderTreeNodes(GET_FOLDERS).then(nodes => {
        this.setState({ folder_nodes : nodes });
        handleSelectFolder.call(this, newPath);
        document.addEventListener('keydown', handleKeyDownRemoveFile.bind(this));
    });       
}