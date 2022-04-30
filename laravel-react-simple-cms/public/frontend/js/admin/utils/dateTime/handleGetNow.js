import { ADMIN_AJAX_URLS } from "constants/UrlConstants";
import { getApi } from 'utils/apiUtils';
export async function handleGetNowFromServer() {
    const {GET_NOW} = ADMIN_AJAX_URLS;
    return await getApi('GET', GET_NOW, null);
}