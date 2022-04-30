import { handleHightLightNodeName } from "utils/category/handleHightLightNodeName";
import { getCopiedJsonObject, isUndefined } from "utils/libUtils";
import { todoSearchNode } from "../customTreeListView/todoSearchNodeUtils";
export function handleSearchChanged(e) {
    const results = [];
    let currentTarget = e.currentTarget,
        v = currentTarget.value,
        filteredList = getCopiedJsonObject(this.state.data);
        const getName = (name) => {
            return name.toLowerCase().toString();
        }
        const removeChildrensProps = (item) => {
            if ( item.childrens ) {
                delete item.childrens;
            }
        }
        const linkedTravsel = (node, data) => {
            const sparentNode = todoSearchNode.call(this, data, node.parentValue);
            if ( !sparentNode ) {
                results.push(getCopiedJsonObject(node));
                return;
            }
            const mysparentNode = getCopiedJsonObject(sparentNode);
            mysparentNode.childrens = [getCopiedJsonObject(node)];
            //
            const mysResult = todoSearchNode.call(this, results, mysparentNode.parentValue);
            if ( mysResult ) {
                if ( mysResult.childrens ) {
                    mysResult.childrens.push(mysparentNode);
                }
                else {
                    mysResult.childrens = [mysparentNode];
                }
            }
            else {
                linkedTravsel.call(this, mysparentNode, data);
            }
        }
        const travsel = (node, data) => {
            const parentNode = node.parentValue ? todoSearchNode.call(this, results, node.parentValue) : null;
            if ( parentNode ) {
                //console.log(parentNode);
                if ( parentNode.childrens && parentNode.childrens.length ) {
                    if ( !parentNode.childrens.find(n => n.value === node.value ) ) {
                        parentNode.childrens.push(getCopiedJsonObject(node));
                    }
                }
                else {
                    parentNode.childrens = [getCopiedJsonObject(node)];
                }
                travsel(parentNode, data);
            }
            else {
                if ( node.parentValue === 0 || !node.parentValue ) {
                    if ( !results.find(n => n.value === node.value ) ) {
                        results.push(getCopiedJsonObject(node));
                    }
                }
                else {
                    linkedTravsel.call(this, node, data);
                }
            }
        }
        const mapLists = (item, data) => {
            const node = getCopiedJsonObject(item);
            removeChildrensProps(node);
            if ( getName(node.name).includes(getName(v)) ) {
                node.name = handleHightLightNodeName(node.name, v);
                travsel.call(this, node, data);
            }
            if ( item.childrens ) {
                item.childrens.map(e => mapLists.call(this, e, data));
            }
        }
    if ( !v ) {
        this.setState({
            searchText: '',
            filteredItems: getCopiedJsonObject(filteredList)
        });     
        return;
    }
    filteredList.map(e => mapLists.call(this, e, filteredList));
    this.setState({
        searchText: v,
        filteredItems: getCopiedJsonObject(results)
    });
}