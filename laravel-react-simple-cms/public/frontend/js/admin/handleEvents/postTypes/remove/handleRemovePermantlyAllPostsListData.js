import { POST_ACTIONS } from "constants/globalConstants";
import { showConfirmDialog } from "utils/modalUtils";
import { handleDisableTrashPermantlyAllButton } from "../handleChangeSelectedRows";
import { handleRemovePost } from "./handleRemovePost";
async function perform(guids) {
    await handleRemovePost.call(this, guids, this.state.post_type, POST_ACTIONS.remove_permantly);
    handleDisableTrashPermantlyAllButton();
}
export function handleRemovePermantlyAllPostsListData(e) {
    console.log('abc');
    const rowsIdSelected = this.rowsIdSelectedRef;
    rowsIdSelected &&
    rowsIdSelected.length > 0 &&
        showConfirmDialog({
            title: 'Thông báo',
            message: `Bạn có thực sự muốn xóa vĩnh viễn những bài viết này không ?`,
            yes_label: 'Đồng ý',
            no_label: 'Hủy bỏ',
            yes_callback: async () => {
                await perform.call(this, rowsIdSelected.map(e => e.guid));
            },
            no_callback: () => { }
        });
}