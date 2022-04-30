import { ADMIN_AJAX_URLS } from 'constants/UrlConstants';
import { getApi } from 'utils/apiUtils';
export async function handleUploadAvatar(params) {
    const {blobImage, username, callback} = params;
    const { userAvatarsList, updateUserAvatarsList, updateUserSelectedAvatar, 
            updateUserAvatarTimeStamp, updateUserAvatarLoading } = this.props;
    const fd = new FormData();
    const {UPLOAD_AVATAR_URL} = ADMIN_AJAX_URLS;
    fd.append("avatar", blobImage);
    fd.append("username", username);
    const {data} = await getApi('POST', UPLOAD_AVATAR_URL, fd);
    if ( data.success ) {
        const avatarUrl = data.data;
        let index = userAvatarsList.findIndex(v => v.indexOf(`${username}/`) !== -1 );
        if ( index === -1 ) {
            userAvatarsList.push(avatarUrl);
            updateUserAvatarsList([...userAvatarsList]);
            index = userAvatarsList.length - 1;
        }
        updateUserSelectedAvatar(index);
        updateUserAvatarTimeStamp(Date.now());
        updateUserAvatarLoading(false);
        callback();
    }
}