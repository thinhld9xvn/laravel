import * as tabListsEvents from 'utils/tabListsUtils'
export function handleZoomOut() {
    const { zoom } = this.state,
          _zoom = zoom - 0.1;

    this.setState({
        zoom : _zoom
    });    

    tabListsEvents.windowResizeEvent();
}