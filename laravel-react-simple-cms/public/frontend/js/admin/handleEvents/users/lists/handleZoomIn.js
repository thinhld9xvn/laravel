import * as tabListsEvents from 'utils/tabListsUtils'
export function handleZoomIn() {
    const { zoom } = this.state;
    this.setState({
        zoom : zoom + 0.1
    });  
    tabListsEvents.windowResizeEvent();
}