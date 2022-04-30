import { handleOpenCropModal } from "./handleOpenCropModal";
export function handleUploadOtherAvatar() {
    let el = document.createElement('input'),
        self = this;
    el.type = "file";
    el.accept="image/*";
    el.onchange = event => { 
        const file = event.target.files[0];
        self.setState({ is_ajax_loading : true });
        handleOpenCropModal.call(self, file);
        self.setState({ is_ajax_loading : false });
    }
    el.click();
}