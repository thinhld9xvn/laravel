import { COMPONENT_INST } from "constants/componentConstants";
import { getComponentInst } from "utils/componentUtils";

export function handleGetEditorImageSize(image) {
    const {sizes} = image;
    const inst = getComponentInst(COMPONENT_INST.FILE_MANAGER);
    const {embbedChooseSize} = inst.state;
    const width = sizes[embbedChooseSize][0];
    const height = sizes[embbedChooseSize][1];
    return {width, height};
}