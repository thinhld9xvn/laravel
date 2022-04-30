import {getCopiedJsonObject, isUndefined} from 'utils/libUtils'
export function handleMapSearchFolderNode(fld, i, path, isRef = false) {
    if ( !isUndefined( this.folder_node ) ) {
        return;
    }
    if ( fld.path === path ) {
        this.folder_node = isRef ? fld : getCopiedJsonObject( fld );
    }
    else {
        if ( fld.children.length > 0 ) {
            fld.children.map((f, k) => handleMapSearchFolderNode.call(this, f, k, path, isRef));
        }
    }
}