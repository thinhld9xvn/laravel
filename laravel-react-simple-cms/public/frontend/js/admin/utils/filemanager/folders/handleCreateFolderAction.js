import { handleGetSelectedFolderObject } from "./handleGetSelectedFolderObject";
import { handleGetNewFolderInfo } from "./handleGetNewFolderInfo";
import { handleSetEditFolderMode } from "./handleSetEditFolderMode";
export function handleCreateFolderAction() {
    let {folder_nodes, default_folder_name, FACTION_STAT} = this.state,
        {CREATE_DIR} = FACTION_STAT,
        selected_folder_node = handleGetSelectedFolderObject.call(this, true),         
        folder_info = handleGetNewFolderInfo.call(this, default_folder_name, selected_folder_node);    
    // reference object in folder_nodes
    selected_folder_node.children.push( folder_info );
    this.setState({ folder_nodes });   
    handleSetEditFolderMode();
    this.folder_node = folder_info; // folder se thao tac  
    this.setState({ action : CREATE_DIR });
}