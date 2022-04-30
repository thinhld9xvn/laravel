import * as _ from 'utils/libUtils';
import * as modalUtils from 'utils/modalUtils';
import { ADMIN_AJAX_URLS } from 'constants/UrlConstants';
import { FORM_IDS } from 'constants/formConstants';
import {handleResetForm} from './handleResetForm';
import { cloneDeep } from 'lodash';
import { getApi } from 'utils/apiUtils';
export async function onSubmit_handleChangeUserPass() {
    const {CHANGE_PASSWORD_URL} = ADMIN_AJAX_URLS;
    const {originalUserProfile : activeUserProfile, userProfile, updateUserProfile} = this.props;
    _.setUnFocusForm( document.getElementById(FORM_IDS.USER_PASSWORD) );
    if ( ! this.state.userPasswordFormValidate.formValidate ) {
        modalUtils.showAlertDialog({
            title : 'Thông báo',
            message : 'Mời nhập đầy đủ thông tin các trường theo yêu cầu !',
            icon : 'error',
            ok_label : 'Đồng ý',
            ok_callback : () => {}
        });
        return false;
    }
    const {oldPassword, newPassword} = this.state;
    const fd = new FormData();
    fd.append('old_password', oldPassword);
    fd.append('new_password', newPassword);
    fd.append('username', activeUserProfile.username);
    const results = await getApi("POST", CHANGE_PASSWORD_URL, fd);
    const {data} = results,
        updateNewPassword = () => {
            if ( userProfile.username === activeUserProfile.username ) {
                userProfile.password = newPassword;
            }
            updateUserProfile( cloneDeep(userProfile) );
        },
        successChangedPassword = () => {  
            modalUtils.showAlertDialog({
                title : 'Thông báo',
                message : 'Thay đổi mật khẩu thành công !!!',
                icon : 'information',
                ok_label : 'Đồng ý',
                ok_callback : () => {
                    updateNewPassword();
                    handleResetForm.call(this);
                }
            });                
        },
        failChangedPassword = () => {  
            modalUtils.showAlertDialog({
                title : 'Thông báo',
                message : data.messages || 'Có lỗi xảy ra trong quá trình đổi mật khẩu !!!',
                icon : 'error',
                ok_label : 'Đồng ý',
                ok_callback : () => {}
            });
        };                
    if ( data.success ) {
        successChangedPassword();
    }
    else {
        failChangedPassword();
    }
    handleResetForm.call(this);    
}