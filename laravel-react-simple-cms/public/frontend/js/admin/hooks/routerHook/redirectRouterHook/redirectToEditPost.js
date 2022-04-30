import { ACTIVE_ROUTES } from "constants/UrlConstants";
import { COMPONENT_INST } from "constants/componentConstants"
import { setActiveSidebarItem } from "handleEvents/sidebar/handleMenuItemToggle";
import { getPostLayoutInst } from "utils/postTypesUtils";
import { getComponentInst } from "utils/componentUtils";
export function redirectToEditPost(id) {
    const sinst = getComponentInst(COMPONENT_INST.SIDEBAR_LEFT);
    const inst = getPostLayoutInst();
    const {post_type} = inst.state;
    const {history : newHistory} = sinst.props;
    newHistory.push(ACTIVE_ROUTES.EDIT_POST + `?id=${post_type}&slug=${post_type}&guid=` + id); 
    setActiveSidebarItem(`${post_type}__all_posts`);
}