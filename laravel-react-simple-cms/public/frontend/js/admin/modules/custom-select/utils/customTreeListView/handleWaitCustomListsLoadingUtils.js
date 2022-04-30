export function handleWaitCustomListsLoading(elem, callback) {
    if ( elem.childElementCount > 0 ) {
        callback();
    }
    else {
        setTimeout(() => { handleWaitCustomListsLoading(elem, callback) }, 200);
    }
}