import { C_MODE_STATES } from "constants/formConstants";
export function handleChangeFormToEditMode() {
    this.props.updateCurrentModeComponent( C_MODE_STATES.edit );
}