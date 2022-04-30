import { EMPTY_PARENT_CATEGORY } from "constants/categoryConstants";
import { closeLoadingOverlay, getCopiedJsonObject, showLoadingOverlay } from "utils/libUtils";
import { setDeSelectTagNode } from "utils/tagPostTypesUtils"
import { handleHightLightNodeName } from "utils/tag/handleHightLightNodeName";
import { cloneDeep } from 'lodash';
export function handleSearchNodeItems(v) {
    const {updateActiveTagNode} = this.props;
    const results = [];
    const getName = (name) => {
        return name.toLowerCase().toString();
    }
    const travselNode = (item) => {
        const node = cloneDeep(item);
        if ( getName(node.name).includes(getName(v)) ) {
            node.name = handleHightLightNodeName(node.name, v);
            results.push(node);
        }        
    }
    showLoadingOverlay();
    this.setState({      
        tagNodeSelectedValue : EMPTY_PARENT_CATEGORY.value,
        tagNodeActive : null
    });
    updateActiveTagNode(null);
    let filteredData = getCopiedJsonObject(this.state.originTagsData);
    setDeSelectTagNode(filteredData);
    if ( !v ) {
        this.setState({
            tagsData: getCopiedJsonObject(filteredData)
        });
        setTimeout(() => {
            closeLoadingOverlay();
        }, 200);
        return;
    }
    filteredData.map(travselNode);
    this.setState({
        tagsData: getCopiedJsonObject(results)
    });
    setTimeout(() => {
        closeLoadingOverlay();
    }, 200);
}