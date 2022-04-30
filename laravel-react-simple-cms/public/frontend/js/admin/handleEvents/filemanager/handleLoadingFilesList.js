import {handleLoadingFilesList as _handleLoadingFilesList } from 'utils/filemanager/files/handleLoadingFilesList';
export function handleLoadingFilesList(e) {
    const element = e.currentTarget;        
    if ( element.scrollTop + element.clientHeight >= element.scrollHeight ) {
        let files_scroll_paged = this.state.files_scroll_paged,
            temp_files_list = this.state.temp_files_list,
            _temp_files_list = _handleLoadingFilesList(this.state.files_list, 
                                                        this.state.files_per_page, 
                                                        files_scroll_paged);           
        if ( _temp_files_list.length > 0 ) {
            temp_files_list = temp_files_list.concat( _temp_files_list );
            this.setState({
                temp_files_list,
                files_scroll_paged : files_scroll_paged + 1
            });
        }
    }
}