import { C_MODE_STATES } from "constants/formConstants";
export function handleCheckFormEditMode() {
    const { currentModeComponent } = this.props;
    return currentModeComponent === C_MODE_STATES.edit;
}