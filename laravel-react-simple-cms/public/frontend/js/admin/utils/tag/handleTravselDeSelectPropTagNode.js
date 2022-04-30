export function handleTravselDeSelectPropTagNode(tag) { 
    if ( typeof(tag.selected) === 'undefined' || tag.selected ) {
        tag.selected = false;
    }
}