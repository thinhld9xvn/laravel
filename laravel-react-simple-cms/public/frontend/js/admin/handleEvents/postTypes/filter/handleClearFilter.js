import { handleFilter } from "./handleFilter";
export function handleClearFilter() {
    this.authorFilterInst.setValue('Tất cả tác giả', '-1');
    this.categoryFilterInst && 
        this.categoryFilterInst.setValue('Tất cả danh mục', '-1');
    this.postModifiedFilterInst.setValue('Tất cả ngày đăng', '-1');
    this.s = '';
    document.querySelector('.tab-pane.active input.searchUserNameKey').value = '';
    handleFilter.call(this);
    
}