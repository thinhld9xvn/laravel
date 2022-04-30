import { COMPONENT_INST } from "constants/componentConstants";
import { getComponentInst } from "utils/componentUtils";
import { convertFFToPostType } from "utils/postTypesUtils";
import { cloneDeep } from 'lodash';
import { handleUpdateSidebarMenu } from "handleEvents/postTypes/handleUpdateSidebarMenu";
import { handleCloseEditPostTypeModal } from "handleEvents/postTypes/modals/handleCloseEditPostTypeModal";
function findPostTypeIndex(data, id) {
    const index = data.findIndex(pt => pt.id === id);
    return index !== -1 ? index : null;
}
function updatePostType(data, formFields) {
    const index = findPostTypeIndex(data, formFields.id);
    const ptd = convertFFToPostType(formFields);
    data[index] = Object.assign(data[index], ptd);
    return data;
}
export function saveActiveEditingPostTypeHook() {
    const formInst = getComponentInst(COMPONENT_INST.EDIT_POST_TYPE_MODAL_LAYOUT),
        tabPtInst = getComponentInst(COMPONENT_INST.POST_TYPES_TAB),
        tabDePtInst = getComponentInst(COMPONENT_INST.DEACTIVE_POST_TYPES_TAB),
        { formFields } = formInst.state,
        { updatePostTypesList } = tabPtInst.props,
        { deactivePostTypesList } = tabDePtInst.props,
        filteredItems = cloneDeep(tabPtInst.state.filteredItems),
        data = cloneDeep(tabPtInst.state.data),
        _filteredItems = updatePostType(filteredItems, formFields),
        _data = updatePostType(data, formFields);
    //
    tabPtInst.setState({
        data : cloneDeep(_data),
        filteredItems : cloneDeep(_filteredItems)
    }, () => {
        //
        updatePostTypesList(cloneDeep(_data));
        handleUpdateSidebarMenu(_data.concat(deactivePostTypesList));
        handleCloseEditPostTypeModal();
    });
}