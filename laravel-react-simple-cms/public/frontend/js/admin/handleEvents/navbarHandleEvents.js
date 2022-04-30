import { handleToggleNavBarDropDownMenu } from "./navbar/handleToggleNavBarDropDownMenu";
export function onClick_ToggleNavBarDropDownMenu(e) {
    e.preventDefault();
    handleToggleNavBarDropDownMenu.call(this, e);
}