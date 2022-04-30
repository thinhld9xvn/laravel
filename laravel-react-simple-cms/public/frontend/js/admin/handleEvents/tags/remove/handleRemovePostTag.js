import { COMPONENT_INST } from "constants/componentConstants";
import { getComponentInst } from "utils/componentUtils";
import { cloneDeep } from "lodash";
import { setCheckedTagNode } from "utils/tagPostTypesUtils";
import { closeLoadingOverlay, showLoadingOverlay } from "utils/libUtils";
import { getPostLayoutInst } from "utils/postTypesUtils";
export function handleRemovePostTag(v) {
    showLoadingOverlay();
    const postInst = getPostLayoutInst();
    const inst = getComponentInst(COMPONENT_INST.TAGS_TAB);
    inst.setState({
        tagsData : [],
        originTagsData : []
    });
    const formFields = cloneDeep(postInst.state.formFields);
    const tagsData = cloneDeep(inst.state.protectedTagsData);
    const tagsListChosen = cloneDeep(postInst.state.tagsListChosen);    
    const tagsChosen = inst.tagsChosen;   
    const index = tagsListChosen.findIndex(tag => parseInt(tag.value) === parseInt(v));
    if ( index !== -1 ) {
        tagsListChosen.splice(index, 1);
        tagsChosen.splice(index, 1);
        setCheckedTagNode(tagsData, tagsChosen);
        formFields.post_tags = tagsListChosen.map(tag => parseInt(tag.value));
    }    
    inst.setState({
        tagsData : cloneDeep(tagsData),
        originTagsData : cloneDeep(tagsData)
    }, () => {
        postInst.setState({
            formFields : cloneDeep(formFields),
            tagsListChosen : cloneDeep(tagsListChosen)
        }, () => {
            setTimeout(() => {
                closeLoadingOverlay();
            }, 200);
        });
    });
}