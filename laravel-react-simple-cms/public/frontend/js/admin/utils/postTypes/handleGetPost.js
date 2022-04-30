import { ADMIN_AJAX_URLS } from "constants/UrlConstants";
import { getApi } from 'utils/apiUtils';
export async function handleGetPost(guid, post_type = 'post') {
    const {GET_POST} = ADMIN_AJAX_URLS;
    const fd = new FormData();
    fd.append('guid', guid);
    fd.append('post_type', post_type);
    return await getApi('POST', GET_POST, fd);
}