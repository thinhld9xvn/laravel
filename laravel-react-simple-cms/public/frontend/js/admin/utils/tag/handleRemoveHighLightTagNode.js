import { handleRemoveHightLightNodeName } from "./handleRemoveHightLightNodeName";
export function handleRemoveHighLightTagNode(tag) {
    tag.name = handleRemoveHightLightNodeName(tag.name);
}