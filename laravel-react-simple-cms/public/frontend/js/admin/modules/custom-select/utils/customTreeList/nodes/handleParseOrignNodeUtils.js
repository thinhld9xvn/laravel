import { isUndefined } from "utils/libUtils";

export function handleParseOrignNode(params) {
    const {nodes, node, parsedNode} = params;
    let   isSearched = false,
            addExtraInfo = (nodeResult, info) => {
            if ( isUndefined(nodeResult.extras) ) { 
                nodeResult.extras = []; 
            }
            const index = nodeResult.extras.findIndex(v => v === parsedNode.value);
            if ( index !== -1 ) {
                nodeResult.extras.splice(index, 1);
            }
            nodeResult.extras.push(info);
            },
            mapNodeLists = (e) => {
                const nodeResult = nodes.find(_node => _node.value === e.value);
                if ( nodeResult ) {
                    parsedNode.pending = true;  
                    isSearched = true; 
                    addExtraInfo(nodeResult, {
                        selected : parsedNode.selected,
                        pending : parsedNode.pending,
                        value : parsedNode.value,
                    });
                    return;
                }
                e.childrens && e.childrens.map(mapNodeLists);
            }             
    if ( node ) {
        parsedNode.pending = false;
        node.childrens && node.childrens.map(mapNodeLists);                   
    }
    return isSearched;
}