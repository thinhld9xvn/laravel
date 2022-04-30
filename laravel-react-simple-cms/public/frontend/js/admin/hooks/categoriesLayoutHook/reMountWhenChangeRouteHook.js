import { COMPONENT_INST } from "constants/componentConstants";
import { getComponentInst } from "utils/componentUtils";
import { handleDidMountHook } from "utils/categoryPostTypes/handleDidMountHook";
export function reMountWhenChangeRouteHook() {
    const inst = getComponentInst(COMPONENT_INST.CATEGORIES_TAB);
    handleDidMountHook.call(inst);
}