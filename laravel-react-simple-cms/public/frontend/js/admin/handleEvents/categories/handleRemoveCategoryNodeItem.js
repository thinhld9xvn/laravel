import {todoSearchCategoryNode} from "utils/categoryPostTypesUtils";
import { getComponentInst } from "utils/componentUtils"
import { COMPONENT_INST } from 'constants/componentConstants';
import { cloneDeep } from 'lodash';
import { closeLoadingOverlay, showLoadingOverlay } from "utils/libUtils";
import { handlePerformRemove } from "./remove/handlePerformRemove";
import { handlePerformRemoveWithSearch } from "./remove/handlePerformRemoveWithSearch";
export function handleRemoveCategoryNodeItem(id) {
    if ( !id || parseInt(id) === 0 ) return;    
    const catTabInst = getComponentInst(COMPONENT_INST.CATEGORIES_TAB);
    const {s} = catTabInst.state;
    showLoadingOverlay();
    const {rmIds, originCategoriesData} = catTabInst.state;
    handlePerformRemove.call(catTabInst, id);
    if ( s ) {
        handlePerformRemoveWithSearch.call(catTabInst, id);
    }
    const rmCatNode = todoSearchCategoryNode(originCategoriesData, id, true, false);
    if ( rmCatNode ) {
        rmIds.push(id);
        rmIds.sort();
        this.setState({ rmIds : cloneDeep(rmIds) });
    }   
    setTimeout(() => {
        closeLoadingOverlay();
    }, 200);
}