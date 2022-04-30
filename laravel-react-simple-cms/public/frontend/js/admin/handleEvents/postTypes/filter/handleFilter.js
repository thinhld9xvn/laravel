import { handleDeselectAllRows } from 'utils/datatableUtils';
import * as _ from 'utils/libUtils';
import { fetchPostsList } from 'utils/postTypes/handlePostsListTabMountHook';
import { handleSetFilterChanged } from './handleSetFilterChanged';
import {cloneDeep} from 'lodash';
export async function handleFilter() {
    setTimeout(async () => {
        const { post_type, paged, numPerPage, order, orderBy, id } = this.state,
            authorId = parseInt(this.authorFilterSelected),
            categoryId = parseInt(this.categoryFilterSelected),
            postModifiedFilter = this.postModifiedFilterSelected.toString(),
            s = this.s;
        const filtered_params = {
                authorId,
                categoryId,
                postModifiedFilter,
                s
            };
        handleDeselectAllRows();
        //
        await fetchPostsList.call(this, {post_type, paged, numPerPage, post_status: id, order, orderBy, filtered_params, callback : (data) => {
            handleSetFilterChanged.call(this, true);
            this._filteredItems = cloneDeep(data);
        }});
    }, 200);
}