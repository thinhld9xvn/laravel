import { handleHightLightNodeName } from "./handleHightLightNodeName";
export function handleHighLightTagNode(tag, key) {
    tag.name = handleHightLightNodeName(tag.name, key);
}