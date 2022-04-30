import { ACTIVE_ROUTES } from "constants/UrlConstants";
import { handleGetParentMenuItem } from "./handleGetParentMenuItem";
import {cloneDeep} from 'lodash';
import { getFullUrlFromPathName, getParameterFromUrl } from "utils/urlUtils";
function travselMenuItem(item, props) {
    const {items, pathname, href, activeItemResult} = props;
    const url = item['url'].replace(/\#/ig, '');
    let boolEqRoute = item['url'].indexOf(pathname) === 0 || href === url;
    if ( !boolEqRoute ) {
        boolEqRoute = pathname.startsWith(ACTIVE_ROUTES.EDIT_POST) && 
                        item['url'].startsWith(ACTIVE_ROUTES.POSTS_LIST); // khi url là edit post => active menu all posts
        if ( boolEqRoute ) {
            const itemSlug = getParameterFromUrl(getFullUrlFromPathName(item['url']), 'slug');
            const currentSlug = getParameterFromUrl(getFullUrlFromPathName(href), 'slug');
            if ( itemSlug === currentSlug ) {
                const parent = handleGetParentMenuItem(items, item);
                if (!item['is_active']) {
                    item['is_active'] = true;
                }
                parent && (parent.is_expand = true);
                activeItemResult.current = cloneDeep(item);
            }
            else {
                if (item['is_active']) {
                    item['is_active'] = false;
                }
            }
        }
        else {
            if (item['is_active']) {
                item['is_active'] = false;
            }
        }
    }
    else {        
        if (href.startsWith(item['url']) ) {
            const parent = handleGetParentMenuItem(items, item);
            if (!item['is_active']) {
                item['is_active'] = true;
            }
            parent && (parent.is_expand = true);
            activeItemResult.current = cloneDeep(item);
        }
        else {
            if (item['is_active']) {
                item['is_active'] = false;
            }
        }
    }
    if (item['hasChildrens']) {
        item['childrens'].map(e => travselMenuItem(e, props));
    }
    return item;
}
export function handleActiveRouteMenuItem(items) {
    const activeItemResult = {current : null};
    const {pathname, search} = window.location;
    const route_pathname = pathname === '/' ? ACTIVE_ROUTES.DASHBOARD : pathname;
    const href = pathname.concat(search).replace(/\#/ig, '');
    const data = items.map(item => travselMenuItem(item, {items, pathname : route_pathname, href, activeItemResult}));
    return {
        data : cloneDeep(data),
        activeItem : cloneDeep(activeItemResult.current)
    }
}