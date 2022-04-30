import { MODAL_IDS } from "constants/modalConstants";
import { openPopboxModal } from "utils/modalUtils";
export function handleShowCtModal() {
    openPopboxModal(MODAL_IDS.CATEGORY_EMBBED);  
}