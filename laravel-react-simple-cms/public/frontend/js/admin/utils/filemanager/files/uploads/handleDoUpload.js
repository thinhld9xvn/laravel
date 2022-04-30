import axios from "axios";
import { ADMIN_AJAX_URLS } from "constants/UrlConstants";
import { getClientUserToken } from "utils/membershipUtils";
import { handleGetSelectedFolderObject } from "../../folders/handleGetSelectedFolderObject";
import { handleProgressUpload } from "./handleProgressUpload";

export async function handleDoUpload(data) {
    const {UPLOAD} = ADMIN_AJAX_URLS;
    const {file, autoRename, temp_files_list, fileData} = data;
    const file_name = fileData.name;
    const params = {temp_files_list, fileData};
    var selectedDir = handleGetSelectedFolderObject.call(this),
            reader = null,
            options = {},
            fd = new FormData();
        if (window.FileReader) {
            reader = new FileReader();
            reader.readAsDataURL(file);
            fd.append("attachment", file);
            fd.append('dir', selectedDir.path);
            if (autoRename || file['name'].toLowerCase() !== file_name) {
                options['newFileName'] = file_name;
            }
            if (Object.keys(options).length > 0) {
                fd.append('options', JSON.stringify(options));
            }
            const token = getClientUserToken();
            if (!token) return null;
            axios.interceptors.response.use(
                res => res,
                err => false
            );
            let result = await axios({
                method: "POST",
                headers : {
                    'Authorization' : `Bearer ${token}`
                },
                url: UPLOAD,
                data: fd,
                onUploadProgress: (e) => handleProgressUpload.call(this, e, params)
            }).then(res => res.data, err => err);
            return result.data;
        }
}