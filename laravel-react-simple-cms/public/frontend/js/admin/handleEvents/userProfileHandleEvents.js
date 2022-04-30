import * as _ from 'utils/libUtils';
import { handleProfileEditMode } from './users/handleProfileEditMode';
import { handleProfileEditSave } from './users/handleProfileEditSave';
import { handleProfileTextChanged } from './users/handleProfileTextChanged';
import { handleProfileNumberChanged } from './users/handleProfileNumberChanged';
import { handleShowChooseAvatarDialog } from './users/handleShowChooseAvatarDialog';
import { handleCloseChooseAvatarDialog } from './users/handleCloseChooseAvatarDialog';
import { handleChooseAvatarInModal } from './users/new/handleChooseAvatarInModal';
import { handleSetUserAvatar } from './users/profile/handleSetUserAvatar';
import { handleCropAvatarModal } from './users/profile/handleCropAvatarModal';
import { handleCloseCropAvatarModal } from './users/profile/handleCloseCropAvatarModal';
import { handleCropAvatar } from './users/profile/handleCropAvatar';
import { handleOpenCropModal } from './users/profile/handleOpenCropModal';
import { handleUploadOtherAvatar } from './users/profile/handleUploadOtherAvatar';
export function onClick_ProfileEditMode(e) {
    e.preventDefault();
    handleProfileEditMode.call(this);
}
export async function onClick_ProfileEditSave(e) {   
    e.preventDefault(); 
    handleProfileEditSave.call(this);
}
export function onChange_handleProfileText(e) {    
    handleProfileTextChanged.call(this, e);
}
export function onChange_handleProfileNumber(e) {    
    handleProfileNumberChanged.call(this, e);
}
export function onClick_showChooseAvatarDialog(e) {
    e.preventDefault();
    handleShowChooseAvatarDialog.call(this);    
}
export function onClick_closeChooseAvatarDialog(e) {
    e.preventDefault();
    handleCloseChooseAvatarDialog.call(this);
}
export function onClick_chooseAvatarInModal(e) {
    e.preventDefault();
    handleChooseAvatarInModal.call(this, e);
}
export function onClick_setUserAvatar(e) {
    e.preventDefault();
    handleSetUserAvatar.call(this);
}
export function init_CropAvatarModal() {
    handleCropAvatarModal.call(this);
}
export function onClick_CloseCropAvatarModal(e) {
    e.preventDefault();
    handleCloseCropAvatarModal.call(this);
}
export function onClick_CropAvatar(e) {
    e.preventDefault();
    handleCropAvatar.call(this);    
}
export function openCropModal(file) {   
    handleOpenCropModal.call(this, file);
}
export function onClick_uploadOtherAvatar(e) {
    e.preventDefault();
    handleUploadOtherAvatar.call(this);  
}