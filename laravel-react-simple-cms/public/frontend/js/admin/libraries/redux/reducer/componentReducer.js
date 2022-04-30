import { cloneDeep } from "lodash";

const initialStates = {
    
    currentModeState : 1   

};

export const componentReducer = (state = initialStates, action) => {

    if ( action.reducer === 'componentReducer' ) {

        switch ( action.type ) {

            case 'UPDATE_CURRENT_MODE_STATE' :

                state.currentModeState = action.mode;

                return cloneDeep(state);                

            default :

                break;

        }

    }

    return cloneDeep(state);

}