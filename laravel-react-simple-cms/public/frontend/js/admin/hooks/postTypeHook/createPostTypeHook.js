import { COMPONENT_INST } from "constants/componentConstants";
import { getComponentInst } from "utils/componentUtils";
import { convertFFToPostType, createBase64PostTypeId } from "utils/postTypesUtils";
import { cloneDeep } from 'lodash';
import { handleUpdateSidebarMenu } from "handleEvents/postTypes/handleUpdateSidebarMenu";
import { handleReloadForm } from "handleEvents/postTypes/handleReloadForm";
function pushItem(data, formFields) {
    const ptd = convertFFToPostType(formFields);
    data.splice(0, 0, ptd);
}
export function createPostTypeHook() {
    const formInst = getComponentInst(COMPONENT_INST.NEW_POST_TYPE_MODAL_LAYOUT),
        tabInst = getComponentInst(COMPONENT_INST.POST_TYPES_TAB),
        tabDeInst = getComponentInst(COMPONENT_INST.DEACTIVE_POST_TYPES_TAB),
        { formFields } = formInst.state,
        data = cloneDeep(tabInst.state.data), 
        filteredItems = cloneDeep(tabInst.state.filteredItems),
        postTypesList = cloneDeep(tabInst.props.postTypesList),
        deactivePostTypesList = cloneDeep(tabDeInst.props.deactivePostTypesList),
        { updatePostTypesList } = tabInst.props,
        { slugPostType } = formFields,
        myFormFields = {...formFields, id : createBase64PostTypeId(slugPostType)};
    pushItem(data, myFormFields);
    pushItem(filteredItems, myFormFields);
    pushItem(postTypesList, myFormFields);
    //
    tabInst.setState({
        filteredItems : cloneDeep(filteredItems),
        data : cloneDeep(filteredItems)
    }, () => {
        updatePostTypesList(cloneDeep(postTypesList));
        //
        handleUpdateSidebarMenu(postTypesList.concat(deactivePostTypesList));
        handleReloadForm.call(formInst);
    });                
}