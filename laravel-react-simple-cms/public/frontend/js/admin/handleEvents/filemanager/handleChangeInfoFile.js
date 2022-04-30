export function handleChangeInfoFile(e) {
    let files_list = this.state.files_list,
        fileItem = files_list.filter(e => e.name == this.state.fileInfoInModal.name)[0],
        property = e.target.dataset.property;   
    fileItem.info[property] = e.target.value.toString().trim();
   this.setState({
    files_list : files_list
   });

}