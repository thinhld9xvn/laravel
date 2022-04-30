import { CATEGORY_NODE_TYPE_ENUM } from "constants/categoryConstants";
import { handleConvertCategoriesListPostData } from "./category/handleConvertCategoriesListPostData";
import { handleHighLightCatNode } from "./category/handleHighLightCatNode";
import { handleRemoveHighLightCatNode } from "./category/handleRemoveHighLightCatNode";
import { handleRenderTreeDataSelect } from "./category/handleRenderTreeDataSelect";
import { handleTravselDeSelectPropCatNode } from "./category/handleTravselDeSelectPropCatNode";
import { handleTravselSelectedPropCatNode } from "./category/handleTravselSelectedPropCatNode";
import { handleGetUniqueId } from "./categoryPostTypes/handleGetUniqueId";
import { handleGetUniqueUrl } from "./categoryPostTypes/handleGetUniqueUrl";
import { handleTodoSearchCategoryNode } from "./categoryPostTypes/handleTodoSearchCategoryNode";
import { cloneDeep } from 'lodash';
export function renderTreeDataSelect(data) {
    return handleRenderTreeDataSelect(data);
}
export function todoSearchCategoryNode(categoriesData, value, isGetAllNode = false, ref = false, type = CATEGORY_NODE_TYPE_ENUM.value) {
    return handleTodoSearchCategoryNode({categoriesData, value, isGetAllNode, ref, type});
}
export function setSelectedCategoryNode(categoriesData, ids) {   
    categoriesData.map(cat => handleTravselSelectedPropCatNode(cat, ids));
}
export function setDeSelectCategoryNode(categoriesData) {   
    categoriesData.map(cat => handleTravselDeSelectPropCatNode(cat));
}
export function setHighLightCategoryNode(categoriesData, key) { 
    if ( !key ) return;
    categoriesData.map(cat => handleHighLightCatNode(cat, key));
}
export function removeHighLightCategoryNode(categoriesData) {   
    categoriesData.map(cat => handleRemoveHighLightCatNode(cat));
}
export function getUniqueId(categoriesData) {
    return handleGetUniqueId.call(this, categoriesData);
}
export function getUniqueUrl(nodes, url) {
    return handleGetUniqueUrl.call(this, nodes, url);
}
export function setConvertCategoriesListPostData(categoriesData) {
    categoriesData.map(cat => handleConvertCategoriesListPostData(cat));
}
export function removeNonExistCategories(data, lists) {
    if ( !lists ) return [];
    const length = lists.length;
    const ids = [];
    for(let i = 0; i < length; i++) {
        const id = lists[i];
        const searched = todoSearchCategoryNode(data, id);
        if ( !searched ) {
            ids.push(id);
        }
    }
    ids.forEach(id => {
        lists.splice(lists.findIndex(i => i === id), 1);
    });
    return lists;
}