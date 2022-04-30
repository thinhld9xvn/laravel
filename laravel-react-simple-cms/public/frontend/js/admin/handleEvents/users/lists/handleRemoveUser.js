import * as modalUtils from 'utils/modalUtils'
import {handleRemoveUserCallback} from './handleRemoveUserCallback'
export function handleRemoveUser(e) {
    const self = this,
          uid = e.currentTarget.dataset.uid;   
    modalUtils.showConfirmDialog({
        title : 'Thông báo',
        message : 'Bạn có chắc muốn thực hiện thao tác này không ?',        
        yes_label : 'Đồng ý',
        no_label : 'Hủy bỏ',
        yes_callback : () => {           
            handleRemoveUserCallback.call(self, [uid]);        
        },
        no_callback : () => {}
    });
}