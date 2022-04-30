import * as _ from 'utils/libUtils';
import {openPopboxModal} from "utils/modalUtils";
import {todoSearchCategoryNode} from "utils/categoryPostTypesUtils";
import { getComponentInst } from "utils/componentUtils"
import { EMPTY_PARENT_CATEGORY } from 'constants/categoryConstants'
import { MODAL_IDS } from 'constants/modalConstants';
import { COMPONENT_INST } from 'constants/componentConstants';
import { cloneDeep } from 'lodash';
export function handleEditCategoryNodeItem(id) {
    if ( !id || parseInt(id) === 0 ) return;
    const catTabInst = getComponentInst(COMPONENT_INST.CATEGORIES_TAB),
          editCatLayoutInst = getComponentInst(COMPONENT_INST.EDIT_CATEGORY_NODE),
          categoriesData = cloneDeep(catTabInst.state.categoriesData),
          categoryNodeFormValidate = cloneDeep(editCatLayoutInst.state._categoryNodeFormValidate);    
    const resultNode = todoSearchCategoryNode(categoriesData, id),
          parentResultNode = todoSearchCategoryNode(categoriesData, resultNode.parent);
    const formFields = cloneDeep(resultNode);  
    if ( editCatLayoutInst.categoryNodeSelectInst ) { 
        if ( parentResultNode ) {
            editCatLayoutInst.categoryNodeSelectInst.setValue(parentResultNode.name, parentResultNode.id);
        }
        else {
            editCatLayoutInst.categoryNodeSelectInst.setValue(EMPTY_PARENT_CATEGORY.name, EMPTY_PARENT_CATEGORY.value);
        }
        editCatLayoutInst.categoryNodeSelectInst.setHideItem(id);
    }
    editCatLayoutInst.setState({ 
        formFields,
        categoryNodeFormValidate
    }); 
    openPopboxModal(MODAL_IDS.EDIT_CATEGORY_NODE);
}