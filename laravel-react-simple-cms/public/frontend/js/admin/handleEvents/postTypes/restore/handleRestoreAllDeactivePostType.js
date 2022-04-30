import * as modalUtils from 'utils/modalUtils';
import * as _ from 'utils/libUtils';
import { handleRestorePostTypeCallback } from './handleRestorePostTypeCallback';
export function handleRestoreAllDeactivePostType() {
    const rowsIdSelected = this.rowsIdSelectedRef;
    rowsIdSelected &&
        rowsIdSelected.length > 0 &&
        modalUtils.showConfirmDialog({
            title: 'Thông báo',
            message: 'Bạn có muốn khôi phục những mục bài viết này không ?',
            yes_label: 'Đồng ý',
            no_label: 'Hủy bỏ',
            yes_callback: () => {
                handleRestorePostTypeCallback.call(this, rowsIdSelected.map(r => r.id));
            },
            no_callback: () => { }
        });
}