import { getCopiedJsonObject, isUndefined } from "utils/libUtils";
import { todoSearchCategoryNode } from "utils/categoryPostTypesUtils"
import { handleHightLightNodeName } from "utils/category/handleHightLightNodeName";
import { cloneDeep } from 'lodash';
export function handleSearchChanged(e) {
    const results = [];
    let currentTarget = e.currentTarget,
        v = currentTarget.value;
    const getName = (name) => {
        return name.toLowerCase().toString();
    }
    const removeChildrensProps = (item) => {
        if ( item.childrens ) {
            delete item.childrens;
        }
    }
    const linkedTravsel = (node, data) => { // duyệt ngược lại từ node tìm thấy cho đến danh mục cha cấp đầu tiên rồi push lần lượt vô results
        const sparentNode = todoSearchCategoryNode(data, node.extras.parent, true, true);
        if ( !sparentNode ) {
            results.push(cloneDeep(node));
            return;
        }
        const mysparentNode = cloneDeep(sparentNode);
        mysparentNode.childrens = [cloneDeep(node)];
        //            
        //console.log(mysparentNode);
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
        if ( isUndefined(node.visible) || node.visible ) {
            if ( getName(node.name).includes(getName(v)) ) {  
                travsel(node, data);
            }
            if ( item.childrens ) {
                item.childrens.map(e => mapLists(e, data));
            }
        }
    }
    const filteredData = getCopiedJsonObject(this.state.data);
    if ( !v ) {
        this.setState({
            searchText : '',
            filteredItems: getCopiedJsonObject(filteredData)
        });
        return;
    }
    const firstNode = filteredData.splice(0, 1)[0];
    filteredData.map(e => mapLists(e, filteredData));
    results.splice(0, 0, firstNode);
    this.setState({
        searchText : v,
        filteredItems: getCopiedJsonObject(results)
    });
}