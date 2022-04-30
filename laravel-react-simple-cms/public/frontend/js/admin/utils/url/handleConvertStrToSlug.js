import { handleRemoveAccents } from "./handleRemoveAccents";

export function handleConvertStrToSlug(str) {
    if ( !str ) return '';
    let url = handleRemoveAccents(str).replace(/\s/g, '-')
                                .replace(/[`’‘~!@#$%^&*()|+\=?;:'"″,.<>\{\}\[\]\\\/]/ig, '')
                                .toLowerCase()
                                .trim();
    if ( url.substr(url.length - 1, 1) === '-' ) {
        return url.substr(0, url.length - 1);
    }
    return url;
}