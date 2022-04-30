export function handleUpdateUserRoleMetaDispatch(data) {
    const {roles_list, userinfo} = data;
    const user_role = roles_list.filter(role => parseInt(role.id) === parseInt(userinfo.role_id))[0];        
    this.props.updateUserProfile({...userinfo, role_name : user_role['name']});
}