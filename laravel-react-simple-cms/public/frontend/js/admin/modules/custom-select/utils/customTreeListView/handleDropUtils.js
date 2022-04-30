import { cloneDeep } from "lodash";
import { handleLeaveCaptureItem } from "./handleLeaveCaptureItemUtils";
import { todoSearchNode } from "./todoSearchNodeUtils";
export function handleDrop(e) {
    e.preventDefault();       
    handleLeaveCaptureItem.call(this, e);
        const targetId = e.currentTarget.id,
              fromId = e.dataTransfer.getData("node-id"),
              fromElemNode = document.getElementById(fromId);
        const targetElemNode = document.getElementById(targetId),
              fromValue = fromElemNode.dataset.value,
              targetValue = targetElemNode.dataset.value,
              data = cloneDeep(this.state.data),
              in_node = (nid, ncid) => {
                return document.getElementById(nid).closest('li').querySelector('#' + ncid) !== null;
              },
              in_parent_node = (pid, cid) => {
                const childrensNode = document.getElementById(pid).closest('li').querySelector('ul');
                if ( childrensNode ) {
                    const childrensArray = Array.from(childrensNode.querySelectorAll(':scope > li')),
                          childNode = document.getElementById(cid).closest('li');
                    return childrensArray.indexOf(childNode) !== -1;
                }
                return false;
              },
              handlePushChildPropsElem = (node, elem) => {
                if ( typeof(node.childrens) === 'undefined' ) {
                    node.childrens = [];
                }
                elem.extras.parent = node.value;
                node.childrens.push(elem);
              },
              handleRemoveChildPropsElemByIndex = (node, i) => {
                node.childrens.splice(i, 1);
                if ( node.childrens.length === 0 ) {
                    delete node.childrens;
                }
              }
        if ( targetId === fromId || in_node(fromId, targetId) || in_parent_node(targetId, fromId) ) return;
        const fromNode = todoSearchNode.call(this, data, fromValue);
        const _fromNode = cloneDeep(fromNode);
        const targetNode = todoSearchNode.call(this, data, targetValue);        
        const fromParentNode = todoSearchNode.call(this, data, fromNode.extras.parent);
        const index = fromParentNode.childrens.findIndex(n => n.value.toString() === fromNode.value.toString());
        handleRemoveChildPropsElemByIndex(fromParentNode, index);
        handlePushChildPropsElem(targetNode, _fromNode);
        this.setState({
            data : cloneDeep(data)
        });
        if ( this.props.handleSortItemCallback ) {
            setTimeout(() => {
                this.props.handleSortItemCallback(_fromNode, cloneDeep(data[0].childrens));
            }, 200);
        }
}