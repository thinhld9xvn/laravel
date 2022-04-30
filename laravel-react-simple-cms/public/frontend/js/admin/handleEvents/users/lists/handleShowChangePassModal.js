import * as modalUtils from 'utils/modalUtils'
import {handleResetUserPassFormState} from './handleResetUserPassFormState'
import {MODAL_IDS} from 'constants/modalConstants'
export function showChangePassModal() {
    if ( document.changeUserPassRef ) {
        handleResetUserPassFormState.call(document.changeUserPassRef);
    }
    modalUtils.openPopboxModal(MODAL_IDS.CHANGE_PASSWORD);
}