import * as _ from 'utils/libUtils'
export function handleResetUserPassFormState() {
    const { userPasswordFormValidate } = this.state,
          fieldsValidation = userPasswordFormValidate.fields;          
    _.mapObject( fieldsValidation, function(e, i) {
        e.error = false;
        e.errorMessage = '';
    });
    userPasswordFormValidate.formValidate = true;
    this.setState({
        userPasswordFormValidate
    });
}