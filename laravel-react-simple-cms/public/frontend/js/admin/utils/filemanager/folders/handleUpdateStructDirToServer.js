import { ADMIN_AJAX_URLS } from "constants/UrlConstants";
import { getApi } from "utils/apiUtils";
export async function handleUpdateStructDirToServer(folderinfo) {
    const {UPDATE_DIR_STRUCTURES} = ADMIN_AJAX_URLS;
    const {old_path, new_path} = folderinfo;
    const fd = new FormData();
    fd.append('old_path', old_path);
    fd.append('new_path', new_path);
    const results = await getApi('POST', UPDATE_DIR_STRUCTURES, fd);
    if ( !results ) return false;
    return results.data;
}