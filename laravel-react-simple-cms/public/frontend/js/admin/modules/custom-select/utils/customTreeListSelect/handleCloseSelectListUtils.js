export function handleCloseSelectList() {
    this.setState(prevState => ({
        isOpen: false,
        searchText : ''
    }));
    const elem = document.querySelector('.popbox.opened.visible .text');
    elem ? elem.style.overflow = '' : null;
}