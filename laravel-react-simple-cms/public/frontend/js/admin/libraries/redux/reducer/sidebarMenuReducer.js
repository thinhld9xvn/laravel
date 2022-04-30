import { cloneDeep } from "lodash";

const initialStates = {

    menuItems : []

};

export const sidebarMenuReducer = (state = initialStates, action) => {

    if ( action.reducer === 'sidebarMenuReducer' ) {

        switch ( action.type ) {

            case 'UPDATE_SIDEBAR_MENU' :

                state.menuItems = action.payload;

                return cloneDeep(state);

            default :

                break;

        }

    }

    return cloneDeep(state);

}