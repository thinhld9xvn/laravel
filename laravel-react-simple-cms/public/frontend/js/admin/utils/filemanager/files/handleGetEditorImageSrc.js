import { COMPONENT_INST } from "constants/componentConstants";
import { IMAGE_DEF_SIZES } from "constants/globalConstants";
import { getComponentInst } from "utils/componentUtils";
export function handleGetEditorImageSrc(image) {
    const {sizes, thumbnail : url} = image;
    const inst = getComponentInst(COMPONENT_INST.FILE_MANAGER);
    const {embbedChooseSize} = inst.state;
    const key = sizes.thumbnail ? `-${sizes.thumbnail[0]}x${sizes.thumbnail[1]}` : '';
    if ( key ) {
        const index = url.lastIndexOf(key);
        if ( index === -1 ) return url;
        return url.substr(0, index) + (embbedChooseSize === IMAGE_DEF_SIZES.full ? '' : `-${sizes[embbedChooseSize][0]}x${sizes[embbedChooseSize][1]}`) 
                                    + url.substr(index + key.length);
    }
    return url;
}