import { cloneDeep } from 'lodash';
import * as _ from 'utils/libUtils';
import * as modalUtils from 'utils/modalUtils';
import {handleRemoveProfileOnServer} from './handleRemoveProfileOnServer'
async function performRemove(data) {
    const {uid, usersList, filteredItems, deactiveUsersList} = data;
    const id = usersList.findIndex(v => parseInt(v.guid) === parseInt(uid) ),
          _id = filteredItems.findIndex(v => parseInt(v.guid) === parseInt(uid) );
        if ( _id !== -1 ) {
            filteredItems.splice(_id, 1);
            this.setState({               
                filteredItems : cloneDeep(filteredItems)
            });
        }
        if ( id !== -1 ) {        
            const user = usersList.splice(id, 1);
            deactiveUsersList.splice(0, 0, user[0]);
            this.props.updateUsersList(cloneDeep(usersList));
            this.props.updateDeactiveUsersList(cloneDeep(deactiveUsersList));            
            this.setState({
                data : cloneDeep(usersList)
            });
            const results = await handleRemoveProfileOnServer.call(this, uid);
            if ( !results ) return;
            const respData = results.data.data;
            if ( respData ) {
                document.querySelector('.btnTrashAll')
                        .classList.add('disabled');
            }
            else {
                modalUtils.showAlertDialog({
                    title : 'Thông báo',
                    message : data.message || 'Phát hiện lỗi trong quá trình xóa user, xin mời thử lại sau !!!',
                    icon : 'error',
                    ok_label : 'Đồng ý',
                    ok_callback : () => {}
                });               
            }
        }
}
export async function handleRemoveUserCallback(uids) {
    const self = this;
    const usersList = cloneDeep(this.props.usersList),
          deactiveUsersList =  cloneDeep(this.props.deactiveUsersList),
          filteredItems = cloneDeep(this.state.filteredItems),
          length = uids.length;
    _.showLoadingOverlay();
    for ( let i = 0; i < length; i++ ) {
        const uid = uids[i];
        const results = await new Promise(async (resolve, reject) => {
            setTimeout(async function() {
                resolve(await performRemove.call(self, {uid, usersList, deactiveUsersList, filteredItems}));
            }, 200);
        });
    }
    setTimeout(() => {
        this.usersListIdSelectedRef = [];
    }, 200);    
    _.closeLoadingOverlay();
}