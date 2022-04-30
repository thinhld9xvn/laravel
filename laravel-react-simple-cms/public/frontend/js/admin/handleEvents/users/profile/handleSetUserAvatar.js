import {handleCloseChooseAvatarDialog} from '../handleCloseChooseAvatarDialog'
export function handleSetUserAvatar() {
    const { userSelectedAvatar, userAvatarsList } = this.props,
          userProfile = {...this.props.userProfile},
          avatar = userAvatarsList.find((v, i) => i == userSelectedAvatar );
    userProfile.avatar = avatar;
    this.props.updateOriginalUserProfile(userProfile);
    this.props.updateUserAvatarTimeStamp(Date.now());
    handleCloseChooseAvatarDialog();
}