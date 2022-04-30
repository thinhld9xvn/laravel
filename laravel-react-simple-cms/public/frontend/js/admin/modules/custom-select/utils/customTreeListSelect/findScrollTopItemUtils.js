import { getItemSelectedIndex } from "./getItemSelectedIndexUtils";

export function findScrollTopItem(target) {
    let scrollTop = 0;
    const searchOffsetHeight = 36;
    const targetOffsetHeight = target.offsetHeight,
        index = getItemSelectedIndex.call(this);
    if ( index !== null ) {
        scrollTop = index * targetOffsetHeight - 2 * searchOffsetHeight;
    }
    return scrollTop;
}