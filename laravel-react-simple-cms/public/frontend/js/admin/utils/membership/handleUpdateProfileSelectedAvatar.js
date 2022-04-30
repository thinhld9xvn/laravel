export function handleUpdateProfileSelectedAvatar(data) {
    const {userSelectedAvatar, userAvatarsList, userProfile, updateUserSelectedAvatar} = data;
    const id = userAvatarsList.findIndex(v => v == userProfile.avatar ); 
    if ( id !== -1 && id !== userSelectedAvatar ) { 
        updateUserSelectedAvatar(id); 
    }
}