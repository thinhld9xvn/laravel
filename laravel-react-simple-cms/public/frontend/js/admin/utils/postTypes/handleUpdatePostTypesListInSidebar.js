import { POST_TYPE_ENTRIES_MENU } from "constants/globalConstants";
import { ACTIVE_ROUTES } from "constants/UrlConstants";
import { createBase64PostTypeId, getBase64PostTypeId } from "utils/postTypesUtils";

export function handleUpdatePostTypesListInSidebar(sidebarMenuItems, postTypesList) {
    const data = [];
    //
    const {id : _postsId, CATEGORIES} = POST_TYPE_ENTRIES_MENU.POSTS;
    const {text : categories_text} = CATEGORIES;
    //
    const {id : _pagesId} = POST_TYPE_ENTRIES_MENU.PAGES;
    //
    const base64PostsId = createBase64PostTypeId(_postsId);
    const base64PagesId = createBase64PostTypeId(_pagesId);
    //
    postTypesList.forEach(postType => {
        const {id : postTypeId, slug, label, all_posts_label, new_post_label, taxonomies, status} = postType;
        const id = postTypeId; // encoded base64        
        const childIds = id !== base64PagesId ? [`${id}__all_posts`, `${id}__new_post`] :
                                                [`${id}__all_pages`, `${id}__new_page`];
        const childrens = [
            {
                id : childIds[0],
                icon : "sort",
                text : all_posts_label,
                url : `${ACTIVE_ROUTES.POSTS_LIST}?id=${slug}&slug=${slug}`,
                is_active : false,
                parent : id
            },
            {
                id : childIds[1],
                icon : "sort",
                text : new_post_label,
                url : `${ACTIVE_ROUTES.NEW_POST}?id=${slug}&slug=${slug}`,
                is_active : false,
                parent : id
            }                     
        ];
        if ( postTypeId !== base64PagesId ) {
            if ( postTypeId === base64PostsId ) {
                childrens.push({
                    id : `${id}__categories_list`,
                    icon : "sort",
                    text : categories_text,
                    url : `${ACTIVE_ROUTES.CATEGORIES_LIST}?id=${slug}&slug=${slug}`,
                    is_active : false,
                    parent : id
                });
                //
                childrens.push({
                    id : `${id}__tags_list`,
                    icon : "sort",
                    text : POST_TYPE_ENTRIES_MENU.POSTS.TAGS.text,
                    url : `${ACTIVE_ROUTES.TAGS_LIST}?id=${slug}&slug=${slug}`,
                    is_active : false,
                    parent : id
                } );
            }
            else {
                taxonomies.forEach(tax => {
                    const {id : taxId, label : taxLabel, slug : taxSlug} = tax;
                    childrens.push({
                        id : `${taxId}__categories_list`,
                        icon : "sort",
                        text : taxLabel,
                        url : `${ACTIVE_ROUTES.CATEGORIES_LIST}?id=${slug}&slug=${slug}&tax=${taxSlug}`,
                        is_active : false,
                        parent : id
                    });
                });
            }
        }
        const i = sidebarMenuItems.findIndex(item => item.id === id);
        if ( i === -1 && status === 'trash' ) return;
        if ( i !== -1 ) {
            if ( status === 'trash' ) {            
                sidebarMenuItems.splice(i, 1);
            }
            else { // update
                sidebarMenuItems[i] = {...sidebarMenuItems[i], text : label, childrens : [...childrens]};
            }
            return;
        }
        const menuItem =  {
            id,
            icon : "receipt",
            text : label,
            url : "#",
            hasChildrens : true,
            is_expand : false,
            is_active : false,
            childrens : [...childrens]
        };
        data.push( menuItem );
    });
    const index = sidebarMenuItems.findIndex(item => item.id === base64PagesId);
    let pos = index !== -1 ? index + 1 : 1;
    data.forEach(v => {
        sidebarMenuItems.splice(pos, 0, v);
        pos++;
    });
}