import { COMPONENT_INST } from "constants/componentConstants";
import { getComponentInst } from "utils/componentUtils";
import { handleDeSelectAndUpdateAllFiles } from "./handleDeSelectAllFiles";
export function handleRefreshShowEmbbedModal() {
    const inst = getComponentInst(COMPONENT_INST.FILE_MANAGER);
    handleDeSelectAndUpdateAllFiles.call(inst);
}