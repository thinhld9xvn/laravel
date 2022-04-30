import * as modalUtils from 'utils/modalUtils'
import {handleRemoveUserCallback} from './handleRemoveUserCallback'
export function handleTrashAllUsersListData() {
    const self = this, 
         usersListIdSelected = [...this.usersListIdSelectedRef];
    usersListIdSelected && usersListIdSelected.length > 0 && 
        modalUtils.showConfirmDialog({
            title : 'Thông báo',
            message : 'Bạn có chắc muốn thực hiện thao tác này không ?',        
            yes_label : 'Đồng ý',
            no_label : 'Hủy bỏ',
            yes_callback : () => {
                handleRemoveUserCallback.call(self, usersListIdSelected);        
            },
            no_callback : () => {}
        });
}