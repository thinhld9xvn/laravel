import * as _ from 'utils/libUtils';
export function handleResetFormValidateState(form) {
    const formValidation = this.state[form],
          fieldsValidation = formValidation.fields,
          states = {};
    _.mapObject( fieldsValidation, function(e, i) {
        e.error = false;
        e.errorMessage = '';
    });
    formValidation.formValidate = true;
    states[form] = formValidation;
    this.setState(states);
}