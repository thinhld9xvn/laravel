import {openPopboxModal} from "utils/modalUtils";
import { getComponentInst } from "utils/componentUtils"
import { EMPTY_PARENT_CATEGORY } from 'constants/categoryConstants'
import { MODAL_IDS } from 'constants/modalConstants';
import { COMPONENT_INST } from 'constants/componentConstants';
import { cloneDeep } from 'lodash';

export function handleOpenModalCategoryNodeItem() {
    const categoryNodeLayoutInst = getComponentInst(COMPONENT_INST.NEW_CATEGORY_NODE),
          categoryTabInst = getComponentInst(COMPONENT_INST.CATEGORIES_TAB),
          treeListSelect = categoryNodeLayoutInst.categoryNodeSelectInst,
         categoryNodeActive = cloneDeep(categoryTabInst.state.categoryNodeActive),
         formFields = cloneDeep(categoryNodeLayoutInst.state._formFields);
    
    if ( treeListSelect ) {

        if ( categoryNodeActive ) {
            formFields.parent = categoryNodeActive.id;
            treeListSelect.setValue(categoryNodeActive.name, categoryNodeActive.id);
        }

        else {
            formFields.parent = EMPTY_PARENT_CATEGORY.value;
            treeListSelect.setValue(EMPTY_PARENT_CATEGORY.name, EMPTY_PARENT_CATEGORY.value);
        }        
        treeListSelect.setStateDisabled(true);

    }

    categoryNodeLayoutInst.setState({
        formFields,
        categoryNodeFormValidate : cloneDeep(categoryNodeLayoutInst.state._categoryNodeFormValidate)
    })

    openPopboxModal(MODAL_IDS.NEW_CATEGORY_NODE);
}