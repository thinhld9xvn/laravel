import {todoSearchCategoryNode, setSelectedCategoryNode, setHighLightCategoryNode} from "utils/categoryPostTypesUtils";
import { EMPTY_PARENT_CATEGORY } from 'constants/categoryConstants'
import { cloneDeep } from 'lodash';
function handleRemoveChildPropsElemByIndex(node, i) {
    node.childrens.splice(i, 1);
    if ( node.childrens.length === 0 ) {
        delete node.childrens;
    }
}
function handlePushChildPropsElem(node, elem) {
    if ( typeof(node.childrens) === 'undefined' ) {
        node.childrens = [];        
    }
    elem.extras.parent = node.value;
    node.childrens.push(elem);
}
function searchAndUpdateNode(params) {
    const {data, selectedParentId, activeCatNode} = params;
    const targetNode = todoSearchCategoryNode(data, selectedParentId, true, true);     
    const resultNode = todoSearchCategoryNode(data, activeCatNode.id, true, true); 
    resultNode.name = activeCatNode.name;
    resultNode.value = activeCatNode.id;
    resultNode.extras = cloneDeep(activeCatNode);
    if ( selectedParentId.toString() !== resultNode.extras.parent.toString() ) {
        resultNode.extras.parent = selectedParentId;
        if ( targetNode) {
            handlePushChildPropsElem(targetNode, resultNode);
        }
        else {
            resultNode.extras.parent = EMPTY_PARENT_CATEGORY.value;
            data.push(resultNode);
        }
        //
        const activeCatParentNode = todoSearchCategoryNode(data, activeCatNode.parent, true, true);
        if ( activeCatParentNode && activeCatParentNode.childrens ) {
            const index = activeCatParentNode.childrens.findIndex(n => n.value.toString() === activeCatNode.id.toString());
            handleRemoveChildPropsElemByIndex(activeCatParentNode, index);
        }
        else {
            const index = data.findIndex(n => n.value.toString() === activeCatNode.id.toString());
            data.splice(index, 1);
        }
    }
}
export function handlePerformSaveNode(params) {
    const {categoriesData, originCategoriesData, formFields, selectedParentId, s, updateActiveCategoriesLists, updateActiveCategoryNode} = params;
    const data = cloneDeep(categoriesData);
    const originData = cloneDeep(originCategoriesData);
    const activeCatNode = cloneDeep(formFields); // extras properties
    searchAndUpdateNode({data, selectedParentId, activeCatNode});
    searchAndUpdateNode({data : originData, selectedParentId, activeCatNode});
    //
    setHighLightCategoryNode(data, s);
    setSelectedCategoryNode(data, activeCatNode.id);
    setSelectedCategoryNode(originData, activeCatNode.id);
    updateActiveCategoriesLists(cloneDeep(originData));
    if ( s ) {
        this.setState({ categoriesData : cloneDeep(data) });
    }
    updateActiveCategoryNode(cloneDeep(activeCatNode));
}