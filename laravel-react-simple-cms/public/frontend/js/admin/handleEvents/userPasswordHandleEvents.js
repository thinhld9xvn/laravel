import { onSubmit_handleChangeUserPass } from './users/onSubmit_handleChangeUserPass';
import { handlePassFieldChanged } from './users/profile/handlePassFieldChanged';
export function onChange_handleFieldChanged(e) {
    handlePassFieldChanged.call(this, e);
}
export function onSubmit_handleForm(e) {
    e.preventDefault();    
    onSubmit_handleChangeUserPass.call(this);    
}