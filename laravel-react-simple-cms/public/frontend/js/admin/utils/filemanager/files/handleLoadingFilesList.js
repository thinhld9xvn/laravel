export function handleLoadingFilesList(files_list, num_per_page, paged) {
    let temp_filemanager_files = [],
        length = files_list.length,
        start = num_per_page * paged - num_per_page,
        count = 0;
    files_list.map((e,i) => {
        if (i >= start && start < length && count < num_per_page) {
            temp_filemanager_files.push(e);
            count++;
        }
    });
    return temp_filemanager_files;
}