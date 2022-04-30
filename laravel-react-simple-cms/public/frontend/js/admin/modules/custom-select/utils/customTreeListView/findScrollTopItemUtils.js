import { handleGetItemSelectedIndex } from "./handleGetItemSelectedIndexUtils";
export function findScrollTopItem(target) {
    let scrollTop = 0;
    const targetOffsetHeight = target.offsetHeight,
        index = handleGetItemSelectedIndex.call(this);
    if ( index !== null ) {
        scrollTop = index * targetOffsetHeight;
    }
    return scrollTop;
}