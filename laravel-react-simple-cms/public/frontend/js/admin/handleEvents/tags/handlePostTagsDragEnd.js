import { COMPONENT_INST } from "constants/componentConstants";
import { getComponentInst } from "utils/componentUtils";
import { cloneDeep } from "lodash";
import { closeLoadingOverlay, showLoadingOverlay } from "utils/libUtils";
import { getPostLayoutInst } from "utils/postTypesUtils";
export function handlePostTagsDragEnd(el) {
    showLoadingOverlay();
    const id = el.dataset['id'];
    const index = Array.from(el.parentElement.querySelectorAll('.ReactTags__tag')).indexOf(el);
    const postInst = getPostLayoutInst();
    const inst = getComponentInst(COMPONENT_INST.TAGS_TAB);
    if ( postInst ) {
        const {tagsListChosen, formFields} = postInst.state;        
        const tag = tagsListChosen.splice(tagsListChosen.findIndex(e => parseInt(e.value) === parseInt(id)), 1)[0];
        tagsListChosen.splice(index, 0, tag);
        formFields.post_tags = tagsListChosen.map(e => parseInt(e.value));
        inst.tagsChosen = cloneDeep(tagsListChosen);        
        postInst.setState({ tagsListChosen : cloneDeep(tagsListChosen),
                            formFields : cloneDeep(formFields) }, () => {
            setTimeout(() => {
                closeLoadingOverlay();
            }, 200);
        });
    }
}