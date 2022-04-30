import * as modalUtils from 'utils/modalUtils';
import * as _ from 'utils/libUtils';
import { ADMIN_AJAX_URLS } from 'constants/UrlConstants';
import { getApi } from 'utils/apiUtils';
import { restorePostTypeHook } from 'hooks/postTypeHook/restorePostTypeHook';
export async function handleRestorePostTypeCallback(pids) {
    const {RESTORE_POST_TYPE_URL} = ADMIN_AJAX_URLS;
    _.showLoadingOverlay();
    if (pids.length > 0) {       
        const fd = new FormData();
        fd.append('data', JSON.stringify(pids));
        const response = await getApi("POST", RESTORE_POST_TYPE_URL, fd);
        if ( !response ) return;
        const data = response.data;        
        if (!data.success) {
            _.closeLoadingOverlay();
            modalUtils.showAlertDialog({
                title: 'Thông báo',
                message: data.message || "Phát hiện lỗi khi khôi phục mục bài viết, mời thử lại !!!",
                icon: 'error',
                ok_label: 'Đồng ý',
                ok_callback: () => {
                }
            });
            return;
        }
        else {
            restorePostTypeHook.call(this, pids);
        }
    }
    _.closeLoadingOverlay();
}