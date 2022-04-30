export function searchNode(node, value) {
    if ( this.searchedNode ) return;
    if ( node.value.toString() === value.toString() ) {
        this.searchedNode = node;
    }
    if ( node.childrens ) {
        node.childrens.map(cnode => searchNode.call(this, cnode, value));
    }
}