export function handleAddParameterToUrl(url, para_name, para_value) {
    let location = new URL(url);
    location.searchParams.set(para_name, para_value);
    return location;
}