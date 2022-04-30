import { COMPONENT_INST } from "constants/componentConstants";
import { getComponentInst } from "utils/componentUtils";
import { cloneDeep } from 'lodash';
import { handleUpdateSidebarMenu } from "handleEvents/postTypes/handleUpdateSidebarMenu";
function removeItem(data, pid) {
    const pIndex = data.findIndex(p => p.id === pid);
    if (pIndex !== -1) {
        const item = (data.splice(pIndex, 1))[0];
        item.status = 'public';
        return item;
    }
    return null;
}
function pushItem(data, item) {
    data.splice(0, 0, cloneDeep(item));
}
export function restorePostTypeHook(pids) {
    const inst = getComponentInst(COMPONENT_INST.POST_TYPES_TAB),
         dtInst = getComponentInst(COMPONENT_INST.DEACTIVE_POST_TYPES_TAB),
         deactivePostTypesList = cloneDeep(dtInst.props.deactivePostTypesList),
         activePostTypesList = cloneDeep(inst.props.postTypesList),
         //
        _filteredItems = cloneDeep(dtInst.state.filteredItems),
        _data = cloneDeep(dtInst.state.data),
        //
        filteredItems = cloneDeep(inst.state.filteredItems),
        data = cloneDeep(inst.state.data),
        //
        {updatePostTypesList} = inst.props,
        {updateDeactivePostTypesList} = dtInst.props;
    pids.forEach(pid => {
        const item = removeItem(deactivePostTypesList, pid);
        removeItem(_filteredItems, pid);
        removeItem(_data, pid);
        //
        pushItem(activePostTypesList, item);
        pushItem(filteredItems, item);
        pushItem(data, item);
        //
        inst.setState({
            filteredItems : cloneDeep(filteredItems),
            data : cloneDeep(data)
        }, () => {
            dtInst.setState({
                filteredItems : cloneDeep(_filteredItems),
                data : cloneDeep(_data)
            }, () => {
                updatePostTypesList(cloneDeep(activePostTypesList));
                updateDeactivePostTypesList(cloneDeep(deactivePostTypesList));
            });
        });
    });
    handleUpdateSidebarMenu(activePostTypesList.concat(deactivePostTypesList));
}