import {isUserProfilePage} from 'utils/UrlUtils'
import * as modalUtils from 'utils/modalUtils'
import {uploadAvatar} from 'utils/membershipUtils'
import {MODAL_IDS} from 'constants/modalConstants'
export function handleCropAvatar() {
    const blobImage = this.state.blob,
          { userProfile, editUserModalProps } = this.props;
    let username = '';
    if ( isUserProfilePage() ) {
        username = userProfile.username;
    }
    else {
        username = editUserModalProps.userProfile.username;
    }
    uploadAvatar.call(this, blobImage, username, () => {  
        modalUtils.closePopboxModal(MODAL_IDS.CROP_AVATAR);
    });

}