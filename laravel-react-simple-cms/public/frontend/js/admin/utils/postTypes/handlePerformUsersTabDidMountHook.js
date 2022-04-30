import { getAllUsersList, updateUsersListRoleMetaDispatch } from "utils/membershipUtils";
import {cloneDeep} from 'lodash';
import { getComponentInst } from "utils/componentUtils";
import { COMPONENT_INST } from "constants/componentConstants";
export async function handlePerformUsersTabDidMountHook() {
    setTimeout(() => {
        const activeUsersListInst = getComponentInst(COMPONENT_INST.USERS_TAB);
        const deactiveUsersListInst = getComponentInst(COMPONENT_INST.DEACTIVE_USERS_TAB);
        activeUsersListInst.setState({
            loadingData : true
        }, () => {
            deactiveUsersListInst.setState({
                loadingData : true
            }, async () => {
                const {data} = await getAllUsersList.call(this);
                if ( data.success ) {
                    const {public : usersActiveList, trash : usersTrashList} = data.data;
                    updateUsersListRoleMetaDispatch.call(activeUsersListInst, activeUsersListInst.props.userRolesList, usersActiveList);
                    activeUsersListInst.setState({
                        loadingData : false,
                        data : cloneDeep(usersActiveList),
                        filteredItems : cloneDeep(usersActiveList),
                        keywords : ''
                    }, () => {
                        updateUsersListRoleMetaDispatch.call(deactiveUsersListInst, deactiveUsersListInst.props.userRolesList, usersTrashList, 'deactive');
                        deactiveUsersListInst.setState({
                            loadingData : false,
                            data : cloneDeep(usersTrashList),
                            filteredItems : cloneDeep(usersTrashList),
                            keywords : ''
                        });
                    });
                }
            });
        });        
    }, 500);
}