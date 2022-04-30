import { ADMIN_AJAX_URLS } from "constants/UrlConstants";
import { getApi } from "utils/apiUtils";
import { closeLoadingOverlay, showLoadingOverlay } from "utils/libUtils";
import { showAlertDialog, showConfirmDialog } from "utils/modalUtils";
async function perform() {
    const {IMPORT_SAMPLE_TAGS} = ADMIN_AJAX_URLS;
    return await getApi("POST", IMPORT_SAMPLE_TAGS, null);
}
export function handleImportDefSampleData() {
    showConfirmDialog({
        title: 'Thông báo',
        message: 'Bạn đang thực hiện tạo dữ liệu mô phỏng mặc định cho phần thẻ. Dữ liệu hiện tại sẽ bị ghi đè, bạn có muốn thực hiện thao tác này không ?',
        yes_label: 'Đồng ý',
        no_label: 'Hủy bỏ',
        yes_callback: async () => {
            showLoadingOverlay();
            const {data} = await perform(); 
            if ( data.data ) {
                showAlertDialog({
                    title : 'Thông báo',
                    message : 'Tạo dữ liệu mô phỏng thành công !!!',
                    icon : 'information',
                    ok_label : 'Đồng ý',
                    ok_callback : () => {
                        document.querySelector('.tab-pane.active .toolbar .btnRefresh').click();
                    }
                });
            }
            closeLoadingOverlay();
        },
        no_callback: () => { }
    });
}