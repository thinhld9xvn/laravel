import { closeLoadingOverlay, showLoadingOverlay } from "utils/libUtils";
import { handleCheckFolderExists } from "./handleCheckFolderExists";
import { handleGetSelectedFolderObject } from "./handleGetSelectedFolderObject";
import { handleInitLoadTrees } from "./handleInitLoadTrees";
import { handleMapSearchFolderNode } from "./handleMapSearchFolderNode";
import { handleSelectFolder } from "./handleSelectFolder";
import { handleUpdateStructDirToServer } from "./handleUpdateStructDirToServer";
export async function handleRenameFolderAction() {
    showLoadingOverlay();
    let element = document.querySelector('.tree-node-editing'),        
        {folder_nodes, default_folder_name, action, FACTION_STAT, FOLDER_ERROR_MESSAGE} = this.state,
        {CREATE_DIR} = FACTION_STAT,
        {set_name_default_error, set_name_exists_error} = FOLDER_ERROR_MESSAGE,
        selectedDirObj = handleGetSelectedFolderObject.call(this),
        folder_name_edited = element.innerText.trim(),
        names = ['', default_folder_name],
        {path} = this.folder_node,
        exitEditMode = () => {
            this.folder_node.edit_mode = false;
        },
        updateStateAction = () => {
            exitEditMode.call(this);        
            this.setState({ folder_nodes : folder_nodes,
                            keyPreview : true });
        };   
    delete this.folder_node; // reset result
    // result return [this.folder_node] object
    folder_nodes.map((fld, i) => handleMapSearchFolderNode.call(this, fld, i, path, true));
    // disable shortcut keyboard
    this.setState({ keyPreview : false });
    let boolIsExists = handleCheckFolderExists(selectedDirObj, folder_name_edited),
        boolIsValidate = names.includes( folder_name_edited );
    // exclude all names equal folder_name_editing
    if ( boolIsValidate || boolIsExists ) {
        if ( boolIsValidate ) {
            alert(set_name_default_error);
        }
        else {
            alert(set_name_exists_error);
        }
        setTimeout( () => {
            element.focus();
            document.execCommand('selectAll', false, null);
        }, 0);
        return false;
    }
    // old name equal new name
    if ( folder_name_edited.toLowerCase() === this.folder_node.name.toLowerCase() ) {        
        updateStateAction.call(this); 
        return false;
    }    
    let origin_folder_path = this.folder_node.path;
    this.folder_node.name = folder_name_edited;
    this.folder_node.alias = folder_name_edited;
    let s = this.folder_node.path.split('/');
        s.pop();
        s.push(folder_name_edited);
    this.folder_node.path = s.join('/');
    this.folder_node.old_path = action === CREATE_DIR ? '' : origin_folder_path;
    this.folder_node.new_path = this.folder_node.path;
    updateStateAction.call(this);
    const results = await handleUpdateStructDirToServer.call(this, this.folder_node);
    if ( !results ) return;
    if ( results.success ) {
        if ( action === CREATE_DIR ) {
            setTimeout(function() {
                handleSelectFolder.call(this, this.folder_node.path);
                closeLoadingOverlay();
            }.bind(this), 200);
        }
        // reload all trees
        else {
            let selectedDirPathObj = handleGetSelectedFolderObject.call(this);           
            setTimeout(function() {
                handleInitLoadTrees.call(this, selectedDirPathObj.path);
                closeLoadingOverlay();
            }.bind(this), 200);
        }
    }    
}