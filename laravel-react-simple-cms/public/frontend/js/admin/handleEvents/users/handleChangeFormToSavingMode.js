import { C_MODE_STATES } from "constants/formConstants";
export function handleChangeFormToSavingMode() {
    this.props.updateCurrentModeComponent( C_MODE_STATES.saving );
}