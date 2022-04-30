import { showConfirmDialog } from "utils/modalUtils";
import { handleRemovePost } from "../remove/handleRemovePost";
export async function handleTrashPost(ids, post_type = 'post') {
    showConfirmDialog({
        title: 'Thông báo',
        message: `Bạn đang thực hiện xóa bài viết, bài viết đã xóa sẽ được chuyển vào thùng rác, 
                    bạn vẫn muốn thực hiện thao tác này ?`,
        yes_label: 'Đồng ý',
        no_label: 'Hủy bỏ',
        yes_callback: async () => {
            await handleRemovePost.call(this, Array.isArray(ids) ? ids : [ids], post_type);
        },
        no_callback: () => { }
    });
}