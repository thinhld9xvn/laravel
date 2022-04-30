import { EMPTY_PARENT_CATEGORY } from "constants/categoryConstants";
import { closeLoadingOverlay, getCopiedJsonObject, isUndefined, showLoadingOverlay } from "utils/libUtils";
import { setDeSelectCategoryNode, todoSearchCategoryNode } from "utils/categoryPostTypesUtils"
import { handleHightLightNodeName } from "utils/category/handleHightLightNodeName";
import { cloneDeep } from 'lodash';
export function handleSearchNodeItems(v) {
    const {updateActiveCategoryNode} = this.props;
    const results = [];
    const getName = (name) => {
        return name.toLowerCase().toString();
    }
    const removeChildrensProps = (item) => {
        if ( item.childrens ) {
            delete item.childrens;
        }
    }
    const linkedTravsel = (node, data) => {
        const sparentNode = todoSearchCategoryNode(data, node.extras.parent, true, true);
        if ( !sparentNode ) {
            results.push(cloneDeep(node));
            return;
        }
        const mysparentNode = cloneDeep(sparentNode);
        mysparentNode.childrens = [cloneDeep(node)];
        //
        const mysResult = todoSearchCategoryNode(results, mysparentNode.extras.parent, true, true);
        if ( mysResult ) {
            if ( mysResult.childrens ) {
                mysResult.childrens.push(mysparentNode);
            }
            else {
                mysResult.childrens = [mysparentNode];
            }
        }
        else {
            linkedTravsel(mysparentNode, data);
        }
    }
    const travsel = (node, data) => {
        const parentNode = todoSearchCategoryNode(results, node.extras.parent, true, true);        
        if ( parentNode ) {
            //console.log(parentNode);
            if ( parentNode.childrens && parentNode.childrens.length ) {
                if ( !parentNode.childrens.find(n => n.value === node.value ) ) {
                    parentNode.childrens.push(cloneDeep(node));
                }
            }
            else {
                parentNode.childrens = [cloneDeep(node)];
            }
            travsel(parentNode, data);
        }
        else {
            if ( node.extras.parent === 0 ) {
                if ( !results.find(n => n.value === node.value ) ) {
                    results.push(cloneDeep(node));
                }
            }
            else {
                linkedTravsel(node, data);
            }
        }
    }
    const mapLists = (item, data) => {
        const node = cloneDeep(item);
        removeChildrensProps(node);
        if ( getName(node.name).includes(getName(v)) ) {  
            node.name = handleHightLightNodeName(node.name, v);
            travsel(node, data);
        }
        if ( item.childrens ) {
            item.childrens.map(e => mapLists(e, data));
        }
    }
    showLoadingOverlay();
    this.setState({      
        categoryNodeSelectedValue : EMPTY_PARENT_CATEGORY.value,
        categoryNodeActive : null
    });
    updateActiveCategoryNode(null);
    let filteredData = getCopiedJsonObject(this.state.originCategoriesData);
    setDeSelectCategoryNode(filteredData);
    if ( !v ) {
        //updateActiveCategoriesLists(getCopiedJsonObject(filteredData));
        this.setState({
            categoriesData: getCopiedJsonObject(filteredData)
        });
        setTimeout(() => {
            closeLoadingOverlay();
        }, 200);
        return;
    }
    filteredData.map(e => mapLists(e, filteredData));
    this.setState({
        categoriesData: getCopiedJsonObject(results)
    });
    setTimeout(() => {
        closeLoadingOverlay();
    }, 200);
}