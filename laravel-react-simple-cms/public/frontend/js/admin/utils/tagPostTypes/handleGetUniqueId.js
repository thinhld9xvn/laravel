import { handleTravselFindMaxTagId } from "utils/tag/handleTravselFindMaxTagId";
import { cloneDeep } from 'lodash';
import { getComponentInst } from "utils/componentUtils";
import { COMPONENT_INST } from "constants/componentConstants";
export function handleGetUniqueId(tagsData) {    
    const tagTabInst = getComponentInst(COMPONENT_INST.TAGS_TAB);
    const rmIds = cloneDeep(tagTabInst.state.rmIds);
    const props = { uniqueTagId : !rmIds.length ? 0 : rmIds.pop() };
    if ( !rmIds.length ) {
        tagsData.map(tag => handleTravselFindMaxTagId(tag, props));
    }
    return props.uniqueTagId + 1;
}