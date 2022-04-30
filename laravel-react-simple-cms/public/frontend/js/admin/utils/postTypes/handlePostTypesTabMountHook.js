import { getAllActivePostTypesList } from "utils/postTypesUtils";
import { cloneDeep } from 'lodash';
import { getComponentInst } from "utils/componentUtils";
import { COMPONENT_INST } from "constants/componentConstants";
async function performCallback(props) {
    const {inst, deInst, updatePostTypesList, updateDeactivePostTypesList, callback} = props;
    const results = await getAllActivePostTypesList.call(inst);
    if ( !results ) return;
    const postTypesList = results.data.data;
    const activePostTypesList = postTypesList.filter(pt => pt.status === 'public');
    const deActivePostTypesList = postTypesList.filter(pt => pt.status === 'trash');
    updatePostTypesList( cloneDeep(activePostTypesList) );
    updateDeactivePostTypesList( cloneDeep(deActivePostTypesList) );
    inst.setState({
        loadingData : false,
        data : cloneDeep(activePostTypesList),
        filteredItems : cloneDeep(activePostTypesList)
    }, () => {
        deInst.setState({
            loadingData : false,
            data : cloneDeep(deActivePostTypesList),
            filteredItems : cloneDeep(deActivePostTypesList)
        }, () => {
            if ( callback ) {
                callback();
            }
        });        
    });
}
export async function handlePostTypesTabMountHook(callback) {
    setTimeout(async () => {
        const inst = getComponentInst(COMPONENT_INST.POST_TYPES_TAB);
        const deInst = getComponentInst(COMPONENT_INST.DEACTIVE_POST_TYPES_TAB);
        const {updatePostTypesList} = inst.props;
        const {updateDeactivePostTypesList} = deInst.props;
        inst.setState({
            s : '',
            loadingData : true
        }, () => {
            deInst.setState({
                s : '',
                loadingData : true
            }, async () => {
                await performCallback({inst, deInst, updatePostTypesList, updateDeactivePostTypesList, callback});
            })
        });        
    }, 200);
}