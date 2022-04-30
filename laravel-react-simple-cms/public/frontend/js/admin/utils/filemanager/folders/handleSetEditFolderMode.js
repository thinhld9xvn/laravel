export function handleSetEditFolderMode() {
    let t = setInterval(function() {
        let element = document.querySelector('.tree-node-editing');
        if ( element !== null ) {
            clearInterval(t);
            //console.log(element);
            element.focus();
            document.execCommand('selectAll', false, null);
        }
    }, 200);
}