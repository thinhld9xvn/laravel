import * as modalUtils from 'utils/modalUtils'
import {MODAL_IDS} from 'constants/modalConstants'
export function handleCloseChooseAvatarDialog() {
    modalUtils.closePopboxModal(MODAL_IDS.CHOOSE_AVATAR);
}