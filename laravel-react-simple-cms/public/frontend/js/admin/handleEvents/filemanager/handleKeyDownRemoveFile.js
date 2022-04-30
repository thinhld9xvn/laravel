import { handleRemoveFile } from "utils/filemanager/files/handleRemoveFile";
export function handleKeyDownRemoveFile(evt) {    
    const DELETE_KEY = 46;    
    if ( this.state.keyPreview ) {
        if ( evt !== undefined && evt.keyCode === DELETE_KEY ) {
            handleRemoveFile.call(this);
        }
    }
}