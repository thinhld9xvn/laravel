export function handleGetClientUserToken(user_token_key) {
    const token = localStorage.getItem(user_token_key);
    if ( !token ) return null;
    return token;
}