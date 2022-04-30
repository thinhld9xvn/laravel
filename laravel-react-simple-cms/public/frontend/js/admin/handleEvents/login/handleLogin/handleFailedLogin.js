import * as modalUtils from 'utils/modalUtils'
import { handleResetLoginFormFields } from './handleResetLoginFormFields';
export function handleFailedLogin(formFields) {
    modalUtils.showAlertDialog({
        title : 'Thông báo',
        message : 'Username hoặc mật khẩu không đúng !!! Mời nhập lại.',
        icon : 'error',
        ok_label : 'Đồng ý',
        ok_callback : () => {
            handleResetLoginFormFields.call(this, formFields);
        }        
    });           
}