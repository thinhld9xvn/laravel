import { cloneDeep } from "lodash-es";
import { handleChangeToAnsiName } from "../handleChangeToAnsiName";
import { handleCheckFileExist } from "../handleCheckFileExist";
import { handleCreateUniqFNameExist } from "../handleCreateUniqFNameExist";
import { handleGetNewDataFile } from "../handleGetNewDataFile";
// autoRename: tự động đổi tên file nếu file đã tồn tại
export function handleAddUploadQueue(i, upload_files, autoRename) {
    let file = upload_files[i],
        file_name = handleChangeToAnsiName(file['name'].toLowerCase()),
        file_exist = handleCheckFileExist.call(this, file_name),
        fileData = handleGetNewDataFile.call(this, file_name),
        {temp_files_list} = this.state;
    if (file_exist && autoRename) {
        file_name = handleCreateUniqFNameExist.call(this, file_name);
        fileData.name = file_name;
    }
    // chen file vao dau danh sach
    temp_files_list.splice(0, 0, fileData);
    this.setState({ temp_files_list : cloneDeep(temp_files_list) });     // update ui 
    return fileData;
}