import { handleFilter } from "./handleFilter";
export function handleCategoryFilter(categoryName, categoryId) {
    this.categoryFilterInst && 
        this.categoryFilterInst.setValue(categoryName, categoryId);
    this.authorFilterInst.setValue('Tất cả tác giả', -1);
    this.postModifiedFilterInst.setValue('Tất cả ngày đăng', -1);
    handleFilter.call(this);
}