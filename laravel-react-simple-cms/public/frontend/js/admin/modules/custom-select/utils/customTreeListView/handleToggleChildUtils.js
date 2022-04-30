export function handleToggleChild(e) {
    e.preventDefault();
    const target = e.currentTarget,
            childList = target.nextElementSibling;
    if ( childList.classList.contains('active') ) {
        target.classList.remove('-minimize');
        childList.classList.remove('active');
    }
    else {
        target.classList.add('-minimize');
        childList.classList.add('active');
    }
}