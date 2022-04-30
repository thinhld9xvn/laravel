import { cloneDeep } from "lodash";
export function handleProgressUpload(e, data) {
    const {temp_files_list, fileData} = data;
    const files_list = cloneDeep(temp_files_list);
    if (e.lengthComputable && this.state.upload_stat !== false) {
        let ufile = files_list.filter(e => e['name'] === fileData['name'])[0],
            max = e.total,
            current = e.loaded,
            percentage = current * 100 / max;	
        if ( percentage <= 100 ) {
            ufile.thumbnail = ''; // wait ajax complete and update lists	
            ufile.upload.stat = true;
            ufile.upload.percentage = percentage;
            this.setState({ temp_files_list : cloneDeep(files_list) });
        }
    }
}