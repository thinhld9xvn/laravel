// kiem tra trong {parent} co chua {fld} khong ?
// kiem tra o level thu nhat
export function handleCheckFolderExists( parent, fld_name ) {
    if ( parent.children.length > 0 ) {
        return parent.children.filter( f => f['name'].toLowerCase() === fld_name.toLowerCase() ).length > 0;
    }
    return false;
}