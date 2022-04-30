import { getCopiedJsonObject } from "utils/libUtils";
import { handleChooseItemCallback } from "./nodes/handleChooseItemCallbackUtils";
export function handleChooseItem(v) {
    let filteredItems = getCopiedJsonObject( this.state.filteredItems );
    const { coordsNodesList, data } = this.state;
    filteredItems.map((e) => handleChooseItemCallback({nodes : coordsNodesList, data, filteredItems, node : e, v}));
    if (this.props.parent && this.props.variableReturn) {
        const arrLists = coordsNodesList.map(e => e.value);
        this.props.parent[this.props.variableReturn] = arrLists;
    }
    this.setState({
        filteredItems: getCopiedJsonObject( filteredItems ),
        coordsNodesList : getCopiedJsonObject(coordsNodesList)
    });
}