import { cloneDeep } from "lodash";
export function handleClearSearchUserNameFilter(e) {
    document.querySelector('.tab-pane.active .searchUserNameKey').value = '';
    this.keywords = '';
    this.setState((prevState) => ({
        filteredItems : cloneDeep(this.state.data)
    }));     
}