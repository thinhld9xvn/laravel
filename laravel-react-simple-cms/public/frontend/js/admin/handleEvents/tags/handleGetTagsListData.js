import { ADMIN_AJAX_URLS } from "constants/UrlConstants";
import { getApi } from "utils/apiUtils";
export async function handleGetTagsListData(post_type = 'post') {
    const {GET_TAGS_STRUCTURES} = ADMIN_AJAX_URLS;
    const fd = new FormData();
    fd.append('post_type', post_type);
    return await getApi("POST", GET_TAGS_STRUCTURES, fd);
}