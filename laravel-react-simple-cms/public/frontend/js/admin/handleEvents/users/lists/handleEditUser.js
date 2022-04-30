import * as modalUtils from 'utils/modalUtils'
import {handleCheckFormEditMode} from '../handleCheckFormEditMode'
import {MODAL_IDS} from 'constants/modalConstants'
import {handleChangeFormToViewMode} from '../handleChangeFormToViewMode'
export function handleEditUser(e) {
    const uid = e.currentTarget.dataset.uid,
          { usersList, userAvatarsList } = this.props,
          userProfile = usersList.find(u => u.guid == uid),
          id = userAvatarsList.findIndex(v => userProfile && v == userProfile.avatar);
    if ( id !== -1 ) {
        this.props.updateUserSelectedAvatar(id);
    } 
    this.props.updateEditUserModalProps({userProfile: {...userProfile}});
    this.props.updateOriginalUserProfile({...userProfile});
    handleChangeFormToViewMode.call(document.profileRef, 'userProfileFormValidate');
    modalUtils.openPopboxModal(MODAL_IDS.EDIT_USER);
}