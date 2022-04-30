import { cloneDeep } from "lodash";

const initialStates = {

    userAvatarSrc : null,

    avatars_list : [],

    selected_avatar : 0,
    new_user_selected_avatar : 0,

    avatarTimeStamp : 0,   

    is_ajax_loading : false

};

export const userAvatarReducer = (state = initialStates, action) => {

    if ( action.reducer === 'userAvatarReducer' ) {

        switch ( action.type ) {

            case 'UPDATE_USER_AVATAR_SRC' :

                state.userAvatarSrc = action.avatarSrc;

                return cloneDeep(state);

            case 'UPDATE_USER_AVATARS_LIST' :

                state.avatars_list = action.avatars_list;

                return cloneDeep(state);   

            case 'UPDATE_USER_SELECTED_AVATAR' :

                state.selected_avatar = action.id;

                return cloneDeep(state); 

            case 'UPDATE_NEW_USER_SELECTED_AVATAR' :

                state.new_user_selected_avatar = action.id;
    
                return cloneDeep(state); 
                     
            case 'UPDATE_USER_AVATAR_LOADING' :

                state.is_ajax_loading = action.status;

                return cloneDeep(state);

            case 'UPDATE_USER_AVATAR_TIMESTAMP' :

                state.avatarTimeStamp = action.timeStamp;

                return cloneDeep(state);

            default :

                break;

        }

    }

    return cloneDeep(state);

}