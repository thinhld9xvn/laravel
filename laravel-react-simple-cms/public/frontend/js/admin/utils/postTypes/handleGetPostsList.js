import {ADMIN_AJAX_URLS} from 'constants/UrlConstants';
import { getApi } from 'utils/apiUtils';
export async function handleGetPostsList(params) {
    const {post_type, post_status, paged, numPerPage, order, orderBy, filtered_params} = params;
    const url = ADMIN_AJAX_URLS.GET_ALL_ACTIVE_POSTS_LIST;
    const fd = new FormData();    
    fd.append('post_type', post_type);
    fd.append('paged', paged);
    fd.append('num_per_page', numPerPage);
    fd.append('order', order);
    fd.append('orderBy', orderBy);
    fd.append('post_status', post_status);
    fd.append('filtered_params', filtered_params ? JSON.stringify(filtered_params) : '');
    return await getApi("POST", url, fd);
}