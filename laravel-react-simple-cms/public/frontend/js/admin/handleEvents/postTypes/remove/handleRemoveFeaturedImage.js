export function handleRemoveFeaturedImage() {
    const {formFields} = this.state;
    formFields.post_thumbnail = {
        src : '',
        alt : ''
    }
    this.setState({
        formFields : {...formFields}
    });
}