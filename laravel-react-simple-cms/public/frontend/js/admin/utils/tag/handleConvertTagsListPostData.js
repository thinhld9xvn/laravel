export function handleConvertTagsListPostData(tag) {
    tag.text = tag.name;
    tag.id = tag.name;
    if ( tag.extras ) {
        delete tag.extras;
    }
    delete tag.name;
    delete tag.value;
}