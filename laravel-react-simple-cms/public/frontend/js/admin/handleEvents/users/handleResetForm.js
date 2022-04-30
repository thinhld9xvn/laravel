export function handleResetForm() {
    const userPassFormValidate = this.state.userPasswordFormValidate,
          oldPasswordField = userPassFormValidate.fields.oldPasswordField,
          newPasswordField = userPassFormValidate.fields.newPasswordField,
          resetFieldValidate = (field) => {
            field.error = false;
            field.errorMessage = '';
          },
          resetFormValidate = () => {
            userPassFormValidate.formValidate = false;
          };
    resetFieldValidate(oldPasswordField);
    resetFieldValidate(newPasswordField);
    resetFormValidate();
    this.setState({
        oldPassword : '',
        newPassword : '',
        userPassFormValidate
    });    
}