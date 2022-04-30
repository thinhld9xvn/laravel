import * as _ from 'utils/libUtils';
import { cloneDeep } from 'lodash';
import {showAlertDialog} from "utils/modalUtils";
import { getComponentInst } from "utils/componentUtils"
import { COMPONENT_INST } from 'constants/componentConstants';
import { FORM_IDS } from 'constants/formConstants';
import { handlecloseEditTagNodeModal } from "./handlecloseEditTagNodeModal";
import { handlePerformSaveNode } from './save/handlePerformSaveNode';
export function handleSaveTagNodeItem(modal_id) {
    const tagTabInst = getComponentInst(COMPONENT_INST.TAGS_TAB),
          tagModalLayoutInst = getComponentInst(COMPONENT_INST.EDIT_TAG_NODE);
    let formValidate = tagModalLayoutInst.state['tagNodeFormValidate']
                                         .formValidate;
    _.setUnFocusForm( document.getElementById(FORM_IDS.EDIT_TAG_NODE) );  
    if ( ! formValidate ) {
        showAlertDialog({
            title : 'Thông báo',
            message : 'Mời nhập đầy đủ các trường thông tin theo yêu cầu !!!',
            icon : 'error',
            ok_label : 'Đồng ý',
            ok_callback : () => {}
        });
        return false;
    }
    const {s, tagsData} = tagTabInst.state;
    const {activeTagsLists, updateActiveTagsLists, updateActiveTagNode} = tagTabInst.props;
    const {formFields} = tagModalLayoutInst.state;
    const params = {tagsData : s ? tagsData : activeTagsLists, 
                    originTagsData : activeTagsLists,
                    formFields,
                    s,
                    updateActiveTagsLists,
                    updateActiveTagNode};
    handlePerformSaveNode.call(tagTabInst, params);
    handlecloseEditTagNodeModal.call(this, modal_id);
}