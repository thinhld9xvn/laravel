export function handleTravselSelectedPropCatNode(cat, ids) {
    const myids = Array.isArray(ids) ? ids.map(e => parseInt(e)) : [ids];
    const v = parseInt(cat.value);
    if ( myids.indexOf(v) !== -1 ) {
        cat.selected = true;
    }
    else {
        cat.selected = false;
    }
    if ( cat.childrens && cat.childrens.length ) {
        cat.childrens.map(c => handleTravselSelectedPropCatNode(c, ids));
    }
}