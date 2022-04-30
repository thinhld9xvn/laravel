import { handleAddParameterToUrl } from "./url/handleAddParameterToUrl";
import { handleGetParameterFromUrl } from "./url/handleGetParameterFromUrl";
import { handleHasParameterFromUrl } from "./url/handleHasParameterFromUrl";
import { handleRedirectToUrl } from "./url/handleRedirectToUrl";
import { handleCheckUserChildPage } from "./url/handleCheckUserChildPage";
import { handleConvertStrToSlug } from "./url/handleConvertStrToSlug";
import { handleCheckApTypeChildPage } from "./url/handleCheckApTypeChildPage";
import { getComponentInst } from "./componentUtils";
import { handleRemoveAllParametersFromUrl } from "./url/handleRemoveAllParametersFromUrl";
import { COMPONENT_INST } from "constants/componentConstants";
export function getParameterFromUrl(url, parameter) {
    return handleGetParameterFromUrl.call(this, url, parameter);
}
export function removeAllParametersFromUrl(url) {
    return handleRemoveAllParametersFromUrl.call(this, url);
}
export function isDiffSearch(url1, url2) {
    const s1 = new URL(url1);
    const s2 = new URL(url2);
    return s1.search !== s2.search;
}
export function getFullUrlFromPathName(pathname) {
    if ( pathname.startsWith(window.location.origin) ) return pathname;
    return window.location.origin + pathname;
}
export function hasParameterFromUrl(url, parameter) {
    return handleHasParameterFromUrl.call(this, url, parameter);
}
export function addParameterToUrl(url, para_name, para_value) {
    return handleAddParameterToUrl.call(this, url, para_name, para_value);
}
// @params : array || json object
export function redirectToUrl(url, params) {
    handleRedirectToUrl.call(this, url, params);
}
export function isUserProfilePage() {
    return handleCheckUserChildPage('profile');
}
export function isAllUsersPage() {
    return handleCheckUserChildPage('all_users');
}
export function isNewUserPage() {
    return handleCheckUserChildPage('new_user');
}
export function isNewPostPage() {
    return handleCheckApTypeChildPage('newPost');
}
export function isEditPostPage() {
    return handleCheckApTypeChildPage('editPost');
}
export function convertStrToSlug(str) {
    return handleConvertStrToSlug(str);
}
export function getActiveUrlParams() {
    const inst = getComponentInst(COMPONENT_INST.MAIN_CONTAINER);
    return inst.activeUrlParams;
}
export function convertSlugToName(slug) {
    return slug.replace(/\-/ig, "_");
}