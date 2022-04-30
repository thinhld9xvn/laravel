import * as modalUtils from 'utils/modalUtils';
import { MODAL_IDS } from 'constants/modalConstants';
import { getSelectedFiles } from 'utils/filemanager/fileUtils';

export function handleShowInfoFile() {
    let items = getSelectedFiles.call(this),
        item = null;
    if ( items.length === 1 ) {
        item = items[0];
        this.setState({
            fileInfoInModal : item
        }, () => {
            setTimeout(() => {
                modalUtils.openPopboxModal(MODAL_IDS.FILE_INFO);
            }, 200);
        }); 
    }
}