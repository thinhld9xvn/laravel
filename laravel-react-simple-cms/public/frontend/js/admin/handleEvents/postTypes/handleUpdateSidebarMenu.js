import { getComponentInst } from "utils/componentUtils";
import { COMPONENT_INST } from "constants/componentConstants";
import { cloneDeep } from 'lodash';
import { updatePostTypesListInSidebar } from "utils/postTypesUtils";
export function handleUpdateSidebarMenu(postTypesList) {
    const sidebarInst = getComponentInst(COMPONENT_INST.SIDEBAR_LEFT);
    const sidebarMenu = cloneDeep(sidebarInst.props.sidebarMenuItems);
    const {updateSidebarMenu} = sidebarInst.props;
    updatePostTypesListInSidebar(sidebarMenu, postTypesList);  
    updateSidebarMenu(cloneDeep(sidebarMenu));   
}