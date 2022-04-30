import { COMPONENT_INST } from "constants/componentConstants";
import { getComponentInst } from "utils/componentUtils";
import { cloneDeep } from 'lodash';
import { handleResetFormValidateState } from "handleEvents/users/handleResetFormValidateState";
export function setActivePostTypeWhenEditHook(pid) {
    const formInst = getComponentInst(COMPONENT_INST.EDIT_POST_TYPE_MODAL_LAYOUT),
          tabPtInst = getComponentInst(COMPONENT_INST.POST_TYPES_TAB),
          {postTypesList, updatePostTypeEditing} = tabPtInst.props,
          formFields = cloneDeep(formInst.state.formFields),
          postType = postTypesList.find(item => item.id === pid);
    if ( formInst ) {
        handleResetFormValidateState.call(formInst, 'postTypeFormValidate');
        formInst.setState(state => ({
            tabActiveId : state._tabActiveId,
            formFields: {...formFields, id : postType.id,
                                        namePostType: postType.name, 
                                        slugPostType: postType.slug, 
                                        descriptionPostType: postType.description,
                                        labelPostType : postType.label,
                                        allPostsLabel : postType.all_posts_label,
                                        newPostLabel : postType.new_post_label,
                                        postNameLabel : postType.post_name_label,
                                        publishPostLabel : postType.publish_post_label,
                                        taxLists : cloneDeep(postType.taxonomies)}
        }));
    }
    updatePostTypeEditing(cloneDeep(postType));
}