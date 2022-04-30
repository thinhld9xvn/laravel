import * as _ from 'utils/libUtils';
import {showAlertDialog, closePopboxModal} from "utils/modalUtils";
import {todoSearchTagNode, setSelectedTagNode, getUniqueUrl, setCheckedTagNode} from "utils/tagPostTypesUtils";
import { getComponentInst } from "utils/componentUtils"
import { getUniqueId } from "utils/tagPostTypesUtils"
import { COMPONENT_INST } from 'constants/componentConstants';
import { FORM_IDS } from 'constants/formConstants';
import { cloneDeep } from 'lodash';
import { CATEGORY_NODE_TYPE_ENUM } from 'constants/categoryConstants';
export function handleCreateTagNodeItem() {   
    const tagTabInst = getComponentInst(COMPONENT_INST.TAGS_TAB),
          tagModalLayoutInst = getComponentInst(COMPONENT_INST.NEW_TAG_NODE),
          {originTagsData, tagsData : bkTagsData, s} = tagTabInst.state,
          tagsData = cloneDeep(originTagsData),
          stTagsData = cloneDeep(bkTagsData);
    _.setUnFocusForm( document.getElementById(FORM_IDS.NEW_TAG_NODE) );
    let formValidate = tagModalLayoutInst.state['tagNodeFormValidate'].formValidate;
    if ( ! formValidate ) {
        showAlertDialog({
            title : 'Thông báo',
            message : 'Mời nhập đầy đủ các trường thông tin theo yêu cầu !!!',
            icon : 'error',
            ok_label : 'Đồng ý',
            ok_callback : () => {}
        });
        return false;
    }    
    const tagNode = {};
    let nodeResultActive = null;
    let stNodeResultActive = null;
    const nodeData = cloneDeep(tagModalLayoutInst.state.formFields);    
    const tagNodeActive = cloneDeep(tagTabInst.state.tagNodeActive); // extras properties
    const nodesUrlDuplicated = todoSearchTagNode(tagsData, nodeData.url, false, false, CATEGORY_NODE_TYPE_ENUM.url);
    if ( nodesUrlDuplicated ) {
        nodeData.url = getUniqueUrl.call(this, nodesUrlDuplicated, nodeData.url);
    }
    if ( tagNodeActive ) {
        nodeResultActive = todoSearchTagNode(tagsData, tagNodeActive.id, true, true);
    }
    nodeData.id = getUniqueId.call(this, tagsData); 
    tagNode.name = nodeData.name;
    tagNode.value = nodeData.id;
    tagNode.extras = nodeData;
    tagsData.push(tagNode);
    setCheckedTagNode(tagsData, tagTabInst.tagsChosen);
    if ( s ) {
        stNodeResultActive = todoSearchTagNode(stTagsData, tagNodeActive.id, true, true);
        const stTagNode = cloneDeep(tagNode);
        stTagNode.selected = true;
        stTagsData.push(stTagNode);
        tagTabInst.setState({ tagsData : cloneDeep(stTagsData) });
    }
    if ( !s ) {
        setSelectedTagNode(tagsData, nodeData.id);        
    }       
    tagTabInst.setState({ 
        tagNodeSelectedValue : nodeData.id
    });
    tagModalLayoutInst.props.updateActiveTagsLists(cloneDeep(tagsData));
    tagModalLayoutInst.props.updateActiveTagNode(cloneDeep(tagNode.extras));
    closePopboxModal(tagModalLayoutInst.state.modal_id);
}