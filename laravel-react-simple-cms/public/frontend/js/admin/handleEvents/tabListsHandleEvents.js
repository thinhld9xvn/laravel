import {windowResizeEvent} from 'utils/tabListsUtils'

export function onClick_selectTab(k, e) { 
    if ( ! e.currentTarget.classList.contains('active') ) {
        setTimeout(() => {
            windowResizeEvent();
        }, 100);
    }
}

