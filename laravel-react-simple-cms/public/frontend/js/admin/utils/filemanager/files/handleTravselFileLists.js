import { FIMAGES_DIR_URL } from "constants/UrlConstants";
export function handleTravselFileLists(data) {
    return data.map(file => {
        if ( !file.thumbnail ) {
            const {code, icon} = file.type;
            if ( code !== 'image' ) {
                file.thumbnail = FIMAGES_DIR_URL + icon + '.png';
            }
        }
        return file;
    });
}