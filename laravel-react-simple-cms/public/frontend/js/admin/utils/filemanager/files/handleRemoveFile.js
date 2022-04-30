import { ADMIN_AJAX_URLS } from "constants/UrlConstants";
import { getSelectedFolderObject } from "../folderUtils";
import { handleGetSelectedFiles } from "./handleGetSelectedFiles";
import { getApi } from "utils/apiUtils";
export async function handleRemoveFile() {
    const {REMOVE_FILES} = ADMIN_AJAX_URLS;
    var self = this,
        temp_files_list = self.state.temp_files_list,
        selected_files = handleGetSelectedFiles.call(self),
        selected_dir = getSelectedFolderObject.call(self),
        rm_files = [],
        length = 0;
    selected_files.map(f => {
        var sf = temp_files_list.filter(function (o) {
            return o['name'] === f['name'];
        });
        if (sf.length > 0) rm_files.push(sf[0]);
    });
    length = rm_files.length;
    if (length > 0) {
        if (confirm("Bạn có chắc muốn xóa những tập tin đã chọn không ?")) {
            const fd = new FormData();
            fd.append('attachments', JSON.stringify( rm_files ) );
            fd.append('dir', selected_dir.path);
            const results = await getApi('POST', REMOVE_FILES, fd);
            if ( !results ) {
                alert('Có lỗi xảy ra trong quá trình xóa tập tin !');
            } 
            if ( results.data.success ) {
                temp_files_list = temp_files_list.filter(f => {
                    let isFound = false;
                    for ( let i = 0; i < length; i++ ) {
                        // loại file ra khỏi danh sách
                        if ( rm_files[i]['name'] === f['name'] ) {
                            isFound = true;
                            break;
                        }
                    }
                    if ( ! isFound ) return true; // để lại file này trong danh sach
                    return false;
                });
                // reload lại danh sách files
                self.setState({ temp_files_list : temp_files_list });
            }
            else {
                alert('Có lỗi xảy ra trong quá trình xóa tập tin !');
            }
        }
    }
}