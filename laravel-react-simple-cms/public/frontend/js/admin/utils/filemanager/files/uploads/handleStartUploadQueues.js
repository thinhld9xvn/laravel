import { cloneDeep } from "lodash-es";
import { handleAddUploadErrorNotify } from "../handleAddUploadErrorNotify";
import { handleChangeToAnsiName } from "../handleChangeToAnsiName";
import { handleTravselFileLists } from "../handleTravselFileLists";
import { handleDoUpload } from "./handleDoUpload";

export async function handleStartUploadQueues(data) {
    const {config, file, fileData, autoRename} = data;
    const {UPLOAD_ERROR_MESSAGE, temp_files_list} = this.state;
    const {AllowUploadFileExtensions, AllowUploadMaxFileSizeMB} = config;
    const {exceed_limit_upload_size, not_support_file_type} = UPLOAD_ERROR_MESSAGE;    
    const file_ext = file['name'].split('.').pop().toLowerCase(),
            file_size = file['size'];
    const params = {file, autoRename, temp_files_list, fileData};
    let index = AllowUploadFileExtensions.findIndex(function (e) {
            return e === file_ext;
        });
        if (index !== -1) {
            let m_size_bytes = AllowUploadMaxFileSizeMB * (1024 * 1024);
            if (file_size <= m_size_bytes) {
                let r_data = await handleDoUpload.call(this, params);
                // tra ve ket qua upload
                if (typeof( r_data.error ) === 'undefined') {                          
                    let ufile = r_data,
                        i = temp_files_list.findIndex(f => f.name === fileData.name ); 
                    //handleImportDataUpload(tmp, ufile);     
                    temp_files_list[i] = cloneDeep(ufile);
                    const filesList = handleTravselFileLists(temp_files_list);
                    this.setState({ temp_files_list: cloneDeep(filesList) });
                } else {
                    alert('Có lỗi xảy ra khi upload, xin hãy kiểm tra lại !');
                }
            } else {
                handleAddUploadErrorNotify.call(this, fileData, exceed_limit_upload_size);
            }
        } else {
            handleAddUploadErrorNotify.call(this, fileData, not_support_file_type);
        }
}