export function handleChooseAvatarInModal(e) {
    const id = parseInt( e.currentTarget.dataset.avatarId );
    this.props.updateUserSelectedAvatar( id );
}