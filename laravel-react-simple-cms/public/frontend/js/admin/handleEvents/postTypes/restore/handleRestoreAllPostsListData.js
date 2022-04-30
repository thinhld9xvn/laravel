import { showConfirmDialog } from "utils/modalUtils";
import { handleRestorePost } from "./handleRestorePost";
async function perform(ids, post_type) {
    await handleRestorePost.call(this, Array.isArray(ids) ? ids : [ids], post_type);
}
export function handleRestoreAllPostsListData(post_type = 'post') {
    const rowsIdSelected = this.rowsIdSelectedRef;
    rowsIdSelected &&
        rowsIdSelected.length > 0 &&
            showConfirmDialog({
                title: 'Thông báo',
                message: `Bạn có thực sự muốn phục hồi những bài viết này không ?`,
                yes_label: 'Đồng ý',
                no_label: 'Hủy bỏ',
                yes_callback: async () => {
                   await perform.call(this, rowsIdSelected.map(e => e.guid), post_type);         
                },
                no_callback: () => { }
            });
}