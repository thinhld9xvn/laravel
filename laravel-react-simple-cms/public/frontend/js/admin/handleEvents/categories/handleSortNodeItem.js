import {setSelectedCategoryNode} from "utils/categoryPostTypesUtils";
import { getComponentInst } from "utils/componentUtils"
import { COMPONENT_INST } from 'constants/componentConstants';
import { cloneDeep } from 'lodash';

export function handleSortNodeItem(node, data) {
    const inst = getComponentInst(COMPONENT_INST.EDIT_CATEGORY_NODE),
          catInst = getComponentInst(COMPONENT_INST.CATEGORIES_TAB),
          {s} = catInst.state,
          myData = cloneDeep(data);
    setSelectedCategoryNode(myData, node.extras.id);
    this.setState({
        categoriesData : cloneDeep(myData)
    });
    inst.props.updateActiveCategoriesLists(cloneDeep(myData));

}