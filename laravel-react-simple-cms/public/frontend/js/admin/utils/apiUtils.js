import axios from "axios";
import { getClientUserToken } from "utils/membershipUtils";
export async function getApi(method = "GET", url, formData, ignoreToken = false) {
    const token = getClientUserToken();
    if (!ignoreToken && !token) return;
    const config = {
        method,
        headers : {
            'Authorization' : `Bearer ${token}`
        },
        url,
        responseType : "json"
    };
    axios.interceptors.response.use(
        res => res,
        err => false
    );
    if ( formData ) {
        if ( method === 'POST' ) {
            config.data = formData;
        }
        else {
            config.params = formData;
        }
    }
    return await axios(config).then(res => res, err => err);
}