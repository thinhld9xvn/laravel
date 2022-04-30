export function handleProcessCoordsList(params) {
    const {nodes, node} = params;
    const index = nodes.findIndex(n => parseInt(node.value) == parseInt(n.value));
    if ( index !== -1 ) {
        nodes.splice(index, 1);
    }
    else {
        nodes.push(node);
    }
}