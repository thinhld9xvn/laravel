import { ACTIVE_ROUTES } from "./UrlConstants"

export const COMPONENT_INST = {
    NEW_POST_TYPE_MODAL_LAYOUT : 'newPostTypeModalLayoutRef',
    EDIT_POST_TYPE_MODAL_LAYOUT : 'editPostTypeModalLayoutRef',
    SIDEBAR_LEFT : 'sidebarLeftRef',
    LOADER : 'loaderRef',
    MAIN_CONTAINER : 'mainContainerRef',
    CATEGORIES_TAB : 'categoriesTabRef',
    TAGS_TAB : 'tagsTabRef',
    EDIT_CATEGORY_NODE : 'editCategoryNodeRef',
    NEW_CATEGORY_NODE : 'newCategoryNodeRef', 
    EDIT_TAG_NODE : 'editTagNodeRef',
    NEW_TAG_NODE : 'newTagNodeRef', 
    POST_TYPES_TAB : 'postTypesTabRef',
    DEACTIVE_POST_TYPES_TAB : 'deactivePostTypesTabRef',
    POSTS_LIST_TAB : 'postsListTabRef',
    DEACTIVE_POSTS_LIST_TAB : 'deactivePostsListTabRef',
    USERS_TAB : 'usersActiveTabRef',
    DEACTIVE_USERS_TAB : 'deactiveUsersTabRef',
    FILE_MANAGER : 'FileManagerRef',
    NEW_POST_LAYOUT : 'NewPostLayoutRef',
    EDIT_POST_LAYOUT : 'editPostLayoutRef',
    EDIT_POST_MODAL_LAYOUT : 'editPostModalLayoutRef',
    NEW_POST_MODAL_LAYOUT : 'newPostModalLayoutRef',
    POST_TAGS_LAYOUT : 'postTagsRef',
    USER_PROFILE_LAYOUT : 'userProfileLayoutRef',
    ALL_USERS_LAYOUT : 'allUsersLayoutRef',
    NEW_USER_LAYOUT : 'newUserLayoutRef',
    POST_TYPES_LAYOUT : 'postTypesLayoutRef',
    POSTS_LIST_LAYOUT : 'PostsListLayoutRef',
    CATEGORIES_LIST_LAYOUT : 'CategoriesListLayoutRef',
    TAGS_LIST_LAYOUT : 'TagsListLayoutRef',
}
export const COMPONENT_MAP = [
    {
        url: ACTIVE_ROUTES.NEW_POST,
        name : COMPONENT_INST.NEW_POST_LAYOUT
    },
    {
        url: ACTIVE_ROUTES.EDIT_POST,
        name : COMPONENT_INST.EDIT_POST_LAYOUT
    },
    {
        url: ACTIVE_ROUTES.POSTS_LIST,
        name : COMPONENT_INST.POSTS_LIST_LAYOUT
    },
    {
        url: ACTIVE_ROUTES.CATEGORIES_LIST,
        name : COMPONENT_INST.CATEGORIES_LIST_LAYOUT
    }
];