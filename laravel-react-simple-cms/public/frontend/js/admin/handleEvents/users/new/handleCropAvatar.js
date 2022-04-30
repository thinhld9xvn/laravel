import * as modalUtils from 'utils/modalUtils';
import { MODAL_IDS } from 'constants/modalConstants';
function checkIsAvatarDefault(userAvatarsList) {
    const avatar_name = userAvatarsList[length].split('.'),
          n = parseInt( avatar_name );
    return ! isNaN(n) && n > 0;
}
export function handleCropAvatar() {
    const { userAvatarsList } = this.props,
          { blob, croppedImageUrl } = this.state,
          length = userAvatarsList.length - 1;          
    document.cropAvatarRef = {
        blobImage : blob
    };
    if ( ! checkIsAvatarDefault(userAvatarsList) ) {        
        userAvatarsList.splice(length, 1);
    }
    userAvatarsList.push( croppedImageUrl ); 
    const index = userAvatarsList.length - 1;
    this.props.updateUserAvatarsList(userAvatarsList);    
    this.props.updateUserSelectedAvatar(index);
    this.props.updateUserAvatarTimeStamp(Date.now());
    this.props.updateUserAvatarLoading(false);  
    modalUtils.closePopboxModal(MODAL_IDS.CROP_AVATAR);
}