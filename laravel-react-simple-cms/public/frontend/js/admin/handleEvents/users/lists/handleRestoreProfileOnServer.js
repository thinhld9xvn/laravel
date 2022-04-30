import axios from 'axios'
import {ADMIN_AJAX_URLS} from 'constants/UrlConstants'
import { getApi } from 'utils/apiUtils';
export async function handleRestoreProfileOnServer(uid) {
    const {RESTORE_DEACTIVE_USER} = ADMIN_AJAX_URLS;
    const fd = new FormData();    
    fd.append("guid", uid );
    return await getApi("POST", RESTORE_DEACTIVE_USER, fd);
}