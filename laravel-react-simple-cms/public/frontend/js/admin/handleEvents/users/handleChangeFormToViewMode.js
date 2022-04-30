import { C_MODE_STATES } from "constants/formConstants";
import {handleResetFormValidateState} from './handleResetFormValidateState';
export function handleChangeFormToViewMode(form) {
    this.props.updateCurrentModeComponent( C_MODE_STATES.view );
    handleResetFormValidateState.call(this, form);
}