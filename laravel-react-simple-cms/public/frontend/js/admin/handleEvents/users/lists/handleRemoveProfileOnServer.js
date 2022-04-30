import { REMOVE_ACTIONS } from 'constants/globalConstants';
import {ADMIN_AJAX_URLS} from 'constants/UrlConstants'
import { getApi } from 'utils/apiUtils';
export async function handleRemoveProfileOnServer(uid) {
    const {REMOVE_ACTIVE_USER} = ADMIN_AJAX_URLS;
    const fd = new FormData();
    fd.append("guid", uid );
    fd.append("method", REMOVE_ACTIONS.soft ); 
    return await getApi("POST", REMOVE_ACTIVE_USER, fd);
}