import { ADMIN_AJAX_URLS } from "constants/UrlConstants";
import { getApi } from "utils/apiUtils";
import { handleGetParentFolder } from "./handleGetParentFolder";
import { handleGetSelectedFolderObject } from "./handleGetSelectedFolderObject";
import { handleInitLoadTrees } from "./handleInitLoadTrees";
export async function handleRemoveFolderAction() {
    const {UPDATE_DIR_STRUCTURES} = ADMIN_AJAX_URLS;
    let fd = new FormData(),
        selectedDirObj = handleGetSelectedFolderObject.call(this),
        path = selectedDirObj.path,
        parentFolder = handleGetParentFolder.call(this, selectedDirObj); 
    // disable remove root dir
    if ( path === this.state.root_dir_path ) return; 
    fd.append("path", path);
    fd.append('action', "remove");
    const response = await getApi("POST", UPDATE_DIR_STRUCTURES, fd);
    if ( !response ) return;
    const results = response.data;
    if ( results.success ) {
        setTimeout(function() {
            handleInitLoadTrees.call(this, parentFolder.path);
        }.bind(this), 200);
    }
}