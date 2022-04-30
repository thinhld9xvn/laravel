import { handleGetSidebarMenu } from "./sidebar/handleGetSidebarMenu";
import { handlePerformDidMountHook } from "./sidebar/handlePerformDidMountHook";
export async function getSidebarMenu() {
    return handleGetSidebarMenu();
}
export function performDidMountHook() {
    handlePerformDidMountHook.call(this);
}