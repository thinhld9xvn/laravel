import { COMPONENT_INST } from "constants/componentConstants";
import { getComponentInst } from "utils/componentUtils";
import { performPostsListTabMountHook } from "utils/postTypesUtils";

export function reMountWhenChangeRouteHook() {
    const inst = getComponentInst(COMPONENT_INST.POSTS_LIST_TAB);
    performPostsListTabMountHook.call(inst);
}