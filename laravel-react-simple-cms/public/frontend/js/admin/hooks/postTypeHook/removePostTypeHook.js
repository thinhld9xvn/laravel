import { COMPONENT_INST } from 'constants/componentConstants';
import { POST_ACTIONS } from 'constants/globalConstants';
import { handleUpdateSidebarMenu } from 'handleEvents/postTypes/handleUpdateSidebarMenu';
import { cloneDeep } from 'lodash';
import { getComponentInst } from 'utils/componentUtils';
function removeItem(data, pid) {
    const pIndex = data.findIndex(p => p.id === pid);
    if (pIndex !== -1) {
        const item = (data.splice(pIndex, 1))[0];
        item.status = 'trash';
        return item;
    }
    return null;
}
function pushItem(data, item) {
    data.splice(0, 0, cloneDeep(item));
}
function trashHook(params) {
    const {activePostTypesList, filteredItems, data, deactivePostTypesList, _data, _filteredItems, pid} = params;
    const item = removeItem(activePostTypesList, pid);
    removeItem(filteredItems, pid);
    removeItem(data, pid);
    //
    pushItem(deactivePostTypesList, item);
    pushItem(_data, item);
    pushItem(_filteredItems, item);
}
function removePermantlyHook(data) {
    const {deactivePostTypesList, _data, _filteredItems, pid} = data;
    const item = removeItem(deactivePostTypesList, pid);
    removeItem(_filteredItems, pid);
    removeItem(_data, pid);    
}
export function removePostTypeHook(pids, action = POST_ACTIONS.trash) {
     //
     const dtInst = getComponentInst(COMPONENT_INST.POST_TYPES_TAB),
        dtDeInst = getComponentInst(COMPONENT_INST.DEACTIVE_POST_TYPES_TAB),
        activePostTypesList = cloneDeep(dtInst.props.postTypesList),
        data = cloneDeep(dtInst.state.data),
        filteredItems = cloneDeep(dtInst.state.filteredItems),
        //
        deactivePostTypesList = cloneDeep(dtDeInst.props.deactivePostTypesList),
        _data = cloneDeep(dtDeInst.state.data),
        _filteredItems = cloneDeep(dtDeInst.state.filteredItems),
        //
        {updatePostTypesList} = dtInst.props,
        {updateDeactivePostTypesList} = dtDeInst.props;
        //
    pids.forEach(pid => {
        if ( action === POST_ACTIONS.trash ) {
            trashHook({activePostTypesList, filteredItems, data, deactivePostTypesList, _data, _filteredItems, pid});
        }
        if ( action === POST_ACTIONS.remove_permantly ) {
            removePermantlyHook({deactivePostTypesList, _data, _filteredItems, pid});
        }        
    });
    dtInst.setState({
        filteredItems : cloneDeep(filteredItems),
        data : cloneDeep(data)
    }, () => {
        dtDeInst.setState({
            filteredItems : cloneDeep(_filteredItems),
            data : cloneDeep(_data)
        }, () => {
            updatePostTypesList(cloneDeep(activePostTypesList));
            updateDeactivePostTypesList(cloneDeep(deactivePostTypesList));
        });
    });
    handleUpdateSidebarMenu(activePostTypesList.concat(deactivePostTypesList));
}