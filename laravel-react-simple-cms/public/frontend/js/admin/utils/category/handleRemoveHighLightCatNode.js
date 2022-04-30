import { handleRemoveHightLightNodeName } from "./handleRemoveHightLightNodeName";
export function handleRemoveHighLightCatNode(cat, cid) {
    cat.name = handleRemoveHightLightNodeName(cat.name);
    if ( cat.childrens && cat.childrens.length ) {
        cat.childrens.map(c => handleRemoveHighLightCatNode(c, cid));
    }
}