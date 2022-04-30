import { ADMIN_AJAX_URLS } from "constants/UrlConstants";
import { getApi } from "utils/apiUtils";
export async function handleGetCategoriesListData(post_type = 'post', tax = '') {
    const {GET_CATEGORIES_STRUCTURES} = ADMIN_AJAX_URLS;
    const fd = new FormData();
    fd.append('post_type', post_type);
    fd.append('tax', tax);
    return await getApi('POST', GET_CATEGORIES_STRUCTURES, fd);
}