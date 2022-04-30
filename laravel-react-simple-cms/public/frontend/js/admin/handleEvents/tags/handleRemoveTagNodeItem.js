import {todoSearchTagNode} from "utils/tagPostTypesUtils";
import { getComponentInst } from "utils/componentUtils"
import { COMPONENT_INST } from 'constants/componentConstants';
import { cloneDeep } from 'lodash';
import { closeLoadingOverlay, showLoadingOverlay } from "utils/libUtils";
import { handlePerformRemove } from "./remove/handlePerformRemove";
import { handlePerformRemoveWithSearch } from "./remove/handlePerformRemoveWithSearch";
export function handleRemoveTagNodeItem(id) {
    if ( !id || parseInt(id) === 0 ) return;    
    const tagsTabInst = getComponentInst(COMPONENT_INST.TAGS_TAB);
    const {s} = tagsTabInst.state;
    showLoadingOverlay();
    const {rmIds, originTagsData} = tagsTabInst.state;
    handlePerformRemove.call(tagsTabInst, id);
    if ( s ) {
        handlePerformRemoveWithSearch.call(tagsTabInst, id);
    }
    const rmCatNode = todoSearchTagNode(originTagsData, id, true, false);
    if ( rmCatNode ) {
        rmIds.push(id);
        rmIds.sort();
        this.setState({ rmIds : cloneDeep(rmIds) });
    }   
    setTimeout(() => {
        closeLoadingOverlay();
    }, 200);
}