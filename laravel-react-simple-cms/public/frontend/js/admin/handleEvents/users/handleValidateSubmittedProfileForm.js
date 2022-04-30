import * as _ from 'utils/libUtils'
import * as modalUtils from 'utils/modalUtils'
export function handleValidateSubmittedProfileForm(id, form) {
    _.setUnFocusForm( document.getElementById(id) );
    let formValidate = this.state[form].formValidate;
    const selectedRoleId = this.selectedUserRole;
    if ( ! formValidate ) {
        modalUtils.showAlertDialog({
            title : 'Thông báo',
            message : 'Mời nhập đầy đủ các trường thông tin theo yêu cầu !!!',
            icon : 'error',
            ok_label : 'Đồng ý',
            ok_callback : () => {}
    
        });
        return false;
    }

    if ( selectedRoleId === '' ) {
        modalUtils.showAlertDialog({
            title : 'Thông báo',
            message : 'Mời chọn một vai trò người dùng !!!',
            icon : 'error',
            ok_label : 'Đồng ý',
            ok_callback : () => {}
        });
        return false;
    }
    return true;
}