import * as _ from 'utils/libUtils';
import {openPopboxModal} from "utils/modalUtils";
import {todoSearchTagNode} from "utils/tagPostTypesUtils";
import { getComponentInst } from "utils/componentUtils"
import { MODAL_IDS } from 'constants/modalConstants';
import { COMPONENT_INST } from 'constants/componentConstants';
import { cloneDeep } from 'lodash';
export function handleEditTagNodeItem(id) {
    if ( !id || parseInt(id) === 0 ) return;
    const tagTabInst = getComponentInst(COMPONENT_INST.TAGS_TAB),
          editTagLayoutInst = getComponentInst(COMPONENT_INST.EDIT_TAG_NODE),
          tagsData = cloneDeep(tagTabInst.state.tagsData),
          tagNodeFormValidate = cloneDeep(editTagLayoutInst.state._tagNodeFormValidate), 
          resultNode = todoSearchTagNode(tagsData, id);
    editTagLayoutInst.setState({ 
        formFields : cloneDeep(resultNode),
        tagNodeFormValidate
    }); 
    openPopboxModal(MODAL_IDS.EDIT_TAG_NODE);
}