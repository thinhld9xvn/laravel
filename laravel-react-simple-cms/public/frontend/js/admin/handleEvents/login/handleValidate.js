import { handleCheckFormValidation } from "handleValidate/utils/handleCheckFormValidation";
export function handleValidate(e) {
    const v = e.currentTarget.value.trim(),
          fieldName = e.currentTarget.dataset.fieldname,
          formValidation = this.state.loginFormValidation,
          formFields = formValidation.fields,
          targetField = formFields[fieldName],
          errorMessages = formValidation.errorMessages;          
    if ( v == '' ) {
        targetField.error = true;
        targetField.error_message = errorMessages.requiredError;
    }
    else {
        targetField.error = false;
        targetField.error_message = '';
    }
    formValidation.formValidation = handleCheckFormValidation.call(this, 'loginFormValidation');
    this.setState({
        loginFormValidation : formValidation
    });
}