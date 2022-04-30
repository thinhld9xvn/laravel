import { handleGetAllActiveUsers } from './membership/handleGetAllActiveUsers';
import { handleGetAllDeActiveUsers } from './membership/handleGetAllDeActiveUsers';
import { handleGetAllUsers } from './membership/handleGetAllUsers';
import { handleGetClientUserInfo } from './membership/handleGetClientUserInfo';
import { handleGetClientUserToken } from './membership/handleGetClientUserToken';
import { handleGetUserAvatarsList } from './membership/handleGetUserAvatarsList';
import { handleGetUserRolesList } from './membership/handleGetUserRolesList';
import { handleGetUsersListFilterMilesData } from './membership/handleGetUsersListFilterMilesData';
import { handleRemoveClientUserInfo } from './membership/handleRemoveClientUserInfo';
import { handleSaveClientUserInfo } from './membership/handleSaveClientUserInfo';
import { handleUpdateProfileSelectedAvatar } from './membership/handleUpdateProfileSelectedAvatar';
import { handleUpdateUserRoleMetaDispatch } from './membership/handleUpdateUserRoleMetaDispatch';
import { handleUpdateUsersListRoleMetaDispatch } from './membership/handleUpdateUsersListRoleMetaDispatch';
import { handleUploadAvatar } from './membership/handleUploadAvatar';
import { handlePerformUsersTabDidMountHook } from './postTypes/handlePerformUsersTabDidMountHook';
const USER_INFO_KEY = 'userinfo';
const USER_TOKEN_KEY = 'usertoken';
export function getUserInfo() {
    return getClientUserInfo();
}
export function saveClientUserInfo(uinfo) {
    handleSaveClientUserInfo(uinfo, USER_INFO_KEY, USER_TOKEN_KEY);
}
export function getClientUserToken() {
    return handleGetClientUserToken(USER_TOKEN_KEY);
}
export function getClientUserInfo() {
    return handleGetClientUserInfo(USER_INFO_KEY);
}
export function removeClientUserInfo() {
    handleRemoveClientUserInfo(USER_INFO_KEY);
}
export async function getUserRolesList() {
    return await handleGetUserRolesList();
}
export async function getUserAvatarsList() {
    return await handleGetUserAvatarsList();
}
export async function uploadAvatar(blobImage, username, callback) {
    await handleUploadAvatar.call(this, {blobImage, username, callback});
}
export async function getAllActiveUsers() {
    return await handleGetAllActiveUsers();
}
export async function getAllDeActiveUsers() {
    return await handleGetAllDeActiveUsers();
}
export async function getAllUsersList() {
    return await handleGetAllUsers();
}
export function getUsersListFilterMilesData(data) {
    return handleGetUsersListFilterMilesData(data);
}
export function updateUserRoleMetaDispatch(roles_list, userinfo) {
    handleUpdateUserRoleMetaDispatch.call(this, {roles_list, userinfo});         
}
export function updateUsersListRoleMetaDispatch(roles_list, usersList, type = 'active') {
    handleUpdateUsersListRoleMetaDispatch.call(this, {roles_list, usersList, type});
}
export function updateProfileSelectedAvatar(data) {
    handleUpdateProfileSelectedAvatar(data);
}
export async function performUsersTabDidMountHook() {
    await handlePerformUsersTabDidMountHook();
}