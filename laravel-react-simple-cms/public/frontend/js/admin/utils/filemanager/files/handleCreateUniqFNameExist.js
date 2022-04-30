import { handleGetUniqFnObject } from "./handleGetUniqFnObject";

export function handleCreateUniqFNameExist(name) {
    let fn = handleGetUniqFnObject(name),
        uniq_name = fn.name,
        ext = fn.extension,
        id = 0,
        list_files = this.state.temp_files_list.filter(f => f.name.startsWith(uniq_name) !== -1);
    list_files.map((f, i) => {
        var _fn_obj = handleGetUniqFnObject(f.name),
            fname = _fn_obj.name,
            fname_splices = fname.split('-'),
            fid = parseInt(fname_splices.pop());
        if (isNaN(fid)) {
            fid = 0;
        }
        if (fid > id) {
            id = fid;
        }
    });
    id += 1;
    return uniq_name + '-' + id.toString() + '.' + ext;
}