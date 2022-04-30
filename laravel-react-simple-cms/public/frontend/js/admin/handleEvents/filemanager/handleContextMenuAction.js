import { handleDisableContextMenu } from "./handleDisableContextMenu";
import { handleShowInfoFile } from './handleShowInfoFile';
import { handleCreateFolderAction } from "utils/filemanager/folders/handleCreateFolderAction";
import { handleRenameFolderAction } from "utils/filemanager/folders/handleRenameFolderAction";
import { handleRemoveFolderAction } from "utils/filemanager/folders/handleRemoveFolderAction";
import { handleRemoveFile } from "utils/filemanager/files/handleRemoveFile";
import { handleRemoveDirAction } from "./handleRemoveDirAction";
import { handleInitRenameFolder } from "utils/filemanager/folders/handleInitRenameFolder";
function handleMapFolder(fld, folder_node) {
    if ( fld.path == folder_node.path ) {
        fld.active = true;
    }
    else {
        if ( fld.active ) {
            fld.active = false;
        }
    }
    if ( fld.children.length > 0 ) {
        fld.children.map((item) => handleMapFolder(item, folder_node));
    }
}
export function handleContextMenuAction(e) {
    let target = e.currentTarget,
        {folder_nodes} = this.state,
        folder_node = this.folder_node,
        command = target.attributes["arial-command"]
                        .value.toString().trim();    
    folder_nodes.map((item) => handleMapFolder(item, folder_node));
    this.setState({ folder_nodes });
    handleDisableContextMenu.call(this);
    switch (command) {
        case 'new_dir' :
            handleCreateFolderAction.call(this);
            break;
        case 'ren_dir' :
            //handleRenameFolderAction.call(this);
            handleInitRenameFolder.call(this);
            break;
        case 'trash_dir' :
            handleRemoveDirAction.call(this);
            break;
        case 'info_file' :
            handleShowInfoFile.call(this);
            break;
        case 'trash_file' :
            handleRemoveFile.call(this);
            break;
        default :
            break;
    }
}