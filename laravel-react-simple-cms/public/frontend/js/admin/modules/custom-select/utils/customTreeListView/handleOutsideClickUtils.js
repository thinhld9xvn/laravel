export function handleOutsideClick(e, isClose) {
    e.preventDefault();
    if ( ! document.querySelector('.select-list.open').contains(e.target) || isClose ) {
        document.removeEventListener('click', handleOutsideClick, false);
        this.onAddEvent_handleOutsideClick = false;      
        this.setState(prevState => ({
            isOpen: false
        }));
        const elem = document.querySelector('.popbox.opened.visible .text');
        elem ? elem.style.overflow = '' : null;
    }
}