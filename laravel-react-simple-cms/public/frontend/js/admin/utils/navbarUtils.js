import { handleGetBrandNameByText } from "./navbar/handleGetBrandNameByText";
import { handleUpdateBrandNameByUrl } from "./navbar/handleUpdateBrandNameByUrl";
export function updateBrandNameByUrl() {
    handleUpdateBrandNameByUrl.call(this);
}
export function getBrandNameByText(text) {
    return handleGetBrandNameByText(text);
}