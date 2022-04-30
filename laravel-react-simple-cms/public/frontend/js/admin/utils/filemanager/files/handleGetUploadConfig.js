import axios from "axios";
import { JSON_CONFIG_URL } from "constants/urlConstants";

// lấy thông tin cấu hình cho việc upload
export async function handleGetUploadConfig() {
    var d = await axios({
        url: JSON_CONFIG_URL.concat('upload.config.json'),
        method: 'GET',
        responseType: 'json'
    });
    return d.data;
}