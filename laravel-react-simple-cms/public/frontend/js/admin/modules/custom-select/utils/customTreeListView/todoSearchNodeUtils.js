import { isUndefined } from "utils/libUtils";
import { searchNode } from "./searchNodeUtils";
export function todoSearchNode(data, value) {
    this.searchedNode = null;
    !isUndefined(value) && value !== null && 
        data.map(cnode => searchNode.call(this, cnode, value));
    return this.searchedNode;
}