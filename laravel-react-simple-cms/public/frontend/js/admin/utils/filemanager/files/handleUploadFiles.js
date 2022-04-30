import { handleGetUploadConfig } from "./handleGetUploadConfig";
import { handleAddUploadQueue } from "./uploads/handleAddUploadQueue";
import { handleStartUploadQueues } from "./uploads/handleStartUploadQueues";
export async function handleUploadFiles(ufs) {
    let upload_files = ufs,
        length = ufs.length,
        filesData = [],
        config = await handleGetUploadConfig(),
        self = this;
    if (length > 0) {
        for (let i = length - 1; i >= 0; i--) {  
            filesData[i] = handleAddUploadQueue.call(this, i, upload_files, true);
        }
        for (let i = length - 1; i >= 0; i--) {  
            const file = upload_files[i];
            const fileData = filesData[i];
            const autoRename = true;
            const data = {config, file, fileData, autoRename};
            const results = await new Promise(async (resolve, reject) => {
                setTimeout(async function () {
                    resolve(await handleStartUploadQueues.call(self, data));
                }, 200);
            });
        }
    }
}