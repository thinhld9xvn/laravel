import {getSidebarMenu} from 'utils/sidebarUtils';
import { handleActiveRouteMenuItem } from 'utils/sidebar/handleActiveRouteMenuItem';
import {cloneDeep} from 'lodash';
import { handleGetBrandNameByText } from 'utils/navbar/handleGetBrandNameByText';
import { generateMenuItemsHook } from '../../hooks/sidebarMenuHook/generateMenuItemsHook';
import { getAllActivePostTypesList } from 'utils/postTypesUtils';
export async function handleInitialize() {
    const sidebarMenu = (await getSidebarMenu()).data,
          postTypesList = (await getAllActivePostTypesList()).data.data;
    const {updateNavBrandName, updateSidebarMenu} = this.props;
    const sidebarMenuRendered = generateMenuItemsHook(sidebarMenu, postTypesList);    
    const {data, activeItem} = handleActiveRouteMenuItem(sidebarMenuRendered);
    updateSidebarMenu(cloneDeep(data));   
    updateNavBrandName(handleGetBrandNameByText(activeItem.text));
    this.setState({ is_loading : false });
}