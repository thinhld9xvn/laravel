export function handleTravselDeSelectPropCatNode(cat) { 
    if ( typeof(cat.selected) === 'undefined' || cat.selected ) {
        cat.selected = false;
    }
    if ( cat.childrens && cat.childrens.length ) {
        cat.childrens.map(c => handleTravselDeSelectPropCatNode(c));
    }
}