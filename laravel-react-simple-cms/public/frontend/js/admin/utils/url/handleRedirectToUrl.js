export function handleRedirectToUrl(url, params) {
    let location = new URL(url);
    if ( Array.isArray(params) ) {
        params.map(p => {
            location.searchParams.set(p.name, p.value);
        });    
    }
    else {
        location.searchParams.set(params.name, params.value);
    }
    window.location.href = location.href;
}