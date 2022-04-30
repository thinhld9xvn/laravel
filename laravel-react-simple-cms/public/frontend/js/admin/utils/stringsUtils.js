export function encodeBase64(s) {
    return btoa(s);
}
export function decodeBase64(s) {
    return atob(s);
}
export function checkBase64(s) {
    return /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/.test(s);
}