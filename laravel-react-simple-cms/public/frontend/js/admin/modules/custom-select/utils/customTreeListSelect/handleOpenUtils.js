import { findScrollTopItem } from "./findScrollTopItemUtils";
import { waitCustomListsLoading } from "./waitCustomListsLoadingUtils";
export function handleOpen(e) {
    let {isOpen} = this.state;
    this.setState(prevState => ({
        isOpen: ! prevState.isOpen
    }));
    if ( ! isOpen ) {
        let target = e.currentTarget,
            parentTarget = target.nextElementSibling,                
            scrollTop = findScrollTopItem.call(this, target),
            offsetHeight = e.currentTarget.offsetHeight;
        waitCustomListsLoading.call(this, parentTarget, () => {                
            parentTarget.scrollTop = scrollTop > 0 ? scrollTop - offsetHeight : scrollTop;
        });           
    }    
    else {
        this.setState({
            searchText : ''
        });
    }
}