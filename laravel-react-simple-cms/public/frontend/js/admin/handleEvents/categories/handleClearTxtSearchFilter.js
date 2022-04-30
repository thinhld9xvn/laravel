import { cloneDeep } from 'lodash';
import { setDeSelectCategoryNode } from 'utils/categoryPostTypesUtils';
//import { getListIdsPopboxModal } from 'utils/modalUtils';
export function handleClearTxtSearchFilter() {
    const {updateActiveCategoryNode} = this.props;
    const {originCategoriesData, s} = this.state;
    //const ids = getListIdsPopboxModal();
    //if ( !s || ids.length ) return;
    if ( !s ) return;
    updateActiveCategoryNode(null);
    setDeSelectCategoryNode(originCategoriesData);
    this.setState({ s : '', 
                    categoriesData :  cloneDeep(originCategoriesData) });
}