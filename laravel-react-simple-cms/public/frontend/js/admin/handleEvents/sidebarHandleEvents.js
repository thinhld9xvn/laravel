import { handleMenuItemToggle } from "./sidebar/handleMenuItemToggle";
import { handleToggleSidebar } from "./sidebar/handleToggleSidebar";

export function onClick_toggleSidebar(e) {
    e.preventDefault();
    handleToggleSidebar.call(this, e);
}
export function onClick_MenuItemToggle(e) {
    e.stopPropagation();
    handleMenuItemToggle.call(this, e);
}