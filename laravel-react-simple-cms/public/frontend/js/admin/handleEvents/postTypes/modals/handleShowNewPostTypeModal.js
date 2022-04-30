import {openPopboxModal} from 'utils/modalUtils';
import * as _ from 'utils/libUtils';
import { getComponentInst } from 'utils/componentUtils';
import { COMPONENT_INST } from 'constants/componentConstants';
import { MODAL_IDS } from 'constants/modalConstants';
import { handleResetFormValidateState } from 'handleEvents/users/handleResetFormValidateState';
export function handleShowNewPostTypeModal(e) {
    const formInst = getComponentInst(COMPONENT_INST.NEW_POST_TYPE_MODAL_LAYOUT);
    if ( formInst ) {
        handleResetFormValidateState.call(formInst, 'postTypeFormValidate');
        formInst.setState((state) => ({
            tabActiveId : state._tabActiveId,
            formFields: _.getCopiedJsonObject(state._formFields)
        }));
    }
    openPopboxModal(MODAL_IDS.NEW_POST_TYPE);
}