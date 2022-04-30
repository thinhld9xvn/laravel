export function handleGetNewFolderInfo(name, parent) {
    let path = this.state.root_dir_path.concat(name);
    if ( parent.path != this.state.root_dir_path ) {
        path = parent.path.concat('/', name);
    }
    if ( ! path.startsWith('/') ) {
        path = '/'.concat(path);
    }
    return {
        name : name,
        path : path,
        old_path : '',
        new_path : '',
        alias : name,
        active : false,
        disabled : false,
        edit_mode : true,
        children : []
    };
}