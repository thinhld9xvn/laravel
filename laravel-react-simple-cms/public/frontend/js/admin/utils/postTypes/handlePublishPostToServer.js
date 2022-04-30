import { POST_ACTIONS } from "constants/globalConstants";
import { ADMIN_AJAX_URLS } from "constants/UrlConstants";
import { getApi } from "utils/apiUtils";
export async function handlePublishPostToServer(data, post_type = 'post', post_action = POST_ACTIONS.new) {
    const {PUBLISH_POST} = ADMIN_AJAX_URLS
    const {guid, post_title, post_url, post_content, post_excerpt, post_thumbnail, post_categories, post_tags, post_date, post_author} = data;
    const fd = new FormData();
    const {pathname : thumbnail} = post_thumbnail;
    fd.append('post_type', post_type);
    fd.append('post_title', post_title);
    fd.append('post_url', post_url);
    fd.append('post_content', post_content);
    fd.append('post_excerpt', post_excerpt);       
    fd.append('post_date', post_date);
    fd.append('post_author', post_author);
    fd.append('post_action', post_action);
    if ( thumbnail ) {
        fd.append('post_thumbnail', thumbnail);
    }
    if ( post_categories && post_categories.length ) {
        fd.append('post_categories', JSON.stringify(post_categories));
    }
    if ( post_tags && post_tags.length ) {
        fd.append('post_tags', JSON.stringify(post_tags));
    }
    if ( post_action === POST_ACTIONS.edit ) {
        fd.append('guid', guid);
    }
    return await getApi('POST', PUBLISH_POST, fd);
}