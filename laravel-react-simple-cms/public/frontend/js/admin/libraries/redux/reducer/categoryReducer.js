import { cloneDeep } from "lodash";

const initialStates = {

    activeCategoryNode : null,
    originalActiveCategoryNode : null,
    activeCategoriesLists : []

};

export const categoryReducer = (state = initialStates, action) => {

    if ( action.reducer === 'categoryReducer' ) {

        switch ( action.type ) {

            case 'UPDATE_ACTIVE_CATEGORY_NODE' :

                state.activeCategoryNode = action.payload;

                return cloneDeep(state);

            case 'UPDATE_ORIGINAL_ACTIVE_CATEGORY_NODE' :

                state.originalActiveCategoryNode = action.payload;

                return cloneDeep(state);

            case 'UPDATE_ACTIVE_CATEGORIES_LISTS' :

                state.activeCategoriesLists = action.payload;

                return cloneDeep(state);

            default :

                break;

        }

    }

    return cloneDeep(state);

}