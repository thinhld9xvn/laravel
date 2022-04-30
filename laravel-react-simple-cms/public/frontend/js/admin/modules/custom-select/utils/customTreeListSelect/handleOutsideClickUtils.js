import { handleCloseSelectList } from "./handleCloseSelectListUtils";
export function handleOutsideClick(e) {
    e.preventDefault();
    const container = document.querySelector('.option-custom.option-custom-tree-list-select.open');
    if ( container && ! container.contains(e.target) ) {
        handleCloseSelectList.call(this);
    }
}