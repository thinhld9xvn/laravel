import { handleTravselFindMaxCatId } from "utils/category/handleTravselFindMaxCatId";
import { cloneDeep } from 'lodash';
import { getComponentInst } from "utils/componentUtils";
import { COMPONENT_INST } from "constants/componentConstants";
export function handleGetUniqueId(categoriesData) {    
    const catTabInst = getComponentInst(COMPONENT_INST.CATEGORIES_TAB);
    const rmIds = cloneDeep(catTabInst.state.rmIds);
    const props = { uniqueCatId : !rmIds.length ? 0 : rmIds.pop() };
    if ( !rmIds.length ) {
        categoriesData.map(cat => handleTravselFindMaxCatId(cat, props));
    }
    return props.uniqueCatId + 1;
}