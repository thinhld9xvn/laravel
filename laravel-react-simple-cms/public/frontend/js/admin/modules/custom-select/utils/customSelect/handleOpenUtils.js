import { getItemSelectedIndex } from "./getItemSelectedIndexUtils";
import { waitCustomListsLoading } from "./waitCustomListsLoadingUtils";

export function handleOpen(e) {
    let {isOpen, scrollTop} = this.state; 
    this.setState(prevState => ({
        isOpen: ! prevState.isOpen
    }));   
    if ( ! isOpen ) {
        let target = e.currentTarget,
            parentTarget = target.nextElementSibling,   
            offsetHeight = e.currentTarget.offsetHeight;
        if ( scrollTop === 0 ) {
            const targetOffsetHeight = target.offsetHeight,
                    index = getItemSelectedIndex.call(this);
            if ( index !== null ) {
                scrollTop = ( index + 1 ) * targetOffsetHeight;
            }
        }
        waitCustomListsLoading.call(this, parentTarget, () => { 
            parentTarget.scrollTop = scrollTop - offsetHeight;
        });
    }    
}