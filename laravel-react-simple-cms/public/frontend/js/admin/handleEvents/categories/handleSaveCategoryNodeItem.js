import * as _ from 'utils/libUtils';
import {showAlertDialog} from "utils/modalUtils";
import { getComponentInst } from "utils/componentUtils"
import { COMPONENT_INST } from 'constants/componentConstants';
import { FORM_IDS } from 'constants/formConstants';
import { handlecloseEditCategoryNodeModal } from "./handlecloseEditCategoryNodeModal";
import { handlePerformSaveNode } from './save/handlePerformSaveNode';
export function handleSaveCategoryNodeItem(modal_id) {
    const catTabInst = getComponentInst(COMPONENT_INST.CATEGORIES_TAB),
          catModalLayoutInst = getComponentInst(COMPONENT_INST.EDIT_CATEGORY_NODE);
    let formValidate = catModalLayoutInst.state['categoryNodeFormValidate']
                                         .formValidate;
    _.setUnFocusForm( document.getElementById(FORM_IDS.EDIT_CATEGORY_NODE) );  
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
    const {s, categoriesData} = catTabInst.state;
    const {activeCategoriesLists, updateActiveCategoriesLists, updateActiveCategoryNode} = catTabInst.props;
    const {formFields} = catModalLayoutInst.state;
    const selectedParentId = catModalLayoutInst.selectedParentCat;
    const params = {    categoriesData : s ? categoriesData : activeCategoriesLists, 
                        originCategoriesData : activeCategoriesLists,
                        formFields, 
                        selectedParentId,
                        s, 
                        updateActiveCategoriesLists, 
                        updateActiveCategoryNode    };
    handlePerformSaveNode.call(catTabInst, params);
    handlecloseEditCategoryNodeModal.call(this, modal_id);
}