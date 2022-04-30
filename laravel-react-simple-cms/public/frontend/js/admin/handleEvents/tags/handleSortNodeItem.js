import {setSelectedTagNode} from "utils/tagPostTypesUtils";
import { getComponentInst } from "utils/componentUtils"
import { COMPONENT_INST } from 'constants/componentConstants';
import { cloneDeep } from 'lodash';
export function handleSortNodeItem(node, data) {
    const inst = getComponentInst(COMPONENT_INST.EDIT_TAG_NODE),
          tagInst = getComponentInst(COMPONENT_INST.TAGS_TAB),
          {s} = tagInst.state,
          myData = cloneDeep(data);
    setSelectedTagNode(myData, node.extras.id);
    this.setState({
        tagsData : cloneDeep(myData)
    });
    inst.props.updateActiveTagsLists(cloneDeep(myData));

}