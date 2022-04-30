import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAttachmentPathFromUrl } from 'utils/filemanager/fileUtils';
import {getUserAvatarsList} from 'utils/membershipUtils';
import { isUserProfilePage, isNewUserPage, isAllUsersPage } from 'utils/urlUtils';
import AjaxLoading from '../userprofile/ajaxLoading';
class AvatarsListLayout extends Component {
    constructor(props) {
        super(props); 
    }
    async componentDidMount() {
        const {data} = await getUserAvatarsList.call(this);     
        if ( data.success ) {    
            this.props.updateUserAvatarsList(data.data);  
        }
    }    
    render() {  
        const { userAvatarsList, userAvatarTimeStamp, userProfile, events, userSelectedAvatar } = this.props,
              avatars = [],
              self = this;     
        userAvatarsList.forEach((v,i)=> {
            let avatarSrc = '';
            const baseAvatar = v.startsWith('http') ? getAttachmentPathFromUrl(v) : v,
                  name = v.startsWith('http') ? baseAvatar.split('.')[0] : null,
                  getAvatarSrc = () => {
                    return v.concat(`?t=${userAvatarTimeStamp}`);
                  };
            if ( !isNaN( parseInt( name ) ) ) {
                avatarSrc = getAvatarSrc();
            }
            else {
                if ( isUserProfilePage() ) {
                    if ( baseAvatar.startsWith( userProfile.username.concat('/') ) ) {
                        avatarSrc = getAvatarSrc();
                    }
                }
                else {
                    if ( isAllUsersPage() ) {
                        const { editUserModalProps } = self.props;
                        if ( editUserModalProps.userProfile && 
                                baseAvatar.startsWith( editUserModalProps.userProfile.username.concat('/') ) ) {
                            avatarSrc = getAvatarSrc();
                        }                                           
                    }
                    else {
                        if ( baseAvatar.startsWith('blob:') ) {
                            avatarSrc = v;
                        }
                    }
                }
            }
            avatarSrc ? avatars.push(
                <li key={i} 
                    data-avatar-id={i}
                    onClick={events.handleChooseAvatar.bind(self)}
                    className={self.props.userSelectedAvatar === i ? 'active' : ''}>
                    <a href="#">
                        <img src={avatarSrc} alt={v} />
                    </a>
                </li>
            ) : null;
        });
        return (
            <div>
                <p>
                    Mời chọn một ảnh dưới đây làm ảnh đại diện
                </p>
                <ul>
                    {avatars}
                </ul>
                <div className="upload_avatar">
                    <button className="btn btn-success btnUpload"
                            onClick={events.handleUploadOtherAvatar.bind(this)}>Tải avatar từ máy tính</button>
                    {this.props.userAvatarIsAjaxLoading ? <AjaxLoading message="Đang upload, xin chờ ..." /> : null}
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        userSelectedAvatar : state.userAvatarReducer.selected_avatar,
        userAvatarsList : state.userAvatarReducer.avatars_list,
        userAvatarTimeStamp : state.userAvatarReducer.avatarTimeStamp,
        userProfile : state.userProfileReducer.userProfile,
        editUserModalProps : state.usersListReducer.editUserModalProps
    }
}
const mapDispatchToProps = dispatch => {
    return {
        updateUserAvatarsList : (avatars_list) => {
            dispatch({
                reducer : 'userAvatarReducer',
                type : "UPDATE_USER_AVATARS_LIST",            
                avatars_list : avatars_list
            });        
        },
        updateUserSelectedAvatar : (id) => {
            dispatch({
                reducer : 'userAvatarReducer',
                type : "UPDATE_USER_SELECTED_AVATAR",            
                id : id
            });        
        },   
        updateUserAvatarSrc : (avatarSrc) => {
            dispatch({
                reducer : 'userAvatarReducer',
                type : "UPDATE_USER_AVATAR_SRC",            
                avatarSrc : avatarSrc
            });        
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AvatarsListLayout);