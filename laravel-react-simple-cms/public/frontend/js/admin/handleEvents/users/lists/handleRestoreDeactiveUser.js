import * as modalUtils from 'utils/modalUtils'
import {handleRestoreUserCallback} from './handleRestoreUserCallback'
export function handleRestoreDeactiveUser(e) {
    const self = this,
          uid = e.currentTarget.dataset.uid;
    modalUtils.showConfirmDialog({
        title : 'Thông báo',
        message : 'Bạn có chắc muốn khôi phục thành viên này không ?',        
        yes_label : 'Đồng ý',
        no_label : 'Hủy bỏ',
        yes_callback : () => {
            handleRestoreUserCallback.call(self, [uid]);
        },
        no_callback : () => {}
    });
}