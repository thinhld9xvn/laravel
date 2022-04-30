import { cloneDeep } from 'lodash';
import { handleRemoveAndSort } from "./handleRemoveAndSort";
export function handlePerformRemoveWithSearch(id) {
    const {categoriesData : bkCategoriesData} = this.state;
    const {updateActiveCategoryNode} = this.props;
    const categoriesData = cloneDeep(bkCategoriesData);
    handleRemoveAndSort.call(this, {categoriesData, id, pointerNextFlag : true, updateActiveCategoryNode});    
}