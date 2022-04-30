export function handleResetLoginFormFields(formFields) {
    formFields.username = formFields.password = '';
    this.setState({
        formFields
    });
    document.getElementById('txtUserName').focus();
}