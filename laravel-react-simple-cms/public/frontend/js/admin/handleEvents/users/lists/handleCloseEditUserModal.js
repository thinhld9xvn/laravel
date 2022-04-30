import * as modalUtils from 'utils/modalUtils'
import {MODAL_IDS} from 'constants/modalConstants'
export function handleCloseEditUserModal() {
    modalUtils.closePopboxModal(MODAL_IDS.EDIT_USER);
}