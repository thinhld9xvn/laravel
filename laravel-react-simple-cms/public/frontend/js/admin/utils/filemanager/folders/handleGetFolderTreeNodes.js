import { getApi } from "utils/apiUtils";
export async function handleGetFolderTreeNodes(ajax_url) {
    const nodes = await getApi('GET', ajax_url, null);
    if ( !nodes ) return null;
    return nodes.data.data;
}