export function handleSaveClientUserInfo(uinfo, user_info_key, user_token_key) {
    if ( !uinfo ) return false;
    const {token} = uinfo;
    localStorage.setItem(user_info_key, JSON.stringify(uinfo));
    if ( token ) {
        localStorage.setItem(user_token_key, token);
    }
}