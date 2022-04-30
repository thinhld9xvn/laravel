import { COMPONENT_INST } from "constants/componentConstants";
import { POST_ACTIONS } from "constants/globalConstants";
import { MODAL_IDS } from "constants/modalConstants";
import { getComponentInst } from "utils/componentUtils";
import { closeLoadingOverlay, scrollActiveModalToTop, showLoadingOverlay } from "utils/libUtils";
import { openPopboxModal } from "utils/modalUtils";
import { handleInitializePostLayout } from "utils/postTypes/handleInitializePostLayout";
function showModalCallback(modalInst, heading, id) {
    const inst = getComponentInst(COMPONENT_INST.EDIT_POST_LAYOUT);
    inst.setState({
        embbedPostId : id,
        action : POST_ACTIONS.edit
    }, async () => {
        await handleInitializePostLayout.call(inst, () => {
            setTimeout(() => {
                const {_formFields} = inst.state;
                const {post_title} = _formFields;
                modalInst.setState({
                    heading : `${heading}: "${post_title}"`
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
export function handleShowEditPostModal(id) {
    showLoadingOverlay();
    const modalInst = getComponentInst(COMPONENT_INST.EDIT_POST_MODAL_LAYOUT);
    const {asyncLoading, _heading : heading} = modalInst.state;
    if ( !asyncLoading ) {
        modalInst.setState({
            asyncLoading : true
        }, () => {
            showModalCallback(modalInst, heading, id);
        });
    }
    else {
        showModalCallback(modalInst, heading, id);
    }    
    this.markupRowId = id;
    document.querySelector(`#row-${id}`)
            .parentElement
            .querySelectorAll('.rdt_TableRow')
            .forEach(r => r.classList.remove('bg-row-markup'));
    document.querySelector(`#row-${id}`).classList.add('bg-row-markup');
    closeLoadingOverlay();
}