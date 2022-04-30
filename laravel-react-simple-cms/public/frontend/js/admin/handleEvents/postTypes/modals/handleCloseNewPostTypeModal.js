import * as modalUtils from 'utils/modalUtils';
import { MODAL_IDS } from 'constants/modalConstants';
export function handleCloseNewPostTypeModal() {
    modalUtils.closePopboxModal(MODAL_IDS.NEW_POST_TYPE);
}