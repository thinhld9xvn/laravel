export function handleTravselSelectedPropTagNode(tag, tid) {
    if ( tag.value.toString() === tid.toString() ) {
        tag.selected = true;
    }
    else {
        tag.selected = false;
    }
}