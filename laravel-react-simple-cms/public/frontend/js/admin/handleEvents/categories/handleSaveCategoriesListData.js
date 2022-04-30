import { ADMIN_AJAX_URLS } from "constants/UrlConstants";
import { closeLoadingOverlay, showLoadingOverlay } from "utils/libUtils";
import { cloneDeep } from 'lodash';
import { isUndefined } from "utils/libUtils";
import { getApi } from "utils/apiUtils";
export async function handleSaveCategoriesListData(post_type = 'post', tax = 'categories') {
    const {rmIds} = this.state;
    const {UPDATE_CATEGORIES_STRUCTURES} = ADMIN_AJAX_URLS;
    const {activeCategoriesLists : categoriesData} = this.props;
    if ( isUndefined(categoriesData) || 
            isUndefined(rmIds) || 
                ( !categoriesData.length && !rmIds.length ) ) return;
    showLoadingOverlay();
    const fd = new FormData();
    fd.append('post_type', post_type);
    fd.append('tax', tax);
    fd.append('data', JSON.stringify(categoriesData));
    fd.append('rm_ids', JSON.stringify(rmIds));
    const results = await getApi("POST", UPDATE_CATEGORIES_STRUCTURES, fd);
    this._rmIds = cloneDeep(rmIds);
    this.setState({
        originCategoriesData : cloneDeep(categoriesData),
        protectedCategoriesData : cloneDeep(categoriesData),
        rmIds : []
    });
    setTimeout(() => {        
        closeLoadingOverlay();
    }, 200);
    
}