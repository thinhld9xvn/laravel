import { handleInitialize } from "./mainApp/handleInitialize";
import { handleMainPanelMountHook } from "./mainApp/handleMainPanelMountHook";
export async function initialize() {
    handleInitialize.call(this);
}
export async function performMainPanelDidMountHook() {
    handleMainPanelMountHook.call(this);
}