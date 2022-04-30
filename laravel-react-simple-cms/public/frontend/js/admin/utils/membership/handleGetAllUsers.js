import { ADMIN_AJAX_URLS } from "constants/UrlConstants";
import { getApi } from "utils/apiUtils";
export async function handleGetAllUsers() {
    const {GET_ALL_USERS} = ADMIN_AJAX_URLS;
    return await getApi('GET', GET_ALL_USERS, null);
}