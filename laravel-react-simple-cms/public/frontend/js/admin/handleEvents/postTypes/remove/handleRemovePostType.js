import * as modalUtils from 'utils/modalUtils';
import * as _ from 'utils/libUtils';
import { handleRemovePostTypeCallback } from './handleRemovePostTypeCallback';
export function handleRemovePostType(e) {   
    const pid = e.currentTarget.dataset.pid;
    modalUtils.showConfirmDialog({
        title: 'Thông báo',
        message: 'Bạn có muốn thực hiện thao tác này không ?',
        yes_label: 'Đồng ý',
        no_label: 'Hủy bỏ',
        yes_callback: () => {
            handleRemovePostTypeCallback.call(this, [pid]);
        },
        no_callback: () => { }
    });
}