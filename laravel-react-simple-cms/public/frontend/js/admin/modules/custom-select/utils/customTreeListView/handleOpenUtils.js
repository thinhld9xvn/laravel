import { findScrollTopItem } from "./findScrollTopItemUtils";
import { handleOutsideClick } from "./handleOutsideClickUtils";
import { handleWaitCustomListsLoading } from "./handleWaitCustomListsLoadingUtils";
export function handleOpen(e) {
    let {isOpen} = this.state,
        {displayMode} = this.props;
    if ( ! this.onAddEvent_handleOutsideClick ) {
        this.setState(prevState => ({
            isOpen: ! prevState.isOpen
        }), () => {
            document.addEventListener('click', handleOutsideClick, false);
            if ( displayMode === 'dialog' ) {
                /*this.resizePos(pageY); 
                const elem = document.querySelector('.popbox.opened.visible .text');
                elem ? elem.style.overflow = 'hidden' : null;*/
            }
        });
        this.onAddEvent_handleOutsideClick = true;
    }    
    if ( ! isOpen ) {
        let target = e.currentTarget,
            parentTarget = target.nextElementSibling,                
            scrollTop = findScrollTopItem.call(this, target),
            offsetHeight = e.currentTarget.offsetHeight;
        handleWaitCustomListsLoading.call(this, parentTarget, () => {                
            parentTarget.scrollTop = scrollTop > 0 ? scrollTop - offsetHeight : scrollTop;
        });           
    }    
}