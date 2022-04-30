import { BRAND_NAMES } from "constants/globalConstants";
import { ACTIVE_ROUTES } from "constants/UrlConstants";

export function handleGetBrandNameByText(text) {
    const {pathname} = window.location;
    if ( pathname.startsWith(ACTIVE_ROUTES.EDIT_POST) ) {
        return BRAND_NAMES.EDIT_POST;
    }
    return text;
}