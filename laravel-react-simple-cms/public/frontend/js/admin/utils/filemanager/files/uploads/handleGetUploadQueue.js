import { handleChangeToAnsiName } from "../handleChangeToAnsiName";
import { handleCheckFileExist } from "../handleCheckFileExist";
import { handleGetNewDataFile } from "../handleGetNewDataFile";
export async function handleGetUploadQueue(i, upload_files) {
    let file = upload_files[i],
        file_name = handleChangeToAnsiName(file['name'].toLowerCase()),
        file_ext = file['name'].split('.').pop().toLowerCase(),
        file_exist = handleCheckFileExist.call(this, file_name),
        file_size = file['size'],
        fileData = handleGetNewDataFile.call(this, file_name);
    return {

    };
}