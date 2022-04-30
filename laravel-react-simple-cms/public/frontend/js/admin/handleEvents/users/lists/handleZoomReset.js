import * as tabListsEvents from 'utils/tabListsUtils'
export function handleZoomReset() {
    this.setState({
        zoom : 1
    });

    tabListsEvents.windowResizeEvent();
}