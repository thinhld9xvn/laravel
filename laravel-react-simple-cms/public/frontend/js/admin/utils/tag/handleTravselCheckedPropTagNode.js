export function handleTravselCheckedPropTagNode(tag, listsChecked) {
    if ( listsChecked.find(e => parseInt(e.value) === parseInt(tag.value) ) ) {
        tag.checked = true;
    }
    else {
        tag.checked = false;
    }
}