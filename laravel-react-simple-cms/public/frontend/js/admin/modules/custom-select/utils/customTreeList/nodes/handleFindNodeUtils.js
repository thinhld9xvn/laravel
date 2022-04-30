export function handleFindNode(params) {
    const {list, value} = params;
    let searched = null;
    const _findNode = (node) => {
        if (node.value === value) {
            searched = node;
            return;
        }
        node.childrens && node.childrens.map(_findNode);
    };
    list.map(_findNode);
    return searched;
}