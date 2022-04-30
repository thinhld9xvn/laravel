import {cloneDeep} from 'lodash'
export function handleDeSelectAllFiles() {
    this.state.temp_files_list.map(e => {
        e.active && (
            e.active = false
        );
    });
}
export function handleDeSelectAndUpdateAllFiles() {
    const {temp_files_list} = this.state;
    const files_list = temp_files_list.map(e => {
        e.active && (
            e.active = false
        );
        return e;
    });
    this.setState({
        temp_files_list : cloneDeep(files_list)
    });
}