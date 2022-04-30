import { handleRefreshShowEmbbedModal } from "utils/filemanager/files/handleRefreshShowEmbbedModal";
import { openMediaEmbbedModal } from "utils/filemanager/mediaEmbbedModalUtils";
export function handleShowMediaDialog(command, e) {    
    const params = {
        fileManagerCExtraSettings : {
            chooseSingleFile : true
        },
        mediaEmbbedModalCommand : command,
        mediaEmbbedModalPointer : this,
        mediaButton : e.target
    };
    handleRefreshShowEmbbedModal();
    openMediaEmbbedModal(params);
}