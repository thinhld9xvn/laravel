import * as tabListsEvents from 'utils/tabListsUtils'
export function handleToggleTabFullScreen() {
    this.setState((prevState) => ({
        isFullScreen : !prevState.isFullScreen,
        zoom : 1
    }));    
    setTimeout(() => {
        tabListsEvents.windowResizeEvent();
    }, 200);
}