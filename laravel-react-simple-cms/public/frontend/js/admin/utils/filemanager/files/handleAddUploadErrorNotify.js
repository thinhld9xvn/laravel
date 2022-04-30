// thông báo lỗi khi upload file
export function handleAddUploadErrorNotify(data, msg) {
    let {temp_files_list} = this.state,
        file = temp_files_list.filter(e => e['name'] === data['name'])[0];
    file.upload.error.stat = true;
    file.upload.error.message = msg;
    this.setState({ temp_files_list });
}