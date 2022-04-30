import { handleSearchTagNode } from "utils/tag/handleSearchTagNode";
export function handleTodoSearchTagNode(data) {
    const {tagsData, value, isGetAllNode, ref, type} = data
    const props = { searchedTagNode : null };
    tagsData.map(tag => handleSearchTagNode(tag, value, isGetAllNode, ref, type, props));
    return props.searchedTagNode;
}