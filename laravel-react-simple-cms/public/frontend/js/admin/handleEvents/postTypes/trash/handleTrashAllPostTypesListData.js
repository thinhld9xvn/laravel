import * as modalUtils from 'utils/modalUtils';
import { handleRemovePostTypeCallback } from '../remove/handleRemovePostTypeCallback';
export function handleTrashAllPostTypesListData() {
    const rowsIdSelected = this.rowsIdSelectedRef;
    rowsIdSelected &&
        rowsIdSelected.length > 0 &&
        modalUtils.showConfirmDialog({
            title: 'Thông báo',
            message: 'Bạn có chắc muốn thực hiện thao tác này không ?',
            yes_label: 'Đồng ý',
            no_label: 'Hủy bỏ',
            yes_callback: () => {
                handleRemovePostTypeCallback.call(this, rowsIdSelected.map(r => r.id));           
            },
            no_callback: () => { }
        });
}