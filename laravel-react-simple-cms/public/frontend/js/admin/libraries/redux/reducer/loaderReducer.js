import { cloneDeep } from "lodash";

const initialStates = {
    
    loaderState : false

};

export const loaderReducer = (state = initialStates, action) => {

    if ( action.reducer === 'loaderReducer' ) {

        switch ( action.type ) {

            case 'UPDATE_LOADER_STATE' :

                state.loaderState = action.payload;

                return cloneDeep(state);

            default :

                break;

        }

    }

    return cloneDeep(state);

}