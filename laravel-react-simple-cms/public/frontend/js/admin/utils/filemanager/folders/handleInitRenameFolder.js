import { handleGetSelectedFolderObject } from "./handleGetSelectedFolderObject";
import { handleSetEditFolderMode } from "./handleSetEditFolderMode";
export function handleInitRenameFolder() {
    let {folder_nodes, root_dir_path, FACTION_STAT} = this.state,
        {RENAME_DIR} = FACTION_STAT,
        selectedFolderObj = handleGetSelectedFolderObject.call(this, true);
    // disable rename root dir
    if ( selectedFolderObj.path === root_dir_path ) return;      
    selectedFolderObj.edit_mode = true; 
    this.setState({ folder_nodes });
    handleSetEditFolderMode();
    this.setState({ action : RENAME_DIR });
    this.folder_node = selectedFolderObj;
}