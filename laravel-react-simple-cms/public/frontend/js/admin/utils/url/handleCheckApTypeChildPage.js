export function handleCheckApTypeChildPage(route) {
    const pathname = window.location.pathname;
    if ( pathname.startsWith('/admin/ap_type/') ) {
        const last_route = pathname.split('/').pop();
        return last_route == route;
    }
    return false;
}