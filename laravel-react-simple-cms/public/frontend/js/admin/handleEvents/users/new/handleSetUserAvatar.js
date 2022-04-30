import {handleCloseChooseAvatarDialog} from '../handleCloseChooseAvatarDialog';
export function handleSetUserAvatar(e) {
    const userSelectedAvatar = this.props.userSelectedAvatar;    
    this.props.updateNewUserSelectedAvatar( userSelectedAvatar );
    this.props.updateUserAvatarTimeStamp( Date.now() );
    handleCloseChooseAvatarDialog();
}