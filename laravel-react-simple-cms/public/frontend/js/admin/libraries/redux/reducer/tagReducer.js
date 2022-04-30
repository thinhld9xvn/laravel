import { cloneDeep } from "lodash";
const initialStates = {
    activeTagNode : null,
    originalActiveTagNode : null,
    activeTagsLists : []
};
export const tagReducer = (state = initialStates, action) => {
    if ( action.reducer === 'tagReducer' ) {
        switch ( action.type ) {
            case 'UPDATE_ACTIVE_TAG_NODE' :
                state.activeTagNode = action.payload;
                return cloneDeep(state);
            case 'UPDATE_ORIGINAL_ACTIVE_TAG_NODE' :
                state.originalActiveTagNode = action.payload;
                return cloneDeep(state);
            case 'UPDATE_ACTIVE_TAGS_LISTS' :
                state.activeTagsLists = action.payload;
                return cloneDeep(state);
            default :
                break;
        }
    }
    return cloneDeep(state);
}