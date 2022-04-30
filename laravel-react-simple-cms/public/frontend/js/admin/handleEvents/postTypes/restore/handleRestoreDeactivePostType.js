import * as modalUtils from 'utils/modalUtils';
import { handleRestorePostTypeCallback } from './handleRestorePostTypeCallback';
export function handleRestoreDeactivePostType(e) {
    const pid = e.currentTarget.dataset.pid;
    modalUtils.showConfirmDialog({
        title: 'Thông báo',
        message: 'Bạn có muốn khôi phục mục bài viết này không ?',
        yes_label: 'Đồng ý',
        no_label: 'Hủy bỏ',
        yes_callback: () => {
            handleRestorePostTypeCallback.call(this, [pid]);
        },
        no_callback: () => { }
    });
}