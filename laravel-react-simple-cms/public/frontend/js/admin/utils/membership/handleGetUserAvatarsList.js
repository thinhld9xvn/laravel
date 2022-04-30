import { ADMIN_AJAX_URLS } from "constants/UrlConstants";
import { getApi } from 'utils/apiUtils';
export async function handleGetUserAvatarsList() {
    const {GET_AVATARS_LIST_URL} = ADMIN_AJAX_URLS;
    return await getApi('GET', GET_AVATARS_LIST_URL, null);
}