import { CATEGORY_NODE_TYPE_ENUM } from "constants/categoryConstants";
import { cloneDeep } from "lodash";
export function handleSearchCategoryNode(cat, v, isGetAllNode, ref, type, props) {
    // tìm kiếm theo "value" thì chỉ cần một kết quả trả về
    // còn tìm kiếm theo "url" thì trả về tất cả kết quả tìm được
    const isValueType = type === CATEGORY_NODE_TYPE_ENUM.value;     
    if ( props.searchedCatNode !== null && isValueType ) return true;
    const value = (isValueType ? cat[type] : cat.extras[type]).toString();
    const cvalue = v.toString();
    if ( (isValueType && value === cvalue) || (!isValueType && value.indexOf(cvalue) === 0) ) {
        if ( !isValueType && !props.searchedCatNode ) {
            props.searchedCatNode = [];
        }
        if ( !isGetAllNode ) {
            if ( !isValueType ) {
                props.searchedCatNode.push(!ref ? cloneDeep(cat.extras || cat) : cat.extras || cat);
            }
            else {
                props.searchedCatNode = !ref ? cloneDeep(cat.extras || cat) : cat.extras || cat;
            }
        }
        else {
            if ( !isValueType ) {
                props.searchedCatNode.push(!ref ? cloneDeep(cat) : cat);
            }
            else {
                props.searchedCatNode = !ref ? cloneDeep(cat) : cat;
            }
        }
        if ( !isValueType && cat.childrens && cat.childrens.length ) {
            cat.childrens.map(c => handleSearchCategoryNode(c, v, isGetAllNode, ref, type, props));
        }
    }
    else {
        if ( cat.childrens && cat.childrens.length ) {
            cat.childrens.map(c => handleSearchCategoryNode(c, v, isGetAllNode, ref, type, props));
        }
    }
}