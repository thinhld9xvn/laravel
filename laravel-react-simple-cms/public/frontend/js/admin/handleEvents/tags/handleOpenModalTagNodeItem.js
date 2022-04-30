import {openPopboxModal} from "utils/modalUtils";
import { getComponentInst } from "utils/componentUtils"
import { EMPTY_PARENT_CATEGORY } from 'constants/categoryConstants'
import { MODAL_IDS } from 'constants/modalConstants';
import { COMPONENT_INST } from 'constants/componentConstants';
import { cloneDeep } from 'lodash';
export function handleOpenModalTagNodeItem() {
    const tagNodeLayoutInst = getComponentInst(COMPONENT_INST.NEW_TAG_NODE),
          tagTabInst = getComponentInst(COMPONENT_INST.TAGS_TAB),
          treeListSelect = tagNodeLayoutInst.tagNodeSelectInst,
         tagNodeActive = cloneDeep(tagTabInst.state.tagNodeActive),
         formFields = cloneDeep(tagNodeLayoutInst.state._formFields);
    if ( treeListSelect ) {
        if ( tagNodeActive ) {
            treeListSelect.setValue(tagNodeActive.name, tagNodeActive.id);
        }
        else {
            treeListSelect.setValue(EMPTY_PARENT_CATEGORY.name, EMPTY_PARENT_CATEGORY.value);
        }        
        treeListSelect.setStateDisabled(true);
    }
    tagNodeLayoutInst.setState({
        formFields : cloneDeep(formFields),
        tagNodeFormValidate : cloneDeep(tagNodeLayoutInst.state._tagNodeFormValidate)
    })
    openPopboxModal(MODAL_IDS.NEW_TAG_NODE);
}