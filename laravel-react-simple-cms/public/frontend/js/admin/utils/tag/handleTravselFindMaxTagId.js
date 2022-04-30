export function handleTravselFindMaxTagId(tag, props) {
    const tid = parseInt( tag.extras.id );
    if ( tid > props.uniqueTagId ) {
        props.uniqueTagId = tid;
    }
}