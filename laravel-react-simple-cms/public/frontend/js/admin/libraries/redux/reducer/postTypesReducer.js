import { cloneDeep } from "lodash";
const initialStates = {
    postTypesList : [],   
    deactivePostTypesList : [],    
    postTypeEditing : null    
};
export const postTypesReducer = (state = initialStates, action) => {
    if ( action.reducer === 'postTypesReducer' ) {
        switch ( action.type ) {
            case 'UPDATE_POST_TYPES_LIST' :
                state.postTypesList = action.payload;
                return cloneDeep(state);
            case 'UPDATE_DEACTIVE_POST_TYPES_LIST' :
                state.deactivePostTypesList = action.payload;
                return cloneDeep(state);
            case 'UPDATE_POST_TYPE_EDITING' :
                state.postTypeEditing = action.payload;                
                return cloneDeep(state);            
            default :
                break;
        }
    }
    return cloneDeep(state);
}