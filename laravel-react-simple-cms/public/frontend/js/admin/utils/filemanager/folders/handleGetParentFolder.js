import {getCopiedJsonObject, isUndefined} from 'utils/libUtils';
import { handleMapSearchFolderNode } from "./handleMapSearchFolderNode";
export function handleGetParentFolder(folder, isRef = false) {
    let {folder_nodes} = this.state,
        path = folder.path,
        parent_path = '',        
        s = path.split('/');
    s.pop();
    parent_path = s.join('/').trim();
    parent_path = parent_path == '' ? this.state.root_dir_path : parent_path;
    if ( !isUndefined( this.folder_node ) ) {
        delete this.folder_node;
    }
    folder_nodes.map((fld, i) => handleMapSearchFolderNode.call(this, fld, i, parent_path, isRef));   
    return isRef ? this.folder_node : getCopiedJsonObject( this.folder_node );
}