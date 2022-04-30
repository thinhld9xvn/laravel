export function handleGetParameterFromUrl(url, parameter) {
    let location = new URL(url);    
    return location.searchParams.get(parameter);
}