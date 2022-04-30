import { COMPONENT_INST } from "constants/componentConstants";
import { reMountWhenChangeRouteHook as ReMountPostsListWhenChangeRouteHook } from "hooks/postsListHook/reMountWhenChangeRouteHook";
import { reMountWhenChangeRouteHook as reMountPostLayoutWhenChangeRouteHook } from "hooks/postLayoutHook/reMountWhenChangeRouteHook";
import { reMountWhenChangeRouteHook as reMountCategoriesLayoutWhenChangeRouteHook } from "hooks/categoriesLayoutHook/reMountWhenChangeRouteHook";
export function changeRouterHook(currentComponentName) {    
    if ( currentComponentName === COMPONENT_INST.POSTS_LIST_LAYOUT ) {
        ReMountPostsListWhenChangeRouteHook();
    }
    if ( currentComponentName === COMPONENT_INST.NEW_POST_LAYOUT || 
            currentComponentName === COMPONENT_INST.EDIT_POST_LAYOUT ) {
        reMountPostLayoutWhenChangeRouteHook();
    }          
    if ( currentComponentName === COMPONENT_INST.CATEGORIES_LIST_LAYOUT ) {
        reMountCategoriesLayoutWhenChangeRouteHook();
    }            
}