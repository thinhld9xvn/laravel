import * as modalUtils from 'utils/modalUtils'
import { MODAL_IDS } from 'constants/modalConstants';
import { closeLoadingOverlay, showLoadingOverlay } from 'utils/libUtils';
import { setActivePostTypeWhenEditHook } from 'hooks/postTypeHook/setActivePostTypeWhenEditHook';
export function handleShowEditPostTypeModal(e) {
    showLoadingOverlay();
    const pid = e.currentTarget.dataset.pid;
    setActivePostTypeWhenEditHook.call(this, pid);
    closeLoadingOverlay();
    modalUtils.openPopboxModal(MODAL_IDS.EDIT_POST_TYPE);    
}