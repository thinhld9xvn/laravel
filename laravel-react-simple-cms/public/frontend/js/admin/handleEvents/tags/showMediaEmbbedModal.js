import { MEDIA_MODAL_COMMAND } from "constants/globalConstants";
import { handleRefreshShowEmbbedModal } from "utils/filemanager/files/handleRefreshShowEmbbedModal";
import { openMediaEmbbedModal } from "utils/filemanager/mediaEmbbedModalUtils"
export function showMediaEmbbedModal() {
    const params = {
        fileManagerCExtraSettings : {
            chooseSingleFile : true
        },
        mediaEmbbedModalCommand : MEDIA_MODAL_COMMAND.changeFeaturedImageCatObject,
        mediaEmbbedModalPointer : this
    };
    handleRefreshShowEmbbedModal();
    openMediaEmbbedModal(params);
}