import { handleSelectFolder } from 'utils/filemanager/folders/handleSelectFolder';
export function handleChooseFolder(e) {
    let data = JSON.parse( e.currentTarget.dataset.item );
    if ( typeof( e.data ) === 'undefined' ) { 
        e.data = data;
    }   
    handleSelectFolder.call(this, data.path);
}