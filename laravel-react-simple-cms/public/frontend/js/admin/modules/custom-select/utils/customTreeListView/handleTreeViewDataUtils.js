import { cloneDeep } from "lodash";
function travsel(e, st) {
    if ( e.selected ) {
        st.selectedNode = true;
    }
    if ( e.childrens ) {
        e.childrens.map(el => travsel(el, st));
    }
}
function checkSelectedNode(data) {
    const st = {selectedNode : false};
    data.map(e => travsel(e, st));
    return st.selectedNode;
}
export function handleTreeViewData(data) {
    const d = cloneDeep(data);
        const treeView = [];
        if ( (d.length && d[0].name !== '/') || d.length === 0 ) {
            const node = {
                name : "/",
                value : "0",
                selected : !checkSelectedNode(d)
            }            
            if (d.length) {
                node.childrens = cloneDeep(d);
            }
            treeView.push(node);
            return treeView;
        }
        return d;
}