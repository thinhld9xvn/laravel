export function handleToggleSidebar(e) {
    const target = e.target;
    const sidebar = document.getElementById('sidebar');    
    if ( sidebar.classList.contains('-minimize') ) {
        sidebar.classList.remove('-minimize');
    }
    else {
        sidebar.classList.add('-minimize');
    }
    //
    if ( target.classList.contains('-expand') ) {
        target.classList.remove('-expand');
    }
    else {
        target.classList.add('-expand');
    }
}