import { cloneDeep } from 'lodash';
import { handleRemoveAndSort } from "./handleRemoveAndSort";
export function handlePerformRemove(id) {
    const {originTagsData, s} = this.state;
    const {updateActiveTagsLists, updateActiveTagNode} = this.props;
    const tagsData = cloneDeep(originTagsData);        
    handleRemoveAndSort.call(this, { tagsData, id, 
                                     pointerNextFlag : s ? false : true,
                                     updateActiveTagNode, updateActiveTagsLists });    
    
}