import { handleParseNodeParent } from "./handleParseNodeParentUtils";
import { handleProcessCoordsList } from "./handleProcessCoordsListUtils";

export function handleChooseItemCallback(params) {
    const {nodes, data, filteredItems, node, v} = params;
    if (node.value == v) {
        node.selected = ! node.selected;
        node.pending = false;
        handleProcessCoordsList({nodes, node});
        handleParseNodeParent({nodes, node, data, filteredItems});
    }
    if (node.childrens && node.childrens.length) {
        node.childrens.map((e) => handleChooseItemCallback({nodes, data, filteredItems, node : e, v}));
    }
    return node;
}