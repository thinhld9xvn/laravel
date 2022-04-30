export function handleGetClientUserInfo(user_info_key) {
    const uinfo = localStorage.getItem(user_info_key);
    if ( !uinfo ) return null;
    return JSON.parse(uinfo);
}