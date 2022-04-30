export function handleCheckFileExist(name) {
    return this.state.temp_files_list.filter(o => o['name'].toLowerCase() === name.toLowerCase())
                                     .length > 0;    
}