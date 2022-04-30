import { POST_TYPE_ENTRIES_MENU } from "constants/globalConstants";
import {cloneDeep} from 'lodash';
import { createBase64PostTypeId, updatePostTypesListInSidebar } from "utils/postTypesUtils";
export function generateMenuItemsHook(menuItems, activePostsTypeList) {    
    //
    const {id : postsId, ALL_POSTS, NEW_POST} = POST_TYPE_ENTRIES_MENU.POSTS;
    const {text : all_posts_text} = ALL_POSTS;
    const {text : new_post_text} = NEW_POST;
    //
    const {id : pagesId, ALL_PAGES, NEW_PAGE} = POST_TYPE_ENTRIES_MENU.PAGES;
    const {text : all_pages_text} = ALL_PAGES;
    const {text : new_page_text} = NEW_PAGE;
    //
    const _menuItems = cloneDeep(menuItems);
    const _activePostsTypeList = cloneDeep(activePostsTypeList);
    _activePostsTypeList.splice(0, 0, {
        id : createBase64PostTypeId(postsId),
        slug : postsId,
        label : 'Bài viết',
        all_posts_label : all_posts_text,
        new_post_label : new_post_text
    });
    _activePostsTypeList.splice(1, 0, {
        id : createBase64PostTypeId(pagesId),
        slug : pagesId,
        label : 'Trang',
        all_posts_label : all_pages_text,
        new_post_label : new_page_text,
    });
    if ( _activePostsTypeList && _activePostsTypeList.length > 0 ) {
        updatePostTypesListInSidebar(_menuItems, _activePostsTypeList);
    }
    return _menuItems;
}