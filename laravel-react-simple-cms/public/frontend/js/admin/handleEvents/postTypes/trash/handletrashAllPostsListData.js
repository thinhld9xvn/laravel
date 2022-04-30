import { handleDisableTrashAllButton } from "../handleChangeSelectedRows";
import { handleTrashPost } from "./handleTrashPost";
async function perform(ids, post_type) {
    await handleTrashPost.call(this, ids, post_type);
    handleDisableTrashAllButton(); 
}
export async function handleTrashAllPostsListData(post_type = 'post') {
    const rowsIdSelected = this.rowsIdSelectedRef;
    rowsIdSelected &&
    rowsIdSelected.length > 0 &&
        (await perform.call(this, rowsIdSelected.map(e => e.guid), post_type));
}