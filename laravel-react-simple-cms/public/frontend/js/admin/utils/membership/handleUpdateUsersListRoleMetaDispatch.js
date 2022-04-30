import { cloneDeep } from "lodash";

export function handleUpdateUsersListRoleMetaDispatch(data) {
    const {roles_list, usersList, type} = data;
    usersList.forEach(userinfo => {
        const user_role = roles_list.filter(role => parseInt(role.id) === parseInt(userinfo.role_id))[0];
        userinfo.role_name = user_role['name'];
        return userinfo;
    });
    if ( type === 'active' ) {
        this.props.updateUsersList(cloneDeep(usersList));  
    }
    else {
        this.props.updateDeactiveUsersList(cloneDeep(usersList));  
    }
}