const _ORIGINAL_URL = window.location.origin;
export const JSON_CONFIG_URL = _ORIGINAL_URL + '/json_config/';
export const FPROFILE_AVATAR_DIR_URL = _ORIGINAL_URL + '/frontend/avatar/';
export const FIMAGES_DIR_URL = window.location.origin + '/frontend/js/admin/modules/filemanager/images/';
export const API_URL = process.env.API_URL;
export const LOGIN_URL = _ORIGINAL_URL + '/admin/login';
export const TINYMCE_SRC_PATH = '/frontend/js/admin/libraries/tinymce/tinymce.min.js';
export const ACTIVE_ROUTES = {
    DASHBOARD : '/admin/dashboard',
    MEDIA : '/admin/media',
    PROFILE : '/admin/users/profile',
    ALL_USERS : '/admin/users/all_users',
    NEW_USER : '/admin/users/new_user',
    CONFIG_POST_TYPES : '/admin/configuration/post_types',
    POSTS_LIST : '/admin/ap_type/postsList',
    NEW_POST : '/admin/ap_type/newPost',
    EDIT_POST : '/admin/ap_type/editPost',
    CATEGORIES_LIST : '/admin/ap_type/categoriesList',
    TAGS_LIST : '/admin/ap_type/tagsList'
}
export const ADMIN_AJAX_URLS = {
    CHECK_LOGIN_URL : API_URL + '/user',
    LOGOUT_URL : API_URL + '/logout',
    LOGIN_URL : API_URL + '/login',
    GET_USER_INFO_URL : API_URL + '/user',
    GET_USER_ROLES_LIST_URL : API_URL + '/getRolesList',
    GET_AVATARS_LIST_URL : API_URL + '/getAvatarsList',    
    GET_ALL_ACTIVE_USERS : API_URL + '/getActiveUsers',
    GET_ALL_DEACTIVE_USERS : API_URL + '/getDeactiveUsers',
    GET_ALL_USERS : API_URL + '/getUsersList',
    REMOVE_ACTIVE_USER : API_URL + '/removeUser',
    RESTORE_DEACTIVE_USER : API_URL + '/restoreUser',
    CREATE_NEW_USER_PROFILE_URL : API_URL + '/register',
    UPDATE_PROFILE_URL : API_URL + '/updateProfile',
    CHANGE_PASSWORD_URL : API_URL + '/updatePassword',
    UPLOAD_AVATAR_URL : API_URL + '/uploadAvatar',
    GET_ALL_POST_TYPES_LIST : API_URL + '/getPostTypesList',    
    RESTORE_POST_TYPE_URL : API_URL + '/restorePostType',
    GET_ALL_ACTIVE_POSTS_LIST : API_URL + '/getPostsList',    
    UPLOAD : API_URL + '/uploadFile',
    GET_FILES_LIST : API_URL + '/getFileLists',
    REMOVE_FILES : API_URL + '/removeFile',
    GET_FOLDERS : API_URL + '/getFolderLists',
    UPDATE_DIR_STRUCTURES : API_URL + '/updateDirStructs',
    GET_CATEGORIES_STRUCTURES : API_URL + '/getCategoriesStructs',
    GET_TAGS_STRUCTURES : API_URL + '/getTagsStructs',
    UPDATE_CATEGORIES_STRUCTURES : API_URL + '/updateCategoriesStructs',
    UPDATE_TAGS_STRUCTURES : API_URL + '/updateTagsStructs',
    PUBLISH_POST : API_URL + '/publishPost',
    GET_NOW : API_URL + '/getNow',
    GET_POST : API_URL + '/getPost',
    IMPORT_SAMPLE_CATEGORIES : API_URL + '/importSampleCategories',
    IMPORT_SAMPLE_TAGS : API_URL + '/importSampleTags',
    REMOVE_POST_URL : API_URL + '/removePost',
    RESTORE_POST_URL : API_URL + '/restorePost',
    CREATE_NEW_POST_TYPE_URL : API_URL + '/createNewPostType',
    UPDATE_POST_TYPE_URL : API_URL + '/updatePostType',
    REMOVE_POST_TYPE_URL : API_URL + '/removePostType',
};