import { COMPONENT_INST } from "constants/componentConstants";
import { MODAL_IDS } from "constants/modalConstants";
import { getComponentInst } from "utils/componentUtils";
import { closePopboxModal } from "utils/modalUtils";
import { cloneDeep, isEqual } from 'lodash';
import { setConvertCategoriesListPostData, setSelectedCategoryNode } from "utils/categoryPostTypesUtils";
import { handleRefreshEmbbedModal } from "utils/categoryPostTypes/handleDidMountHook";
import { getPostLayoutInst } from "utils/postTypesUtils";
export function handleCloseCtModal() {    
    closePopboxModal(MODAL_IDS.CATEGORY_EMBBED);
    setTimeout(() => {
        const inst = getComponentInst(COMPONENT_INST.CATEGORIES_TAB);
        const postInst = getPostLayoutInst();
        const formFields = cloneDeep(postInst.state.formFields);        
        const postCids = cloneDeep(postInst.chooseCategoriesList);
        const data = cloneDeep(inst.state.protectedCategoriesData);
        handleRefreshEmbbedModal(() => {
            const rmIds = cloneDeep(inst._rmIds);
            const postCidsResults = postCids.filter(id => rmIds.indexOf(id) === -1);
            setConvertCategoriesListPostData(data);
            setSelectedCategoryNode(data, postCidsResults);
            if ( !isEqual(postInst.chooseCategoriesList, postCidsResults) ) {
                postInst.chooseCategoriesList = cloneDeep(postCidsResults);
            }
            postInst.setState({
                categoriesList : cloneDeep(data),
                formFields : {...formFields, post_categories: cloneDeep(postCidsResults)}
            }, () => {
                inst._rmIds = []; // reset container
            });  
        });        
    }, 200);
}