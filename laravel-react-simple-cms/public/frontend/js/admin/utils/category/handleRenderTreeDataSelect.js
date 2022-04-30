import { EMPTY_PARENT_CATEGORY } from 'constants/categoryConstants'
export function handleRenderTreeDataSelect(data) {
    if ( data.length === 0 ) return data;
    if ( data[0].value.toString() !== EMPTY_PARENT_CATEGORY.value ) {
        data.splice(0, 0, {
            name : EMPTY_PARENT_CATEGORY.name,
            value : EMPTY_PARENT_CATEGORY.value,
            selected : false
        });
    }
    return data;
}