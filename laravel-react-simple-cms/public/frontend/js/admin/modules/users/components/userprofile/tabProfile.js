import React, { Component } from 'react';
import { connect } from 'react-redux';
import {onClick_ProfileEditMode,          
        onClick_ProfileEditSave,
        onChange_handleProfileNumber,
        onChange_handleProfileText,       
        onClick_showChooseAvatarDialog} from 'handleEvents/userProfileHandleEvents';
import ProfileLayout from '../layout/profileLayout';
import { FORM_IDS } from 'constants/formConstants';
class TabProfile extends Component {
    constructor(props) {
        super(props);        
    }     
    componentDidMount() {        
        const { userProfile } = this.props;
        this.props.updateOriginalUserProfile( userProfile );
    }  
    render() {
        const events = {
            showChooseAvatarModal : onClick_showChooseAvatarDialog,            
            handleTextChanged : onChange_handleProfileText,
            handleNumberChanged : onChange_handleProfileNumber,
            editProfile : onClick_ProfileEditMode,
            saveProfile : onClick_ProfileEditSave
        };
        return (            
            <ProfileLayout formid = {FORM_IDS.USER_PROFILE}                           
                           events = {events} />          
        );        
    }
}
const mapStateToProps = state => {
    return {      
        userProfile : state.userProfileReducer.userProfile,
        userSelectedAvatar : state.userAvatarReducer.selected_avatar,
        userAvatarsList : state.userAvatarReducer.avatars_list,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        updateOriginalUserProfile : (userprofile) => {
            dispatch({
                reducer : 'userProfileReducer',
                type : "UPDATE_USER__PROFILE",            
                payload : userprofile
            });        
        },
        updateUserSelectedAvatar : (id) => {
            dispatch({
                reducer : 'userAvatarReducer',
                type : "UPDATE_USER_SELECTED_AVATAR",            
                id : id
            });        
        },        
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(TabProfile);