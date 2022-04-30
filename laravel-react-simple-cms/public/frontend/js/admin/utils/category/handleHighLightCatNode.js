import { handleHightLightNodeName } from "./handleHightLightNodeName";
export function handleHighLightCatNode(cat, key) {
    cat.name = handleHightLightNodeName(cat.name, key);
    if ( cat.childrens && cat.childrens.length ) {
        cat.childrens.map(c => handleHighLightCatNode(c, key));
    }
}