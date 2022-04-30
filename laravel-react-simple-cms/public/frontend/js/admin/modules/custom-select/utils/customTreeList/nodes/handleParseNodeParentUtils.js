import { handleFindNode } from "./handleFindNodeUtils";
import { handleParseOrignNode } from "./handleParseOrignNodeUtils";

export function handleParseNodeParent(params) {
    const {nodes, node, data, filteredItems} = params;
    if (node) {
        const parent = handleFindNode({list: filteredItems, value : node.parentValue});
        let originNode = handleFindNode({list: data, value : node.value});                    
        if (!node.selected ) {
            handleParseOrignNode({nodes, node : originNode, parsedNode : node});
        }
        if (parent) {
            if (!parent.selected) {
                let originNode = handleFindNode({list : data, value : parent.value});        
                handleParseOrignNode({nodes, node : originNode, parsedNode : parent});
            }
            handleParseOrignNode({nodes, node : originNode, parsedNode : node});
        }
    }
}