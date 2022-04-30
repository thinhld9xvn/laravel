import * as modalUtils from 'utils/modalUtils';
import { uploadFiles } from 'utils/filemanager/fileUtils';
import { MODAL_IDS } from 'constants/modalConstants';

export function handleShowModalChooseFile() {
    let el = document.createElement('input'),
        self = this;
    
    el.type = "file";
    el.multiple = "true";

    el.onchange = event => { 
        modalUtils.closePopboxModal(MODAL_IDS.FILE_UPLOAD);
        uploadFiles.call(self, event.target.files);
    }

    el.click();
}