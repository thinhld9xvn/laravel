import { cloneDeep } from 'lodash';
import { handleSetFilterChanged } from './handleSetFilterChanged';
export function setFilterResults(filteredItems) {
    handleSetFilterChanged.call(this, true);
    this._filteredItems = cloneDeep(filteredItems);
    this.setState({
        filteredItems : cloneDeep(filteredItems)
    });
}