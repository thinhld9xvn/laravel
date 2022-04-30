import { handleDisplayFListInFolder } from "../files/handleDisplayFListInFolder";
import { handleInitLoadingFilesList } from "../files/handleInitLoadingFilesList";
import { ADMIN_AJAX_URLS } from "constants/UrlConstants";
import { handleTravselFileLists } from "../files/handleTravselFileLists";
function mapFoldersDisabled(node, path) {
    if (node.path == path) {
        node.active = true;                             
    }
    else {
        if ( node.active ) node.active = false;                    
    }
    if ( ! node.disabled ) node.disabled = true;
    if ( node.children.length > 0 ) {
        node.children.map(cnode => mapFoldersDisabled(cnode, path));
    }
}

function mapFoldersEnabled(node) {
    if (node.disabled) node.disabled = false;
    if ( node.children.length > 0 ) {
        node.children.map(mapFoldersEnabled);
    }
}

export function handleSelectFolder(path) {
    const {GET_FILES_LIST} = ADMIN_AJAX_URLS;
    const {root_dir_path, folder_nodes, toolbar} = this.state;
    // disable all toolbar
    toolbar.folder.map(tb => tb.disabled = true);
    toolbar.upload.map(tb => tb.disabled = true);
    toolbar.file.map(tb => tb.disabled = true);
    // enable folder selection and disable mouse selection
    folder_nodes.map((node) => mapFoldersDisabled(node, path));
    this.setState({
        is_ajax_loading: true,
        files_scroll_paged: 1,
        toolbar,
        folder_nodes
    });
    handleDisplayFListInFolder(GET_FILES_LIST, 
                                path).then(data => {
        this.setState({ files_list : handleTravselFileLists(data) });
        handleInitLoadingFilesList.call(this);
        // enable some toolbar item
        toolbar.folder.map(tb => {
            switch (tb.navigation) {
                case 'trash directory' :
                case 'rename directory' :
                    tb.disabled = path == root_dir_path ? true : false;
                    break;
                default :
                    tb.disabled = false;
                    break;
            }
        });
        toolbar.upload.map(tb => tb.disabled = false);
        // enable folder mouse selection 
        folder_nodes.map(mapFoldersEnabled);
        this.setState({
            is_ajax_loading: false,
            toolbar,
            folder_nodes
        });        
    });
}