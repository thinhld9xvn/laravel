import * as modalUtils from 'utils/modalUtils';
import { handleRemovePermantlyPostTypeCallback } from '../remove/handleRemovePermantlyPostTypeCallback';
export function handleTrashPermantlyAllPostType() {
    const rowsIdSelected = this.rowsIdSelectedRef;
    rowsIdSelected &&
        rowsIdSelected.length > 0 &&
        modalUtils.showConfirmDialog({
            title: 'Thông báo',
            message: `Bạn có thực sự muốn xóa vĩnh viễn những mục bài viết này không ? 
                    Lưu ý: Thao tác này sẽ xóa tất các bảng dữ liệu liên quan, cần cân nhắc 
                    thât kỹ khi thực hiện thao tác này !!!
                `,
            yes_label: 'Đồng ý',
            no_label: 'Hủy bỏ',
            yes_callback: () => {
                handleRemovePermantlyPostTypeCallback.call(this, rowsIdSelected.map(r => r.id));            
            },
            no_callback: () => { }
        });
}