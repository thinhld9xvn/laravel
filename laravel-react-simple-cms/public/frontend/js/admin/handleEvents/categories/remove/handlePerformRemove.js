import { cloneDeep } from 'lodash';
import { handleRemoveAndSort } from "./handleRemoveAndSort";
export function handlePerformRemove(id) {
    const {originCategoriesData, s} = this.state;
    const {updateActiveCategoriesLists, updateActiveCategoryNode} = this.props;
    const categoriesData = cloneDeep(originCategoriesData);    
    handleRemoveAndSort.call(this, { categoriesData, id, 
                                     pointerNextFlag : s ? false : true, 
                                     updateActiveCategoryNode, updateActiveCategoriesLists });    
}