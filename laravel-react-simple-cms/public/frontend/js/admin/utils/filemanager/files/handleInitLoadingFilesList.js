import { handleLoadingFilesList } from "./handleLoadingFilesList";
export function handleInitLoadingFilesList() {
    const {files_scroll_paged, files_list, files_per_page} = this.state;
    const panel = document.querySelector('#file-manager .fm-right');
    panel && (panel.scrollTop = 0);
    const temp_files_list = handleLoadingFilesList(files_list, files_per_page, files_scroll_paged);
    this.setState({
        temp_files_list,
        files_scroll_paged: files_scroll_paged + 1
    });
}