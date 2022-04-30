import * as modalUtils from 'utils/modalUtils';
import { MODAL_IDS } from 'constants/modalConstants';
export function handleCloseEditPostTypeModal() {
    modalUtils.closePopboxModal(MODAL_IDS.EDIT_POST_TYPE);
}