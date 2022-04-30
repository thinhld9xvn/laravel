import { navbarInfo } from "constants/navbar";
import { cloneDeep } from "lodash";
const initialStates = {
   navbarInfo : cloneDeep(navbarInfo)
}
export const navbarInfoReducer = (state = initialStates, action) => {
    if ( action.reducer === 'navbarInfoReducer' ) {       
        switch ( action.type ) {
            case 'UPDATE_BRAND_NAME' :
                state.navbarInfo.navbar_brand = action.name;
                return cloneDeep( state );
            case 'UPDATE_NAV_STATE_ITEMS' :
                state.navbarInfo = action.payload;
                return cloneDeep( state );
            default : 
                break;
        }
    }
    return cloneDeep(state);
}