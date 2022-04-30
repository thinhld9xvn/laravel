import { handleSetUserAvatar } from './users/new/handleSetUserAvatar';
import { handleCropAvatar } from './users/new/handleCropAvatar';
import { handleChooseAvatarInModal } from './users/new/handleChooseAvatarInModal';
import { handleProfileText } from './users/new/handleProfileText';
import { handleProfileNumber } from './users/new/handleProfileNumber';
import { handleCreateNewUserForm } from './users/new/handleCreateNewUserForm';
import { handleReloadForm } from './users/new/handleReloadForm';
export function onClick_setUserAvatar(e) {
    e.preventDefault();
    handleSetUserAvatar.call(this, e);
}
export function onClick_CropAvatar(e) {
    e.preventDefault();
    handleCropAvatar.call(this);
}
export function onClick_chooseAvatarInModal(e) {
    e.preventDefault();
    handleChooseAvatarInModal.call(this, e);
}
export function onChange_handleProfileText(e) {
    handleProfileText.call(this, e);
}
export function onChange_handleProfileNumber(e) {
    handleProfileNumber.call(this, e);
}
export function onSubmit_handleCreateNewUserForm(e) {
    e.preventDefault();
    handleCreateNewUserForm.call(this);    
}
export function reloadForm(e) {
    e && e.preventDefault();
    handleReloadForm.call(this);
}