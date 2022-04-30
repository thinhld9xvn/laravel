import * as _ from 'utils/libUtils';
import {showAlertDialog, closePopboxModal} from "utils/modalUtils";
import {todoSearchCategoryNode, setSelectedCategoryNode, getUniqueUrl} from "utils/categoryPostTypesUtils";
import { getComponentInst } from "utils/componentUtils"
import { getUniqueId } from "utils/categoryPostTypesUtils"
import { COMPONENT_INST } from 'constants/componentConstants';
import { FORM_IDS } from 'constants/formConstants';
import { cloneDeep } from 'lodash';
import { CATEGORY_NODE_TYPE_ENUM } from 'constants/categoryConstants';
export function handleCreateCategoryNodeItem() {   
    const catTabInst = getComponentInst(COMPONENT_INST.CATEGORIES_TAB),
          catModalLayoutInst = getComponentInst(COMPONENT_INST.NEW_CATEGORY_NODE),
          {originCategoriesData, categoriesData : bkCategoriesData, s} = catTabInst.state,
          categoriesData = cloneDeep(originCategoriesData),
          stCategoriesData = cloneDeep(bkCategoriesData);
    _.setUnFocusForm( document.getElementById(FORM_IDS.NEW_CATEGORY_NODE) );
    let formValidate = catModalLayoutInst.state['categoryNodeFormValidate'].formValidate;
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
    const categoryNode = {};
    let nodeResultActive = null;
    let stNodeResultActive = null;
    const nodeData = cloneDeep(catModalLayoutInst.state.formFields);    
    const categoryNodeActive = cloneDeep(catTabInst.state.categoryNodeActive); // extras properties
    const nodesUrlDuplicated = todoSearchCategoryNode(categoriesData, nodeData.url, false, false, CATEGORY_NODE_TYPE_ENUM.url);
    if ( nodesUrlDuplicated ) {
        nodeData.url = getUniqueUrl.call(this, nodesUrlDuplicated, nodeData.url);
    }
    if ( categoryNodeActive ) {
        nodeResultActive = todoSearchCategoryNode(categoriesData, categoryNodeActive.id, true, true);
    }
    nodeData.id = getUniqueId.call(this, categoriesData); 
    categoryNode.name = nodeData.name;
    categoryNode.value = nodeData.id;
    categoryNode.extras = nodeData;
    if ( nodeResultActive ) {
        if ( typeof(nodeResultActive.childrens) === 'undefined' ) {
            nodeResultActive.childrens = [];
        }
        nodeResultActive.childrens.push(categoryNode);
    }
    else {
        categoriesData.push(categoryNode);
    }
    if ( s ) {
        stNodeResultActive = todoSearchCategoryNode(stCategoriesData, categoryNodeActive.id, true, true);
        const stCategoryNode = cloneDeep(categoryNode);
        stCategoryNode.selected = true;
        if ( stNodeResultActive ) {
            if ( typeof(stNodeResultActive.childrens) === 'undefined' ) {
                stNodeResultActive.childrens = [];
            }
            stNodeResultActive.childrens.push(stCategoryNode);
        }
        else {
            stCategoriesData.push(stCategoryNode);
        }
        catTabInst.setState({ categoriesData : cloneDeep(stCategoriesData) });
    }
    if ( !s ) {
        setSelectedCategoryNode(categoriesData, nodeData.id);        
    }   
    catTabInst.setState({ 
        categoryNodeSelectedValue : nodeData.id
    });
    catModalLayoutInst.props.updateActiveCategoriesLists(cloneDeep(categoriesData));
    catModalLayoutInst.props.updateActiveCategoryNode(cloneDeep(categoryNode.extras));
    closePopboxModal(catModalLayoutInst.state.modal_id);
}