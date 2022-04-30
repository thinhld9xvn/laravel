import { handleFindNode } from "./handleFindNodeUtils";
function appendCoordNode(nodes, node) {
    const index = nodes.findIndex(n => parseInt(node.value) == parseInt(n.value));
    if ( index === -1 ) {
        nodes.push(node);
    }
}
function travselNode(data, coordsNodesList, node) {
    const searchedPNode = handleFindNode({ list : data, value : node.parentValue });
    if ( node.selected || node.pending ) {
        if ( node.selected ) {
            appendCoordNode(coordsNodesList, node); 
        }
        if ( searchedPNode && !searchedPNode.pending ) {
            searchedPNode.pending = true;
        }
    }    
    searchedPNode && travselNode(data, coordsNodesList, searchedPNode);
}
export function handleTravselLoop(data, coordsNodesList, node) {
    travselNode(data, coordsNodesList, node);
    if ( node.childrens && node.childrens.length ) {
        node.childrens.map(n => handleTravselLoop(data, coordsNodesList, n));
    }
}
export function handleInitNodesState(data) {
    const coordsNodesList = [];
    data.map(node => handleTravselLoop(data, coordsNodesList, node)); 
    return {coordsNodesList};
}