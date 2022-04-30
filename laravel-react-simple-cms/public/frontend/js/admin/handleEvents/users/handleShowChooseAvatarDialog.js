import * as modalUtils from 'utils/modalUtils';
import {MODAL_IDS} from 'constants/modalConstants';
import { updateProfileSelectedAvatar } from 'utils/membershipUtils';
export function handleShowChooseAvatarDialog() {
    const {userSelectedAvatar, userAvatarsList, originalUserProfile, updateUserSelectedAvatar} = this.props;
    if ( originalUserProfile ) {
        updateProfileSelectedAvatar({userSelectedAvatar, 
                                        userAvatarsList, 
                                            userProfile: originalUserProfile, 
                                                updateUserSelectedAvatar});
    }
    modalUtils.openPopboxModal(MODAL_IDS.CHOOSE_AVATAR);
}