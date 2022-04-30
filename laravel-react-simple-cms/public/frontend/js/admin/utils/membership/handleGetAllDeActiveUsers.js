import axios from 'axios';
import { ADMIN_AJAX_URLS } from "constants/UrlConstants";
import { getApi } from 'utils/apiUtils';
export async function handleGetAllDeActiveUsers() {
    const {GET_ALL_DEACTIVE_USERS} = ADMIN_AJAX_URLS;
    return await getApi('GET', GET_ALL_DEACTIVE_USERS, null);
}