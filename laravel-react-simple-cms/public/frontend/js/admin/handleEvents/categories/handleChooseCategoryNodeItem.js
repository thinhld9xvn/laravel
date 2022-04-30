import {todoSearchCategoryNode} from "utils/categoryPostTypesUtils";
import { cloneDeep } from 'lodash';
export function handleChooseCategoryNodeItem(v) {
    const { categoriesData } = this.state;
    const resultNode = todoSearchCategoryNode(categoriesData, v);
    this.props.updateActiveCategoryNode(resultNode ? cloneDeep(resultNode) : null);
    this.setState({ categoryNodeSelectedValue : v });
}