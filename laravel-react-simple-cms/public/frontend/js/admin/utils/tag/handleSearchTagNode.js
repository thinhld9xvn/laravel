import { CATEGORY_NODE_TYPE_ENUM } from "constants/categoryConstants";
import { cloneDeep } from "lodash";
export function handleSearchTagNode(tag, v, isGetAllNode, ref, type, props) {
    // tìm kiếm theo "value" thì chỉ cần một kết quả trả về
    // còn tìm kiếm theo "url" thì trả về tất cả kết quả tìm được
    const isValueType = type === CATEGORY_NODE_TYPE_ENUM.value;     
    if ( props.searchedTagNode !== null && isValueType ) return true;
    const value = (isValueType ? tag[type] : tag.extras[type]).toString();
    const cvalue = v.toString();
    if ( (isValueType && value === cvalue) || (!isValueType && value.indexOf(cvalue) === 0) ) {
        if ( !isValueType && !props.searchedTagNode ) {
            props.searchedTagNode = [];
        }
        if ( !isGetAllNode ) {
            if ( !isValueType ) {
                props.searchedTagNode.push(!ref ? cloneDeep(tag.extras) : tag.extras);
            }
            else {
                props.searchedTagNode = !ref ? cloneDeep(tag.extras) : tag.extras;
            }
        }
        else {
            if ( !isValueType ) {
                props.searchedTagNode.push(!ref ? cloneDeep(tag) : tag);
            }
            else {
                props.searchedTagNode = !ref ? cloneDeep(tag) : tag;
            }
        }
    }
}