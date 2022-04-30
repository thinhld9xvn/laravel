export const mapStateToProps = state => {    
    return {
        userProfile : state.userProfileReducer.userProfile,
        originalUserProfile : state.userProfileReducer.originalUserProfile,        
        userRolesList : state.userProfileReducer.userRolesList,
        userAvatarSrc : state.userAvatarReducer.userAvatarSrc,       
        userSelectedAvatar : state.userAvatarReducer.selected_avatar,
        newUserSelectedAvatar : state.userAvatarReducer.new_user_selected_avatar,
        userAvatarIsAjaxLoading : state.userAvatarReducer.is_ajax_loading,
        userAvatarTimeStamp : state.userAvatarReducer.avatarTimeStamp,
        userAvatarsList : state.userAvatarReducer.avatars_list,
        usersList : state.usersListReducer.usersList,        
        deactiveUsersList : state.usersListReducer.deactiveUsersList,        
        editUserModalProps : state.usersListReducer.editUserModalProps,
        currentModeComponent : state.componentReducer.currentModeState,        
        postTypesList : state.postTypesReducer.postTypesList,
        deactivePostTypesList : state.postTypesReducer.deactivePostTypesList,
        postTypeEditing : state.postTypesReducer.postTypeEditing,
        activeCategoriesLists : state.categoryReducer.activeCategoriesLists,
        originalActiveCategoryNode : state.categoryReducer.originalActiveCategoryNode,
        activeCategoryNode : state.categoryReducer.activeCategoryNode
    }
};