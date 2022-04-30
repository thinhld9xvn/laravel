import { POST_ACTIONS } from "constants/globalConstants";
import { showConfirmDialog } from "utils/modalUtils";
import { handleDisableTrashPermantlyAllButton } from "../handleChangeSelectedRows";
import { handleRemovePost } from "./handleRemovePost";
export async function handleRemovePermantlyPost(guids, post_type = 'post') {
    showConfirmDialog({
        title: 'Thông báo',
        message: 'Bạn đang thực hiện xóa vĩnh viễn bài viết này, bạn có thực sự muốn thực hiện việc này không ?',
        yes_label: 'Đồng ý',
        no_label: 'Hủy bỏ',
        yes_callback: async () => {
            await handleRemovePost.call(this, guids, post_type, POST_ACTIONS.remove_permantly);
            handleDisableTrashPermantlyAllButton(); 
        },
        no_callback: () => { }
    });
    
}