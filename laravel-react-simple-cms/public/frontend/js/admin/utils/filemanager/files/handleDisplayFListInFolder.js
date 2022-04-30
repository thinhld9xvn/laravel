import { getApi } from "utils/apiUtils";
export async function handleDisplayFListInFolder(ajax_url, path) {  
    const files_list = await getApi('GET', ajax_url, { path });
    if ( !files_list ) return null;
    return files_list.data.data;
}