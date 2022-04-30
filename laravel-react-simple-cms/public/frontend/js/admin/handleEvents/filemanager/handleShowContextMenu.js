import * as _ from 'utils/libUtils';
import { getSelectedFolderObject } from 'utils/filemanager/folderUtils';
import { getListIdsPopboxModal } from 'utils/modalUtils';
export function handleShowContextMenu(e) {
    const contextMenuWidth = 250;   
    let {FCONTEXT_MENU_STAT : context_menu} = this.state,
        element = e.currentTarget,
        context = element.dataset.contextmenu,
        X = 0,
        item = ! _.isUndefined( element.dataset.item ) ? JSON.parse( element.dataset.item ) : null;
    if ( ! context_menu[context].show ) {
        context_menu[context].show = true;
    }
    if ( context == 'folder' ) {
        X = e.pageX - element.clientWidth - contextMenuWidth;
        if (getListIdsPopboxModal().length) {
            X -= 100;
        } 
    }
    else { 
        X = e.pageX - element.clientWidth - contextMenuWidth;
    }
    context_menu[context].X = X;
    context_menu[context].Y = e.pageY;
    // file context menu
    if ( item === null ) {
        this.folder_node = getSelectedFolderObject.call(this, false);
    }
    // folder context menu
    else {
        this.folder_node = item;
    }
    this.setState({ FCONTEXT_MENU_STAT : context_menu });
}