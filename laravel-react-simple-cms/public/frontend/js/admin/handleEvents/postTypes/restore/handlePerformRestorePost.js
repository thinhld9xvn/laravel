import { showConfirmDialog } from "utils/modalUtils";
import { handleRestorePost } from "./handleRestorePost";

export function handlePerformRestorePost(guids, post_type = 'post') {
    showConfirmDialog({
        title: 'Thông báo',
        message: `Bạn có thực sự muốn phục hồi bài viết này không ?`,
        yes_label: 'Đồng ý',
        no_label: 'Hủy bỏ',
        yes_callback: async () => {  
            await handleRestorePost.call(this, guids, post_type);     
        },
        no_callback: () => { }
    });
}