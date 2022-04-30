import axios from 'axios'
import {ADMIN_AJAX_URLS} from 'constants/UrlConstants'
import { getApi } from 'utils/apiUtils';
import { getAttachmentPathFromUrl } from 'utils/filemanager/fileUtils';
import {getClientUserToken} from 'utils/membershipUtils'
export async function handleUpdateProfileToServer() {
    const {UPDATE_PROFILE_URL} = ADMIN_AJAX_URLS;
    const fd = new FormData();
    const {originalUserProfile : profile} = this.props;
    Object.keys(profile)
          .forEach((key, i) => {        
        let value = profile[key];
        if ( key === 'avatar' ) {
            value = getAttachmentPathFromUrl(value);
        }
        if (typeof(value) === 'undefined' || 
                    value === null ) return;
        fd.append(key, value);
    });
    axios.interceptors.response.use(
        res => res,
        err => false
    );
    return await getApi("POST", UPDATE_PROFILE_URL, fd);
}