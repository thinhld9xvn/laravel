export function handleAttachFeatureImage(props) {
    const {mediaPointerInst, src, alt, pathname, isImage} = props;
    const {formFields} = mediaPointerInst.state;
    if ( !isImage ) return false;
    formFields.post_thumbnail = {
        src,
        pathname,
        alt
    };
    mediaPointerInst.setState({
        formFields : {...formFields}
    });
    return true;
}