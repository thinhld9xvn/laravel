import { cloneDeep } from 'lodash';
import { handleRemoveAndSort } from "./handleRemoveAndSort";
export function handlePerformRemoveWithSearch(id) {
    const {tagsData : bkTagsData} = this.state;
    const {updateActiveTagNode} = this.props;
    const tagsData = cloneDeep(bkTagsData);
    handleRemoveAndSort.call(this, {tagsData, id, pointerNextFlag : true, updateActiveTagNode});    
}