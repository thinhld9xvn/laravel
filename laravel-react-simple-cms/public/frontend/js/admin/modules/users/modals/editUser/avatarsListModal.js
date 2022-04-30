import React, { Component } from 'react';
import { connect } from 'react-redux';
import AvatarsListLayout from '../../components/layout/avatarsListLayout';
import {onClick_closeChooseAvatarDialog,        
        onClick_setUserAvatar} from 'handleEvents/usersListHandleEvents';
import {onClick_uploadOtherAvatar, onClick_chooseAvatarInModal} from 'handleEvents/userProfileHandleEvents';        
import { MODAL_IDS } from 'constants/modalConstants';
class AvatarsListModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal_id : MODAL_IDS.CHOOSE_AVATAR
        }
    }
    componentDidMount() {}
    render() {      
        const events = {
            handleUploadOtherAvatar : onClick_uploadOtherAvatar,
            handleChooseAvatar : onClick_chooseAvatarInModal
        };
        return (
            <div data-popbox-id={this.state.modal_id} 
                className="modalChooseAvatar popbox modal"
                style={{ zoom : this.props.zoom }}>
                <div className="popbox_container">
                    <div className="heading">{this.props.heading}</div>
                    <div className={"text ".concat(this.props.userAvatarIsAjaxLoading ? "disabled" : "")}>
                        <AvatarsListLayout events = {events} />
                    </div>
                    <div className={"footer ".concat(this.props.userAvatarIsAjaxLoading ? "disabled" : "")}>
                        <button className="btn btn-primary btn-sm"
                                onClick={onClick_setUserAvatar.bind(this)}>
                                {this.props.chooseText}
                        </button>
                        <button className="btn btn-default btn-sm"
                                onClick={onClick_closeChooseAvatarDialog.bind(this)}>
                                {this.props.closeText}
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        userSelectedAvatar : state.userAvatarReducer.selected_avatar,
        userAvatarsList : state.userAvatarReducer.avatars_list,
        originalUserProfile : state.userProfileReducer.originalUserProfile,  
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
        updateUserAvatarTimeStamp : (timeStamp) => {
            dispatch({
                reducer : 'userAvatarReducer',
                type : "UPDATE_USER_AVATAR_TIMESTAMP",
                timeStamp : timeStamp
            });        
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AvatarsListModal);