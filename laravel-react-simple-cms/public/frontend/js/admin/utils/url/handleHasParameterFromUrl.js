export function handleHasParameterFromUrl(url, parameter) {
    let location = new URL(url);
    return location.searchParams.has(parameter);
}