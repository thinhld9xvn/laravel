import { handleFilter } from "./filter/handleFilter";

export function handleTxtSearchKeyDown(e) {
    const keyCode = e.which || e.keyCode;
    if ( keyCode === 13 ) {
        handleFilter.call(this);
    }
}