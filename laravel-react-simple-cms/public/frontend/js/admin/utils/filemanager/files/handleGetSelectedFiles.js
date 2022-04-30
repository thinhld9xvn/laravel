export function handleGetSelectedFiles() {
    var f_ids = [];
    this.state.temp_files_list.map(e => {
        if (e.active) {
            f_ids.push(e);
        }
    });
    return f_ids;
}