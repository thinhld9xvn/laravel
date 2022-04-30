import { COMPONENT_INST } from "constants/componentConstants";
import { MEDIA_MODAL_COMMAND } from "constants/globalConstants";
import { getComponentInst } from "utils/componentUtils";
import { getSelectedFiles, isImageType, getAttachmentPathFromUrl } from "utils/filemanager/fileUtils";
import { closeMediaEmbbedModal } from "utils/filemanager/mediaEmbbedModalUtils";
import { handleInsertAttachment } from './handleChooseObject/handleInsertAttachment';
import { handleAttachFeatureImage } from './handleChooseObject/handleAttachFeatureImage';
import { handleChangeFeaturedImageCatObject } from "./handleChooseObject/handleChangeFeaturedImageCatObject";
import { showAlertDialog } from "utils/modalUtils";
export function handleChooseObject(e) {
    e.preventDefault();
    const inst = getComponentInst(COMPONENT_INST.FILE_MANAGER),
            mediaPointerInst = document.mediaEmbbedModalPointer,
            {formFields} = mediaPointerInst.state,
            selected_files = getSelectedFiles.call(inst),
            file = selected_files[0],
            {thumbnail : src, info} = file,
            isImage = isImageType(file),
            {alt} = info,
            pathname = getAttachmentPathFromUrl(src, 'uploads');
    const command = document.mediaEmbbedModalCommand || MEDIA_MODAL_COMMAND.insertAttachment;
    //
    if ( !selected_files || !selected_files.length ) return;
    //
    if ( command === MEDIA_MODAL_COMMAND.insertAttachment ) {
        handleInsertAttachment.call(this, selected_files, {alt});
    }
    if ( command === MEDIA_MODAL_COMMAND.attachFeaturedImage ) {
        const results = handleAttachFeatureImage.call(this, {mediaPointerInst, src, alt, pathname, isImage});
        if ( !results ) {
            showAlertDialog({
                title : 'Thông báo',
                message : 'Đây không phải là ảnh, mời chọn  một đối tượng khác !!!',
                icon : 'error',
                ok_label : 'Đồng ý',
                ok_callback : () => {}
            });
            return false;
        }
    }
    if ( command === MEDIA_MODAL_COMMAND.changeFeaturedImageCatObject  ) {
        const results = handleChangeFeaturedImageCatObject.call(this, {mediaPointerInst, formFields, src, isImage});
        if ( !results ) {
            showAlertDialog({
                title : 'Thông báo',
                message : 'Đây không phải là ảnh, mời chọn  một đối tượng khác !!!',
                icon : 'error',
                ok_label : 'Đồng ý',
                ok_callback : () => {}
            });
            return false;
        }
    }
    closeMediaEmbbedModal.call(this);
}