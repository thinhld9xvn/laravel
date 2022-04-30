import { cloneDeep } from "lodash";
const initialStates = {
    userProfile : {},
    originalUserProfile : null,
    userRolesList : []
};
export const userProfileReducer = (state = initialStates, action) => {
    if ( action.reducer === 'userProfileReducer' ) {
        switch ( action.type ) {
            case 'UPDATE_USER_PROFILE' :
                state.userProfile = action.payload;
                return cloneDeep(state);
            case 'UPDATE_USER__PROFILE' :
                state.originalUserProfile = action.payload;
                return cloneDeep(state);
            case 'UPDATE_USER_ROLES_LIST' :
                state.userRolesList = action.payload;
                return cloneDeep(state);
            default :
                break;
        }
    }
    return cloneDeep(state);
}