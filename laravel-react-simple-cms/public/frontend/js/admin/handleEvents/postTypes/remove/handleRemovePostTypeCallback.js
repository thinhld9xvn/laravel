import {showAlertDialog} from 'utils/modalUtils';
import * as _ from 'utils/libUtils';
import { ADMIN_AJAX_URLS } from 'constants/UrlConstants';
import { getApi } from 'utils/apiUtils';
import { removePostTypeHook } from 'hooks/postTypeHook/removePostTypeHook';
export async function handleRemovePostTypeCallback(pids, action = 'trash', removePostTypeHookCallback = removePostTypeHook) {
    const {REMOVE_POST_TYPE_URL} = ADMIN_AJAX_URLS;      
    _.showLoadingOverlay();
    if (pids.length > 0) {        
        const fd = new FormData();
        fd.append('data', JSON.stringify(pids));
        fd.append('action', action);
        const response = await getApi("POST", REMOVE_POST_TYPE_URL, fd);
        if ( !response ) {
            _.closeLoadingOverlay();
            showAlertDialog({
                title: 'Thông báo',
                message: "Phát hiện lỗi khi xóa mục bài viết, mời thử lại !!!",
                icon: 'error',
                ok_label: 'Đồng ý',
                ok_callback: () => { 
                }
            });
            return;
        }
        const results = response.data;
        //
        if ( !results.success ) {
            _.closeLoadingOverlay();
            showAlertDialog({
                title: 'Thông báo',
                message: "Phát hiện lỗi khi xóa mục bài viết, mời thử lại !!!",
                icon: 'error',
                ok_label: 'Đồng ý',
                ok_callback: () => {}
            });
            return;
        }
        removePostTypeHookCallback.call(this, pids, action);
        //        
    }
    _.closeLoadingOverlay();
}