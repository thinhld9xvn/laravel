import {ADMIN_AJAX_URLS} from 'constants/UrlConstants';
import { getApi } from 'utils/apiUtils';
export async function handleGetDeActivePostTypesList() {
    const {GET_ALL_POST_TYPES_LIST} = ADMIN_AJAX_URLS;
    return await getApi("POST", GET_ALL_POST_TYPES_LIST, null);
}