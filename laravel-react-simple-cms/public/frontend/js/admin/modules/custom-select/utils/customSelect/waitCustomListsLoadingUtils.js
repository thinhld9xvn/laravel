export function waitCustomListsLoading(elem, callback) {
    if ( elem.childElementCount > 0 ) {
        callback();
    }
    else {
        setTimeout(() => { waitCustomListsLoading(elem, callback) }, 200);
    }
}