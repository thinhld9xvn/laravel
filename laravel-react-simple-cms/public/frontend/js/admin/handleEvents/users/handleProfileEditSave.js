import * as _ from 'utils/libUtils';
import * as modalUtils from 'utils/modalUtils';
import { FORM_IDS } from 'constants/formConstants';
import { saveClientUserInfo } from 'utils/membershipUtils'
import {handleValidateSubmittedProfileForm} from './handleValidateSubmittedProfileForm';
import {handleChangeFormToSavingMode} from './handleChangeFormToSavingMode';
import {handleUpdateProfileToServer} from './handleUpdateProfileToServer';
import {handleChangeFormToViewMode} from './handleChangeFormToViewMode';
import {handleChangeFormToEditMode} from './handleChangeFormToEditMode';
export async function handleProfileEditSave() {
    const originalUserProfile = this.props.originalUserProfile,
          formValidationName = 'userProfileFormValidate',
          selectedRoleId = this.selectedUserRole,
          selectedUserRole = this.props.userRolesList.filter(e => parseInt( e['id'] ) === parseInt( selectedRoleId ) )[0],
          validate = handleValidateSubmittedProfileForm.call(this, FORM_IDS.USER_PROFILE, formValidationName);
    if ( ! validate ) return false;
    handleChangeFormToSavingMode.call(this); 
    const originalUpdatedUserProfile = {...originalUserProfile, display_name : originalUserProfile.last_name + ' ' + originalUserProfile.first_name,
                                                                role_id : selectedRoleId,
                                                                role_name : selectedUserRole.name}
    this.props.updateUserProfile({...originalUpdatedUserProfile}); 
    this.props.updateOriginalUserProfile({...originalUpdatedUserProfile});     
    const {data} = await handleUpdateProfileToServer.call(this);
    if ( data.success ) {
        handleChangeFormToViewMode.call(this, formValidationName);
        saveClientUserInfo({...originalUpdatedUserProfile});
    }
    else {          
        modalUtils.showAlertDialog({
            title : 'Thông báo',
            message : data.errors || 'Phát hiện lỗi trong quá trình update dữ liệu !',
            icon : 'error',
            ok_label : 'Đồng ý',
            ok_callback : () => {
                handleChangeFormToEditMode.call(this);
            }
        });
    }
}