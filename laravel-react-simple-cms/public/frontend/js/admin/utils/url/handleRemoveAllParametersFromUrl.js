export function handleRemoveAllParametersFromUrl(url) {
    let location = new URL(url);    
    return location.pathname;
}