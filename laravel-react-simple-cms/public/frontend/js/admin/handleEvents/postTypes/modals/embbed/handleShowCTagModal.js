import { MODAL_IDS } from "constants/modalConstants";
import { openPopboxModal } from "utils/modalUtils";
export function handleShowCTagModal() {
    openPopboxModal(MODAL_IDS.TAG_EMBBED);  
}