import * as modalUtils from 'utils/modalUtils'
import {handleCropAvatarModal} from './handleCropAvatarModal'
import {MODAL_IDS} from 'constants/modalConstants'
export function handleCloseCropAvatarModal() {
    handleCropAvatarModal.call(this);
    modalUtils.closePopboxModal(MODAL_IDS.CROP_AVATAR);
}