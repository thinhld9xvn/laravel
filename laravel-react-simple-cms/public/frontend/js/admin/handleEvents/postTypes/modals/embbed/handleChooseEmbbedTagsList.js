import { COMPONENT_INST } from "constants/componentConstants";
import { getComponentInst } from "utils/componentUtils";
import { cloneDeep } from 'lodash';
import { handleSaveTagsListData } from "handleEvents/tags/handleSaveTagsListData";
import { closePopboxModal } from "utils/modalUtils";
import { MODAL_IDS } from "constants/modalConstants";
import { getPostLayoutInst } from "utils/postTypesUtils";
function isDiff(source, dest) {
    const l = source.length;
    if ( l !== dest.length ) return true;
    for(let i = 0; i < l; i++) {
        if ( parseInt(dest[i].value) !== parseInt(source[i].value) || 
                dest[i].name !== source[i].name ) {
            return true;
        }
    }
    return false;
}
export async function handleChooseEmbbedTagsList() {
    const inst = getComponentInst(COMPONENT_INST.TAGS_TAB);
    const postInst = getPostLayoutInst();
    const {s, protectedTagsData, tagsData} = inst.state;
    const {formFields} = postInst.state;
    if ( s ) {
        inst.setState({ s : '' });
    }
    if ( isDiff(protectedTagsData, tagsData) ) {
        await handleSaveTagsListData.call(inst);
    }
    formFields.post_tags = inst.tagsChosen.map(e => parseInt(e.value));
    postInst.setState({ tagsListChosen : cloneDeep(inst.tagsChosen),
                        formFields : cloneDeep(formFields) });
    closePopboxModal(MODAL_IDS.TAG_EMBBED);
}