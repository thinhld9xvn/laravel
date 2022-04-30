export function handleCheckUserChildPage(route) {
    const pathname = window.location.pathname;
    if ( pathname.startsWith('/admin/users/') ) {
        const last_route = pathname.split('/').pop();
        return last_route == route;
    }
    return false;
}