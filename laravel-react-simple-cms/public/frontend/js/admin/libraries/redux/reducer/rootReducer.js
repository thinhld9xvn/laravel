import { combineReducers } from 'redux';
import { sidebarMenuReducer } from './sidebarMenuReducer';
import { navbarInfoReducer } from './navbarInfoReducer';
import { userProfileReducer } from './userProfileReducer';
import { userAvatarReducer } from './userAvatarReducer';
import { usersListReducer } from './usersListReducer';
import { componentReducer } from './componentReducer';
import { loaderReducer } from './loaderReducer';
import { postTypesReducer } from './postTypesReducer';
import { categoryReducer } from './categoryReducer';
import { tagReducer } from './tagReducer';
export const rootReducer = combineReducers({ 
    sidebarMenuReducer,
    navbarInfoReducer,
    userProfileReducer,
    userAvatarReducer,
    usersListReducer,
    componentReducer,
    loaderReducer,
    postTypesReducer,
    categoryReducer,
    tagReducer
});