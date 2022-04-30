import {onChange_handleProfileText as _onChange_handleProfileText,
        onChange_handleProfileNumber as _onChange_handleProfileNumber} from './userProfileHandleEvents';
import { handleEditUser } from './users/lists/handleEditUser';
import { handleRemoveUser } from './users/lists/handleRemoveUser';
import { handleRestoreDeactiveUser } from './users/lists/handleRestoreDeactiveUser';
import { handleShowChooseAvatarDialog } from './users/lists/handleShowChooseAvatarDialog';
import { hanldeProfileEditMode } from './users/lists/handleProfileEditMode';
import { handleProfileEditSave } from './users/lists/handleProfileEditSave';
import { handleCloseEditUserModal } from './users/lists/handleCloseEditUserModal';
import { handleCloseChooseAvatarDialog } from './users/lists/handleCloseChooseAvatarDialog';
import { handleSetUserAvatar } from './users/lists/handleSetUserAvatar';
import { handleUserPasswordForm } from './users/lists/handleUserPasswordForm';
import { showChangePassModal } from './users/lists/handleShowChangePassModal';
import { handleTxtSearchUserNameChanged } from './users/lists/handleTxtSearchUserNameChanged';
import { handleClearSearchUserNameFilter } from './users/lists/handleClearSearchUserNameFilter';
import { handleZoomIn } from './users/lists/handleZoomIn';
import { handleZoomOut } from './users/lists/handleZoomOut';
import { handleZoomReset } from './users/lists/handleZoomReset';
import { handleToggleTabFullScreen } from './users/lists/handleToggleTabFullScreen';
import { handleRefreshUsersListData } from './users/lists/handleRefreshUsersListData';
import { handleTrashAllUsersListData } from './users/lists/handleTrashAllUsersListData';
import { handleRestoreAllUsersListData } from './users/lists/handleRestoreAllUsersListData';
export function onClick_editUser(e) {
    e.preventDefault();
    handleEditUser.call(this, e);
}
export function onClick_removeUser(e) {
    e.preventDefault();
    handleRemoveUser.call(this, e);
}
export function onClick_restoreDeactiveUser(e) {
    e.preventDefault();
    handleRestoreDeactiveUser.call(this, e);
}
export function onChange_handleProfileText(e) {  
    _onChange_handleProfileText.call(this, e);
}
export function onChange_handleProfileNumber(e) { 
    _onChange_handleProfileNumber.call(this, e);
}
export function onClick_showChooseAvatarDialog(e) {
    e.preventDefault(); 
    handleShowChooseAvatarDialog.call(this);    
}
export function onClick_ProfileEditMode(e) {
    e.preventDefault();
    hanldeProfileEditMode.call(this);
}
export function onClick_ProfileEditSave(e) {  
    e.preventDefault();    
    handleProfileEditSave.call(this);
}
export function onClick_CloseEditUserModal(e) {
    e.preventDefault();    
    handleCloseEditUserModal.call(this);    
}
export function onClick_closeChooseAvatarDialog(e) {
    e.preventDefault();
    handleCloseChooseAvatarDialog.call(this);
}
export function onClick_setUserAvatar(e) {
    e.preventDefault();
    handleSetUserAvatar.call(this);
}
export function onSubmit_handleUserPasswordForm(e) {    
    e.preventDefault();       
    handleUserPasswordForm.call(this);
} 
export function onClick_showChangePassModal(e) {
    e.preventDefault();    
    showChangePassModal.call(this);
}
export function onChange_txtSearchUserNameChanged(e) {
    this.keywords = e.currentTarget.value;
}
export function onKeyDown_txtSearchUserNameChanged(e) {  
    handleTxtSearchUserNameChanged.call(this, e);
}
export function onClick_clearSearchUserNameFilter(e) {
    e.preventDefault();
    handleClearSearchUserNameFilter.call(this, e);
}
export function onClick_zoomIn() { 
    handleZoomIn.call(this);
}
export function onClick_zoomOut() {
    handleZoomOut.call(this);
}
export function onClick_zoomReset() {         
    handleZoomReset.call(this);
}
export function onClick_toggleTabFullScreen() {
    handleToggleTabFullScreen.call(this);
}
export function onClick_refreshUsersListData(e) {
    e.preventDefault();
    handleRefreshUsersListData();
}
export function onClick_trashAllUsersListData(e) {
    e.preventDefault();
    handleTrashAllUsersListData.call(this);
}
export function onClick_restoreAllUsersListData(e) {
    e.preventDefault();
    handleRestoreAllUsersListData.call(this);
}