import * as _ from 'utils/libUtils'
import * as modalUtils from 'utils/modalUtils'
import {handleLoadAvatarSrc} from './handleLoadAvatarSrc'
import {MODAL_IDS} from 'constants/modalConstants'
export function handleOpenCropModal(file) {
    handleLoadAvatarSrc.call(this, file);
    const t = setInterval(() => {
        if ( ! _.isUndefined( document.isLoadedAvatar ) ) {
            if ( document.isLoadedAvatar ) {
                modalUtils.openPopboxModal(MODAL_IDS.CROP_AVATAR);
            }

            else {                
                modalUtils.showAlertDialog({
                    title : 'Thông báo',
                    message : 'Kích thước ảnh không hợp lệ !!!',
                    icon : 'error',
                    ok_label : 'Đồng ý',
                    ok_callback : () => {}            
                });            
            }
            clearInterval(t);
            delete document.isLoadedAvatar;
        }

    }, 200); 
       
}