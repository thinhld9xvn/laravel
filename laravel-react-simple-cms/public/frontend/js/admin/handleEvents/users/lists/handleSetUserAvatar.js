import {handleCloseChooseAvatarDialog} from './handleCloseChooseAvatarDialog'
export function handleSetUserAvatar() {
    const { userSelectedAvatar, userAvatarsList, originalUserProfile } = this.props,
          avatar = userAvatarsList.find((v, i) => i == userSelectedAvatar );
    originalUserProfile.avatar = avatar;
    originalUserProfile.avatarImgSrc = originalUserProfile.avatarDirPath + avatar;
    this.props.updateOriginalUserProfile(originalUserProfile);
    this.props.updateUserAvatarTimeStamp(Date.now());
    handleCloseChooseAvatarDialog.call(this);
}