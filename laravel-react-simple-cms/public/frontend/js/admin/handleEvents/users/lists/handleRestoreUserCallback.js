import { cloneDeep } from "lodash";
import * as _ from 'utils/libUtils';
import {showAlertDialog} from 'utils/modalUtils'
import {handleRestoreProfileOnServer} from './handleRestoreProfileOnServer'
async function performRestore(data) {
    const {deactiveUsersList, uid, filteredItems, usersList} = data;
    const id = deactiveUsersList.findIndex(v => parseInt(v.guid) === parseInt(uid) ),
            _id = filteredItems.findIndex(v => parseInt(v.guid) === parseInt(uid) );
        if ( _id !== -1 ) {
            filteredItems.splice(_id, 1);
            this.setState({
                filteredItems : cloneDeep(filteredItems)
            });
        } 
        if ( id !== -1 ) {
            const user = deactiveUsersList.splice(id, 1);                
            usersList.splice( 0, 0, user[0] );  
            this.props.updateUsersList(cloneDeep(usersList));
            this.props.updateDeactiveUsersList(cloneDeep(deactiveUsersList));   
            this.setState({
                data : cloneDeep(deactiveUsersList),
                filteredItems : cloneDeep(filteredItems)
            });
            const response = await handleRestoreProfileOnServer.call(this, uid);
            const respData = response.data.data;
            if ( respData ) {
                document.querySelector('.btnRestoreAll')
                        .classList.add('disabled');
            }
            else {
                showAlertDialog({
                    title : 'Thông báo',
                    message : data.message || 'Phát hiện lỗi trong quá trình khôi phục user, xin mời thử lại sau !!!',
                    icon : 'error',
                    ok_label : 'Đồng ý',
                    ok_callback : () => {}
                }); 
            }
        }

}
export async function handleRestoreUserCallback(uids) {
    let usersList = cloneDeep(this.props.usersList),
        deactiveUsersList =  cloneDeep(this.props.deactiveUsersList),
        filteredItems = cloneDeep(this.state.filteredItems);
    _.showLoadingOverlay();
    for ( let i = 0; i < uids.length; i++ ) {
        const uid = uids[i];    
        const results = await new Promise(async (resolve, reject) => {
            setTimeout(async () => {
                resolve(await performRestore.call(this, {usersList, deactiveUsersList, filteredItems, uid}));
            }, 200);
        });  
    }
    setTimeout(() => {
        this.usersListIdSelectedRef = [];
    }, 200);
    _.closeLoadingOverlay();
}