import { saveClientUserInfo } from 'utils/membershipUtils';
import {handleResetLoginFormFields} from './handleResetLoginFormFields';
export function handleSuccessLogin(data) {
    const {formFields, userInfoData, redirect_url} = data;
    handleResetLoginFormFields.call(this, formFields);
    saveClientUserInfo(userInfoData);
    window.location.href = redirect_url;
}