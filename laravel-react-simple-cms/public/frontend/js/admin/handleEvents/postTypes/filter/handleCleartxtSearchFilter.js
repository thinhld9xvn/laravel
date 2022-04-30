import { handleDeselectAllRows } from "utils/datatableUtils";
import { handleClearFilter } from "./handleClearFilter";
export function handleCleartxtSearchFilter() {
    handleDeselectAllRows();
    handleClearFilter.call(this);
}