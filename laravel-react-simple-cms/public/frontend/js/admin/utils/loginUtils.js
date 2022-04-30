import axios from 'axios';
import {ADMIN_AJAX_URLS} from 'constants/UrlConstants';
import { getApi } from './apiUtils';
import { getClientUserToken } from './membershipUtils';
export async function checkLogin() {    
    const {CHECK_LOGIN_URL} = ADMIN_AJAX_URLS;
    return await getApi("GET", CHECK_LOGIN_URL, null);
}
export async function login(data) {    
    const {LOGIN_URL} = ADMIN_AJAX_URLS;    
    return await getApi("POST", LOGIN_URL, data, true);
}
export async function logout() {
    const {LOGOUT_URL} = ADMIN_AJAX_URLS;
    return await getApi("POST", LOGOUT_URL, null);
}