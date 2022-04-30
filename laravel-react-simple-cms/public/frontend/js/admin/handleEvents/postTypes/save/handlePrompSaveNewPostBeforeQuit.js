import { showConfirmDialog } from "utils/modalUtils";
export function handlePrompSaveNewPostBeforeQuit(params) {
    const {activeUrlParams, yes_callback, no_callback} = params;
    history.pushState('', '', activeUrlParams);
    showConfirmDialog({
        title : 'Thông báo',
        message : 'Bạn chưa lưu bài viết hiện tại, bạn vẫn muốn thoát ?',
        yes_label: 'Đồng ý',
        no_label: 'Hủy bỏ',
        yes_callback,
        no_callback
    });
    return;
}