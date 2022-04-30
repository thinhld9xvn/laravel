import * as modalUtils from 'utils/modalUtils';
import { getComponentInst } from 'utils/componentUtils';
import { MODAL_IDS } from 'constants/modalConstants';
import { COMPONENT_INST } from 'constants/componentConstants';
export function openMediaEmbbedModal(params) {
    const inst = getComponentInst(COMPONENT_INST.FILE_MANAGER);
    const {fileManagerCExtraSettings, mediaEmbbedModalCommand, mediaEmbbedModalPointer, mediaButton} = params;
    if ( fileManagerCExtraSettings ) {
        document.fileManagerCExtraSettings = fileManagerCExtraSettings;
    }
    if ( mediaEmbbedModalCommand ) {
        document.mediaEmbbedModalCommand = mediaEmbbedModalCommand;
    }
    if ( mediaEmbbedModalPointer ) {
        document.mediaEmbbedModalPointer = mediaEmbbedModalPointer;
    }
    if ( mediaButton ) {
        const btn = mediaButton.closest('.mediaButton');
        document.activeTinyMceEditorId = btn ? btn.nextElementSibling
                                                .querySelector('textarea')
                                                .id : null;
    }
    inst.setState({ keyPreview : true });
    modalUtils.openPopboxModal(MODAL_IDS.MEDIA_EMBBED);
}
export function closeMediaEmbbedModal() {
    const inst = getComponentInst(COMPONENT_INST.FILE_MANAGER);
    if ( document.mediaEmbbedModalCommand ) {
        delete document.mediaEmbbedModalCommand; 
    }
    if ( document.fileManagerCExtraSettings ) {
        delete document.fileManagerCExtraSettings;
    }
    if ( document.mediaEmbbedModalPointer ) {
        delete document.mediaEmbbedModalPointer;
    }
    inst.setState({ keyPreview : false });
    modalUtils.closePopboxModal(this.state.modal_id);        
}