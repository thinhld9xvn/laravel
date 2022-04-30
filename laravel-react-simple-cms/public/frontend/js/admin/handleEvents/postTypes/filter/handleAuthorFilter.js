import { handleFilter } from "./handleFilter";
export function handleAuthorFilter(authorName, authorId) {
    this.authorFilterInst.setValue(authorName, authorId);
    this.postModifiedFilterInst.setValue('Tất cả ngày đăng', -1);
    this.categoryFilterInst && 
        this.categoryFilterInst.setValue('Tất cả danh mục', -1);
    handleFilter.call(this);
}