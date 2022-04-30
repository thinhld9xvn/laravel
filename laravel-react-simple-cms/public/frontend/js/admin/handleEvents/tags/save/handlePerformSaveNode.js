import {todoSearchTagNode, setSelectedTagNode, setHighLightTagNode, setCheckedTagNode, removeHighLightTagNode} from "utils/tagPostTypesUtils";
import { cloneDeep } from 'lodash';
function searchAndUpdateNode(params) {
    const {data, activeTagNode} = params;
    const resultNode = todoSearchTagNode(data, activeTagNode.id, true, true); 
    resultNode.name = activeTagNode.name;
    resultNode.value = activeTagNode.id;
    resultNode.extras = cloneDeep(activeTagNode);
}
export function handlePerformSaveNode(params) {
    const {tagsData, originTagsData, formFields, s, updateActiveTagsLists, updateActiveTagNode} = params;
    const data = cloneDeep(tagsData);
    const originData = cloneDeep(originTagsData);
    const activeTagNode = cloneDeep(formFields); // extras properties
    removeHighLightTagNode(data);
    removeHighLightTagNode(originData);
    //
    searchAndUpdateNode({data, activeTagNode});
    searchAndUpdateNode({data : originData, activeTagNode});
    //
    setHighLightTagNode(data, s);
    setSelectedTagNode(data, activeTagNode.id);
    setCheckedTagNode(data, this.tagsChosen);
    setSelectedTagNode(originData, activeTagNode.id);
    setCheckedTagNode(originData, this.tagsChosen);
    updateActiveTagsLists(cloneDeep(originData));
    if ( s ) {
        this.setState({ tagsData : cloneDeep(data) });
    }       
    updateActiveTagNode(cloneDeep(activeTagNode));
}