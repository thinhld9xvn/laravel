export function handleProfileTextChanged(e) {
    let userProfile = this.props.originalUserProfile,
        v = e.currentTarget.value,
        field = e.currentTarget.dataset.field;
    userProfile[field] = v;
    this.props.updateOriginalUserProfile( userProfile );  
}