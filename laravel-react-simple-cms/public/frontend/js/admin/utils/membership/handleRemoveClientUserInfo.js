export function handleRemoveClientUserInfo(user_info_key) {
    const uinfo = localStorage.getItem(user_info_key);
    if ( uinfo ) {
        localStorage.removeItem(user_info_key);
    }
}