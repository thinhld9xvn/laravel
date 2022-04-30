import * as modalUtils from 'utils/modalUtils';
import { handleRemovePermantlyPostTypeCallback } from '../remove/handleRemovePermantlyPostTypeCallback';
export function handleTrashPermantlyPostType(e) {
    const self = this,
        pid = e.currentTarget.dataset.pid;
    modalUtils.showConfirmDialog({
        title: 'Thông báo',
        message: `Bạn có thực sự muốn xóa vĩnh viễn mục bài viết này không ? 
                    Lưu ý: Thao tác này sẽ xóa tất các bảng dữ liệu liên quan, cần cân nhắc 
                    thât kỹ khi thực hiện thao tác này !!!
                  `,
        yes_label: 'Đồng ý',
        no_label: 'Hủy bỏ',
        yes_callback: () => {
            handleRemovePermantlyPostTypeCallback.call(self, [pid]);
        },
        no_callback: () => { }
    });
}