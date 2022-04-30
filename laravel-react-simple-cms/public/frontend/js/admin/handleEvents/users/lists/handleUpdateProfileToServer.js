import {handleUpdateProfileToServer as handleUpdateUserProfileToServer} from '../handleUpdateProfileToServer'
export async function handleUpdateProfileToServer() {
    return await handleUpdateUserProfileToServer.call(this);
}