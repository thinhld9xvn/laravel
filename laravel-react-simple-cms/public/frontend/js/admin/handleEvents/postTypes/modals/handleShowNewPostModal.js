import { COMPONENT_INST } from "constants/componentConstants";
import { POST_ACTIONS } from "constants/globalConstants";
import { MODAL_IDS } from "constants/modalConstants";
import { getComponentInst } from "utils/componentUtils";
import { closeLoadingOverlay, scrollActiveModalToTop, showLoadingOverlay } from "utils/libUtils";
import { openPopboxModal } from "utils/modalUtils";
import { handleInitializePostLayout } from "utils/postTypes/handleInitializePostLayout";
import { cloneDeep } from 'lodash';
function showModalCallback(modalInst, heading) {
    const inst = getComponentInst(COMPONENT_INST.EDIT_POST_LAYOUT);
    inst.setState({
        embbedPostId : null,
        action : POST_ACTIONS.new,
        formFields : cloneDeep(inst.state.__formFields),
        _formFields : cloneDeep(inst.state.__formFields),
        postFormValidate : cloneDeep(inst.state._postFormValidate)
    }, async () => {
        await handleInitializePostLayout.call(inst, () => {
            setTimeout(() => {
                modalInst.setState({
                    heading : `${heading}`
                }, () => {
                    openPopboxModal(MODAL_IDS.EDIT_POST, () => {
                        setTimeout(() => {
                            scrollActiveModalToTop();
                        }, 200);
                    });          
                });
            }, 200);
        });
    });
}
export function handleShowNewPostModal() {
    showLoadingOverlay();
    const modalInst = getComponentInst(COMPONENT_INST.EDIT_POST_MODAL_LAYOUT);
    const {asyncLoading, __heading : heading} = modalInst.state;
    if ( !asyncLoading ) {
        modalInst.setState({
            asyncLoading : true            
        }, () => {
            showModalCallback(modalInst, heading);
        });
    }
    else {
        showModalCallback(modalInst, heading);
    }    
    closeLoadingOverlay();
}