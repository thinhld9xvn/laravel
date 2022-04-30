import { CATEGORY_NODE_TYPE_ENUM } from "constants/categoryConstants";
import { handleConvertTagsListPostData } from "./tag/handleConvertTagsListPostData";
import { handleHighLightTagNode } from "./tag/handleHighLightTagNode";
import { handleRemoveHighLightTagNode } from "./tag/handleRemoveHighLightTagNode";
import { handleSortTagsByList } from "./tag/handleSortTagsByList";
import { handleTravselCheckedPropTagNode } from "./tag/handleTravselCheckedPropTagNode";
import { handleTravselDeSelectPropTagNode } from "./tag/handleTravselDeSelectPropTagNode";
import { handleTravselSelectedPropTagNode } from "./tag/handleTravselSelectedPropTagNode";
import { handleTravselUnCheckedPropTagNode } from "./tag/handleTravselUnCheckedPropTagNode";
import { handleGetUniqueId } from "./tagPostTypes/handleGetUniqueId";
import { handleGetUniqueUrl } from "./tagPostTypes/handleGetUniqueUrl";
import { handleTodoSearchTagNode } from "./tagPostTypes/handleTodoSearchTagNode";
export function renderTreeDataSelect(data) {
}
export function todoSearchTagNode(tagsData, value, isGetAllNode = false, ref = false, type = CATEGORY_NODE_TYPE_ENUM.value) {
    return handleTodoSearchTagNode({tagsData, value, isGetAllNode, ref, type});
}
export function setSelectedTagNode(tagsData, id) {   
    tagsData.map(tag => handleTravselSelectedPropTagNode(tag, id));
}
export function setDeSelectTagNode(tagsData) {   
    tagsData.map(tag => handleTravselDeSelectPropTagNode(tag));
}
export function setCheckedTagNode(tagsData, listsChecked) {   
    tagsData.map(tag => handleTravselCheckedPropTagNode(tag, listsChecked));
}
export function setUnCheckedTagNode(tagsData) {   
    tagsData.map(tag => handleTravselUnCheckedPropTagNode(tag));
}
export function setHighLightTagNode(tagsData, key) { 
    if ( !key ) return;  
    tagsData.map(tag => handleHighLightTagNode(tag, key));
}
export function removeHighLightTagNode(tagsData) {   
    tagsData.map(tag => handleRemoveHighLightTagNode(tag));
}
export function getUniqueId(tagsData) {
    return handleGetUniqueId.call(this, tagsData);
}
export function getUniqueUrl(nodes, url) {
    return handleGetUniqueUrl.call(this, nodes, url);
}
export function setConvertTagsListPostData(tagsData) {
    tagsData.map(tag => handleConvertTagsListPostData(tag));
}
export function sortTagsByList(tagsData, listTagsData) {
    return handleSortTagsByList(tagsData, listTagsData);
}