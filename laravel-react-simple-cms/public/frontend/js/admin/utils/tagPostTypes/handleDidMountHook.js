import { EMPTY_PARENT_CATEGORY } from 'constants/categoryConstants';
import { COMPONENT_INST } from 'constants/componentConstants';
import { handleGetTagsListData } from 'handleEvents/tags/handleGetTagsListData';
import { cloneDeep } from 'lodash';
import { getComponentInst } from 'utils/componentUtils';
import { setCheckedTagNode, setDeSelectTagNode } from 'utils/tagPostTypesUtils';
export async function handleDidMountHook() {
    const {updateActiveTagsLists, updateActiveTagNode} = this.props;
    this.setState({
        rmIds : [],
        tagNodeSelectedValue : EMPTY_PARENT_CATEGORY.value,
        tagNodeActive : null,
        zoom: 1,
        isFullScreen: false,
        tagsData : [],
        originTagsData : [],
        protectedTagsData : [],
        loadingData : true
    });
    updateActiveTagNode(null);
    updateActiveTagsLists([]);
    this.tagsListInst = null;
    this.tagsListSelected = EMPTY_PARENT_CATEGORY.value;
    this.tagsChosen = [];
    const results = await handleGetTagsListData();
    if ( !results ) {
        return;
    }
    const {data : res} = results;
    const {data} = res;
    this.setState({
        tagsData : cloneDeep(data),
        originTagsData : cloneDeep(data),
        protectedTagsData : cloneDeep(data),
        s : ''
    });    
    updateActiveTagsLists(cloneDeep(data));    
    setTimeout(() => {
        this.setState({
            loadingData : false
        });
    }, 200);
}
export function handleRefreshEmbbedModal() {
    const inst = getComponentInst(COMPONENT_INST.TAGS_TAB);
    const {updateActiveTagsLists, updateActiveTagNode} = inst.props;
    updateActiveTagNode(null);
    updateActiveTagsLists([]);
    inst.setState({
        rmIds : [],
        tagNodeSelectedValue : EMPTY_PARENT_CATEGORY.value,
        tagNodeActive : null,
        tagsData : [],
        originTagsData : [],
        zoom: 1,
        isFullScreen: false,
        s : '',
        loadingData : true
    });
    const data = cloneDeep(inst.state.protectedTagsData);
    inst.tagsListSelected = EMPTY_PARENT_CATEGORY.value;
    setDeSelectTagNode(data);
    setCheckedTagNode(data, inst.tagsChosen);
    updateActiveTagsLists(cloneDeep(data)); 
    inst.setState({
        tagsData : cloneDeep(data),
        originTagsData : cloneDeep(data), 
        loadingData : false
    });    
}