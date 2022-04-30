import axios from 'axios';
import {JSON_CONFIG_URL} from 'constants/UrlConstants';
export async function handleGetSidebarMenu() {
    let ajax_url = JSON_CONFIG_URL + 'sidebarMenu.config.json';
    return await axios({
        method : "GET",
        url : ajax_url,
        responseType : "json"
    }); 
}