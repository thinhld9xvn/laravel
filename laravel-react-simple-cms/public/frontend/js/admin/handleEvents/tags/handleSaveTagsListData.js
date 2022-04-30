import axios from "axios";
import { ADMIN_AJAX_URLS } from "constants/UrlConstants";
import { closeLoadingOverlay, showLoadingOverlay } from "utils/libUtils";
import { getClientUserToken } from "utils/membershipUtils";
import { cloneDeep } from 'lodash';
import { isUndefined } from "utils/libUtils";
import { getApi } from "utils/apiUtils";
export async function handleSaveTagsListData(post_type = 'post') {
    const {UPDATE_TAGS_STRUCTURES} = ADMIN_AJAX_URLS;
    const {rmIds} = this.state;
    const {activeTagsLists : tagsData} = this.props;
    if ( isUndefined(tagsData) || 
            isUndefined(rmIds) || 
                ( !tagsData.length && !rmIds.length ) ) return;
    showLoadingOverlay();
    const fd = new FormData();
    fd.append('post_type', post_type);
    fd.append('data', JSON.stringify(tagsData));
    fd.append('rm_ids', JSON.stringify(rmIds));
    const results = await getApi("POST", UPDATE_TAGS_STRUCTURES, fd);
    this.setState({ 
        originTagsData : cloneDeep(tagsData),
        protectedTagsData : cloneDeep(tagsData),
        rmIds : []
    });
    setTimeout(() => {        
        closeLoadingOverlay();
    }, 200);
    
}