import {cloneDeep} from 'lodash';
export function handleClearTxtSearchPostType() {
    const {data} = this.state;
    this.s = '';
    document.querySelector('.tab-pane.active input.searchUserNameKey').value = '';
    this.setState({
        filteredItems: cloneDeep(data)
    })
}