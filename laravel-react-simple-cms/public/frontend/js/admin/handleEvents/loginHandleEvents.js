import { handleToggleStateForm } from './login/handleToggleStateForm';
import { handleChangedValue } from './login/handleChangedValue';
import { handleValidate } from './login/handleValidate';
import { handleLogin } from './login/handleLogin';
export function onClick_toggleStateForm(e) {
    e.preventDefault();
    handleToggleStateForm.call(this);
}
export function onChange_handleChangedValue(e) {
    handleChangedValue.call(this, e);
}
export function onBlur_handleValidate(e) {    
    handleValidate.call(this, e);
}
export async function onSubmit_login(e) {
    e.preventDefault();
    handleLogin.call(this);
}