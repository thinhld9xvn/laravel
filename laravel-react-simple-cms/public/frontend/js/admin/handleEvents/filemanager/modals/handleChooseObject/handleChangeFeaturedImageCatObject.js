export function handleChangeFeaturedImageCatObject(props) {
    const {mediaPointerInst, formFields, src, isImage} = props;
    if ( isImage ) {
        mediaPointerInst.setState({
            formFields : {...formFields, thumbnail : src}
        });
        return true;
    }
    return false;
}