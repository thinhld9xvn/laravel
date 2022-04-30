import {getCopiedJsonObject} from 'utils/libUtils'
var folder = null;        
function mapSearchFolder(item, isRef) {
    if ( item.active ) {
        folder = isRef ? item : getCopiedJsonObject(item);
    }
    if ( item.children.length > 0 && folder === null ) {
        item.children.map(childItem => mapSearchFolder(childItem, isRef));
    }
};
export function handleGetSelectedFolderObject(isRef = false) {
    folder = null;
    this.state.folder_nodes.map(e => mapSearchFolder(e, isRef));
    return folder;
}