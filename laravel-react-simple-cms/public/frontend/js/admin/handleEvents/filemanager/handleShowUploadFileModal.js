import * as modalUtils from 'utils/modalUtils';
import { MODAL_IDS } from 'constants/modalConstants';
export function handleShowUploadFileModal() {
    modalUtils.openPopboxModal(MODAL_IDS.FILE_UPLOAD);
}