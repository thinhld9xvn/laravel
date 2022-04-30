export const mapDispatchToProps = dispatch => {
    return {    
        updateUserSelectedAvatar : (id) => {
            dispatch({
                reducer : 'userAvatarReducer',
                type : "UPDATE_USER_SELECTED_AVATAR",            
                id : id
            });        
        },        
        updateNewUserSelectedAvatar : (id) => {
            dispatch({
                reducer : 'userAvatarReducer',
                type : "UPDATE_NEW_USER_SELECTED_AVATAR",            
                id : id
            });        },
        updateUserAvatarLoading : (status) => {
            dispatch({
                reducer : 'userAvatarReducer',
                type : "UPDATE_USER_AVATAR_LOADING",
                status : status
            });        },
        updateUserAvatarTimeStamp : (timeStamp) => {
            dispatch({
                reducer : 'userAvatarReducer',
                type : "UPDATE_USER_AVATAR_TIMESTAMP",
                timeStamp : timeStamp
            });        },
        updateUsersList : (payload) => {
            dispatch({
                reducer : 'usersListReducer',
                type : "UPDATE_USERS_LIST",
                payload : payload
            });        },        
        updateDeactiveUsersList : (payload) => {
            dispatch({
                reducer : 'usersListReducer',
                type : "UPDATE_DEACTIVE_USERS_LIST",
                payload : payload
            });        },        
        updateEditUserModalProps : (payload) => {
            dispatch({
                reducer : 'usersListReducer',
                type : "UPDATE_EDIT_USER_MODAL_PROPS",
                payload : payload
            });        },
        updateCurrentModeComponent : (mode) => {
            dispatch({
                reducer : 'componentReducer',
                type : "UPDATE_CURRENT_MODE_STATE",
                mode : mode
            });
        },      
        updatePostTypesList : (payload) => {
            dispatch({
                reducer : 'postTypesReducer',
                type : "UPDATE_POST_TYPES_LIST",
                payload : payload
            });
        },
         updateDeactivePostTypesList : (payload) => {
            dispatch({
                reducer : 'postTypesReducer',
                type : "UPDATE_DEACTIVE_POST_TYPES_LIST",
                payload : payload
            });
        },
        updatePostTypeEditing : (payload) => {
            dispatch({
                reducer : 'postTypesReducer',
                type : "UPDATE_POST_TYPE_EDITING",
                payload : payload
            });
        },
        updateActiveCategoriesLists : (payload) => {
            dispatch({
                reducer : 'categoryReducer',
                type : "UPDATE_ACTIVE_CATEGORIES_LISTS",
                payload : payload
            });
        },
        updateOriginalActiveCategoryNode : (payload) => {
            dispatch({
                reducer : 'categoryReducer',
                type : "UPDATE_ORIGINAL_ACTIVE_CATEGORY_NODE",
                payload : payload
            });
        },
        updateActiveCategoryNode : (payload) => {
            dispatch({
                reducer : 'categoryReducer',
                type : "UPDATE_ACTIVE_CATEGORY_NODE",
                payload : payload
            });
        }
    }
};