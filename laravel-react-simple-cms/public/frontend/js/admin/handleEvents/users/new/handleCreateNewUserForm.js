import * as _ from 'utils/libUtils';
import {showAlertDialog} from 'utils/modalUtils';
import { ADMIN_AJAX_URLS } from 'constants/UrlConstants';
import {handleValidateSubmittedProfileForm} from '../handleValidateSubmittedProfileForm';
import { FORM_IDS } from 'constants/formConstants';
import { handleReloadForm } from './handleReloadForm';
import { getApi } from 'utils/apiUtils';
export async function handleCreateNewUserForm() {
    const { formFields } = this.state,
          {CREATE_NEW_USER_PROFILE_URL} = ADMIN_AJAX_URLS;
    const validate = handleValidateSubmittedProfileForm.call(this, 
                                                                FORM_IDS.NEW_USER_PROFILE, 
                                                                'newUserProfileFormValidate');
    if ( !validate ) return false;
    this.setState({ is_ajax_saving : true });
    formFields.role_id = this.selectedUserRole;
    const fd = new FormData();
    const ref = document.cropAvatarRef;
    const blobAvatarImage = ref && ref.blobImage ? ref.blobImage : null;
    Object.keys(formFields)
          .forEach(key => {
        const v = formFields[key];
        if ( (key === 'avatarName' || key === 'avatarUrl') ) return;
        fd.append(key, blobAvatarImage && key === 'avatar' ? blobAvatarImage : v);
    });    
    const results = await getApi("POST", CREATE_NEW_USER_PROFILE_URL, fd);
    const {data} = results;
    if ( data.success ) {
        showAlertDialog({
            title : 'Thông báo',
            message : 'Tạo user thành công !!!',
            icon : 'information',
            ok_label : 'Đồng ý',
            ok_callback : () => {
                handleReloadForm.call(this);
            }        
        });       
    }
    else {
        showAlertDialog({
            title : 'Thông báo',
            message : data.message || "Phát hiện lỗi khi tạo user, mời thử lại !!!",
            icon : 'error',
            ok_label : 'Đồng ý',
            ok_callback : () => {}        
        }); 
    }
    _.scrollPageToTop();
    this.setState({ is_ajax_saving : false });
}