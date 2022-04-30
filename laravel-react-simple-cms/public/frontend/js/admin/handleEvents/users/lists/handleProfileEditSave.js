import * as modalUtils from 'utils/modalUtils'
import {handleValidateSubmittedProfileForm} from '../handleValidateSubmittedProfileForm'
import {handleChangeFormToSavingMode} from '../handleChangeFormToSavingMode'
import {handleUpdateProfileToServer} from '../handleUpdateProfileToServer'
import {handleChangeFormToViewMode} from '../handleChangeFormToViewMode'
import {handleChangeFormToEditMode} from '../handleChangeFormToEditMode'
import {FORM_IDS} from 'constants/formConstants'
import { cloneDeep } from 'lodash';
import { getComponentInst } from 'utils/componentUtils'
import { COMPONENT_INST } from 'constants/componentConstants'
export async function handleProfileEditSave() {
    const { usersList, userProfile, originalUserProfile } = this.props,        
        userListIndex = usersList.findIndex(v => parseInt(v.guid) === parseInt(originalUserProfile.guid)),
        formValidationName = 'userProfileFormValidate',
        selectedRoleId = this.selectedUserRole, 
        activeUsersListInst = getComponentInst(COMPONENT_INST.USERS_TAB),
        filteredItems = cloneDeep(activeUsersListInst.state.filteredItems),
        filteredItemIndex = filteredItems.findIndex(user => user.username === originalUserProfile.username);
    const validate = handleValidateSubmittedProfileForm.call(this, FORM_IDS.EDIT_USER, formValidationName);
    if ( ! validate ) return false;
    handleChangeFormToSavingMode.call(this);
    const myUpdatedUserProfile = Object.assign(originalUserProfile, {display_name : originalUserProfile.last_name + ' ' + originalUserProfile.first_name, 
                                                                        role_id : selectedRoleId});
    this.props.updateOriginalUserProfile(myUpdatedUserProfile);
    usersList[userListIndex] = cloneDeep( myUpdatedUserProfile );
    filteredItems[filteredItemIndex] = cloneDeep( myUpdatedUserProfile );
    // kiem tra userProfile.id === originalUserProfile.id => update user profile equal active user profile
    if ( userProfile.username === myUpdatedUserProfile.username ) {
        this.props.updateUserProfile( myUpdatedUserProfile );
    }   
    this.props.updateUsersList(cloneDeep(usersList)); 
    activeUsersListInst.setState({
       data : cloneDeep(usersList),
       filteredItems : cloneDeep(filteredItems)
    });
    const {data} = await handleUpdateProfileToServer.call(this);
    if ( data.success ) {
        handleChangeFormToViewMode.call(this, formValidationName);
    }
    else {  
        modalUtils.showAlertDialog({
            title : 'Thông báo',
            message : 'Có lỗi trong quá trình cập nhật user.',
            icon : 'error',
            ok_label : 'Đồng ý',
            ok_callback : () => {
                handleChangeFormToEditMode.call(this);
            }        
        }); 
    }   
}