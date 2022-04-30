import { isUndefined } from "utils/libUtils";
export function handleTravselUnCheckedPropTagNode(tag) {
    if ( isUndefined(tag.checked) || tag.checked ) {
        tag.checked = false;
    }
}