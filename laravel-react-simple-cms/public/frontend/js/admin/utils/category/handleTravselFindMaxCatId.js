export function handleTravselFindMaxCatId(cat, props) {
    const cid = parseInt( cat.extras.id );
    if ( cid > props.uniqueCatId ) {
        props.uniqueCatId = cid;
    }
    if ( cat.childrens ) {
        cat.childrens.map(c => handleTravselFindMaxCatId(c, props));
    }
}