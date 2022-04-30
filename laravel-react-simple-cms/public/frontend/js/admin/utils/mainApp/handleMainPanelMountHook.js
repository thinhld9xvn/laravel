import {getUserInfo, getUserRolesList, updateUserRoleMetaDispatch} from "utils/membershipUtils";
import { cloneDeep } from 'lodash';
export async function handleMainPanelMountHook() {
    const roles_list = (await getUserRolesList.call(this)).data.data;
    this.props.updateUserRolesList(roles_list);
    const userinfo = cloneDeep(getUserInfo.call(this));    
    updateUserRoleMetaDispatch.call(this, roles_list, userinfo);
    this.setState({
        is_ajax_completed : true
    });
}