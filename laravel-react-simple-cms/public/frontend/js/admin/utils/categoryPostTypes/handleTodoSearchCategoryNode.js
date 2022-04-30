import { handleSearchCategoryNode } from "utils/category/handleSearchCategoryNode";
export function handleTodoSearchCategoryNode(data) {
    const {categoriesData, value, isGetAllNode, ref, type} = data
    const props = { searchedCatNode : null };
    categoriesData.map(cat => handleSearchCategoryNode(cat, value, isGetAllNode, ref, type, props));
    return props.searchedCatNode;
}