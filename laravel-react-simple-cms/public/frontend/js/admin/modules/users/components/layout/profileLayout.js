import React, { Component } from 'react';
import { connect } from 'react-redux';
import {handleFormValidation} from 'handleValidate/handleFormValidate';
import {handleChangeFormToViewMode} from 'handleEvents/users/handleChangeFormToViewMode';
import {handleCheckFormEditMode} from 'handleEvents/users/handleCheckFormEditMode'
import AjaxLoading from '../userProfile/ajaxLoading';
import CustomSelect from 'modules/custom-select/customSelect';
import { C_MODE_STATES } from 'constants/formConstants';
import { updateProfileSelectedAvatar } from 'utils/membershipUtils';
import { isEqual } from 'lodash-es';
class profileLayout extends Component {
    constructor(props) {
        super(props);          
        this.state = { 
            userProfileFormValidate : {
                errorMessages : {
                    requiredError : "Trường này không được bỏ trắng",
                    notUrlError : "Trường này phải là một URL hợp lệ"
                },
                fields : {
                    first_nameField : {
                        error : false,
                        errorMessage : ''
                    },
                    last_nameField : {
                        error : false,
                        errorMessage : ''
                    },
                    locationField : {
                        error : false,
                        errorMessage : ''
                    },
                    websiteField : {
                        error : false,
                        errorMessage : ''
                    },
                },        
                formValidate : true
            }            
        };
        this.selectedUserRole = '';
    }
    componentDidMount() {
        const { userProfile, originalUserProfile } = this.props;        
        if ( handleCheckFormEditMode.call(this) ) {
            handleChangeFormToViewMode.call(this, 'userProfileFormValidate');
        }
        if ( originalUserProfile && originalUserProfile['role_id'] ) {
            this.selectedUserRole = originalUserProfile['role_id'];
        }
        else {
            this.selectedUserRole = userProfile['role_id'];
        }        
    }
    componentDidUpdate(previousProps, previousState) {
        const { userProfile, userSelectedAvatar, 
            userAvatarsList, updateUserSelectedAvatar } = this.props;    
        if ( ! isEqual(userAvatarsList, previousProps.userAvatarsList) || 
                !isEqual(userProfile, previousProps.userProfile) ) {
            updateProfileSelectedAvatar({userSelectedAvatar, userAvatarsList, userProfile, updateUserSelectedAvatar});
        }
    }
    render() {
        const { formid, originalUserProfile, userRolesList, userAvatarTimeStamp, events, 
                allowedChangePassword, currentModeComponent } = this.props,             
             is_edit_mode = currentModeComponent === C_MODE_STATES.edit,
             is_view_mode = currentModeComponent === C_MODE_STATES.view,
             is_saving_mode = currentModeComponent === C_MODE_STATES.saving,   
            userRolesListData = [];
        document.profileRef = this;
        userRolesList.map(e => {
            const data = {
                name : e['name'],
                value : e['id'],
                selected : originalUserProfile && parseInt( originalUserProfile['role_id'] ) === parseInt( e['id'] )
            };
            userRolesListData.push( data );
        });  
        return (
            <>
                {originalUserProfile && (
                    <div className="myTabContainer">
                        <form id={formid}
                            method="post" 
                            action=""
                            className={is_saving_mode ? "disabled" : ""}>
                            <div className="mainHeader"></div>
                            <div className="mainContent">
                                <div className="rowFluid">
                                    <div className="col-xs-12 col-sm-3 center">
                                        <div id="profile-avatar" className="profile-avatar">
                                            <a className={"profile-picture ".concat(is_edit_mode ? 'choose_image' : '')}
                                                onClick={is_edit_mode ? events.showChooseAvatarModal.bind(this) : null}>
                                                <img id="profile-img"                 
                                                    className="editable img-responsive" 
                                                    src={originalUserProfile.avatar.concat(`?t=${userAvatarTimeStamp}`)} />
                                            </a>
                                        </div>                        
                                        <div id="profile-edit" className={"profile-edit ".concat(is_view_mode ? "block" : "none")}>
                                            <a id="btnProfileEdit" href="#" 
                                            className="btn btn-sm btn-block btn-primary"
                                            onClick={events.editProfile.bind(this)}>
                                                <i className="fa fa-pencil mg-right5"></i>
                                                <span className="bigger-110">Chỉnh sửa thông tin</span>
                                            </a>
                                        </div>
                                        <div id="profile-save" 
                                            className={"profile-save".concat(is_edit_mode ? " block" : " none")}>
                                            <a id="btnProfileSave" href="#" 
                                            className={"btn btn-sm btn-block btn-success ".concat(is_saving_mode ? "disabled" : "")}
                                            onClick={events.saveProfile.bind(this)}>
                                                <i className="fa fa-save mg-right5"></i>
                                                <span className="bigger-110">Lưu thông tin</span>
                                            </a>                            
                                        </div>
                                        {allowedChangePassword && (
                                            <div id="profile-changePassword" 
                                                className="profile-changePassword">
                                                <a id="btnProfileChPass" href="#" 
                                                    className="btn btn-sm btn-block btn-danger"
                                                    onClick={events.handleShowChangePassModal.bind(this)}>
                                                    <i className="fa fa-key mg-right5"></i>
                                                    <span className="bigger-110">Thay đổi mật khẩu</span>
                                                </a>
                                            </div>
                                        )}
                                        {is_saving_mode && (
                                            <div id="profile-saving" style={{ marginTop : 10 }}>
                                                <AjaxLoading message="" />
                                            </div>
                                        )}                            
                                    </div>
                                    <div className="col-xs-12 col-sm-9">
                                        <h4 className="blue">
                                            <span className="middle">{originalUserProfile.display_name}</span>
                                            <span className="label label-purple arrowed-in-right">
                                                <i className="fa fa-circle mg-right5 align-middle"></i>
                                                online
                                            </span>
                                        </h4>
                                        <div className="profile-user-info">
                                            <div className="profile-info-row">
                                                <div className="profile-info-name">
                                                    Tên thành viên
                                                </div>
                                                <div className="profile-info-value">
                                                    <span>
                                                        {originalUserProfile.username}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="profile-info-row">
                                                <div className="profile-info-name"> 
                                                    Email 
                                                </div>
                                                <div className="profile-info-value">
                                                    <span>
                                                        {originalUserProfile.email}
                                                    </span>
                                                </div>
                                            </div>															
                                            <div className={"profile-info-row ".concat(is_edit_mode ? "edit_mode" : "")}>
                                                <div className="profile-info-name">
                                                    Họ 
                                                </div>
                                                <div className="profile-info-value">																
                                                    <div id="txtUserLastNameLabel" className={"pi-value ".concat(is_view_mode ? "block" : "none")}>
                                                        {originalUserProfile.last_name}																
                                                    </div>
                                                    <div className={"pi-editor ".concat(is_edit_mode ? "block" : "none")} arial-groupbox="true">
                                                        <input type="text" id="txtUserLastName" className="form-control" 
                                                            data-field="last_name"                                                
                                                            onChange={events.handleTextChanged.bind(this)}
                                                            onBlur={handleFormValidation.bind(this, 'userProfileFormValidate')} 
                                                            value={originalUserProfile.last_name} />
                                                        {
                                                            this.state.userProfileFormValidate.fields.last_nameField.error ?
                                                            <div className="error-msg"
                                                                dangerouslySetInnerHTML = {{ __html : this.state.userProfileFormValidate.fields.last_nameField.errorMessage }}>
                                                            </div> : 
                                                            null 
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={"profile-info-row ".concat(is_edit_mode ? "edit_mode" : "")}>
                                                <div className="profile-info-name">Tên</div>
                                                <div className="profile-info-value">																
                                                    <div id="txtUserFirstNameLabel" className={"pi-value ".concat(is_view_mode ? "block" : "none")}>
                                                        {originalUserProfile.first_name}
                                                    </div>
                                                    <div className={"pi-editor ".concat(is_edit_mode ? "block" : "none")} arial-groupbox="true">
                                                        <input type="text" id="txtUserFirstName" className="form-control" 
                                                                data-field="first_name" 
                                                                onChange={events.handleTextChanged.bind(this)}
                                                                onBlur={handleFormValidation.bind(this, 'userProfileFormValidate')} 
                                                                value={originalUserProfile.first_name} />
                                                        {this.state.userProfileFormValidate.fields.first_nameField.error ?
                                                            <div className="error-msg"
                                                                dangerouslySetInnerHTML = {{ __html : this.state.userProfileFormValidate.fields.first_nameField.errorMessage }}>
                                                            </div> : 
                                                            null}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={"profile-info-row ".concat(is_edit_mode ? "edit_mode" : "")}>
                                                <div className="profile-info-name"> Tuổi </div>
                                                <div className="profile-info-value">
                                                    <div id="txtUserAgeLabel" className={"pi-value ".concat(is_view_mode ? "block" : "none")}>{originalUserProfile.age}</div>
                                                    <div className={"pi-editor ".concat(is_edit_mode ? "block" : "none")} arial-groupbox="true">
                                                        <input type="number" 
                                                                id="txtUserAge" 
                                                                className="form-control" 
                                                                value={originalUserProfile.age} min="20" max="70" step="1" 
                                                                data-field="age"
                                                                onChange={events.handleNumberChanged.bind(this)} />
                                                    </div>																
                                                </div>
                                            </div>
                                            <div className={"profile-info-row ".concat(is_edit_mode ? "edit_mode" : "")}>
                                                <div className="profile-info-name">Địa chỉ </div>
                                                <div className="profile-info-value">																
                                                    <div id="txtUserLocationLabel" className={"pi-value ".concat(is_view_mode ? "block" : "none")}>
                                                        <i className="fa fa-map-marker light-orange mg-right5"></i> 
                                                        {originalUserProfile.location}
                                                    </div>
                                                    <div className={"pi-editor ".concat(is_edit_mode ? "block" : "none")} arial-groupbox="true">
                                                        <input type="text" id="txtUserLocation" className="form-control" 
                                                            data-field="location"                                                
                                                            onChange={events.handleTextChanged.bind(this)}
                                                            onBlur={handleFormValidation.bind(this, 'userProfileFormValidate')}
                                                            value={originalUserProfile.location} />
                                                        {
                                                            this.state.userProfileFormValidate.fields.locationField.error ?
                                                            <div className="error-msg"
                                                                dangerouslySetInnerHTML = {{ __html : this.state.userProfileFormValidate.fields.locationField.errorMessage }}>                                                    
                                                            </div> : 
                                                            null 
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={"profile-info-row ".concat(is_edit_mode ? "edit_mode" : "")}>
                                                <div className="profile-info-name"> 
                                                    Website 
                                                </div>
                                                <div className="profile-info-value">
                                                    <div className={"pi-value ".concat(is_view_mode ? "block" : "none")}>
                                                        <a id="txtUserWebsiteLabel" href={originalUserProfile.website}>
                                                            {originalUserProfile.website}
                                                        </a>
                                                    </div>
                                                    <div className={"pi-editor ".concat(is_edit_mode ? "block" : "none")} arial-groupbox="true">
                                                        <input type="text" id="txtUserWebsite" className="form-control"                                         
                                                            data-field="website"
                                                            data-validation-type="url"
                                                            onChange={events.handleTextChanged.bind(this)}
                                                            onBlur={handleFormValidation.bind(this, 'userProfileFormValidate')} 
                                                            value={originalUserProfile.website} />
                                                        {
                                                            this.state.userProfileFormValidate.fields.websiteField.error ?
                                                            <div className="error-msg"
                                                                dangerouslySetInnerHTML = {{ __html : this.state.userProfileFormValidate.fields.websiteField.errorMessage }}>
                                                            </div> : 
                                                            null 
                                                        }
                                                    </div>																
                                                </div>
                                            </div>
                                            <div className={"profile-info-row ".concat(is_edit_mode ? "edit_mode" : "")}>
                                                <div className="profile-info-name"> 
                                                    Vai trò
                                                </div>
                                                <div className="profile-info-value">
                                                    <div id="slUserRoleLabel" className={"pi-value ".concat(is_view_mode ? "block" : "none")}>
                                                        {originalUserProfile.role_name}
                                                    </div>																																
                                                    <div className={"pi-editor ".concat(is_edit_mode ? "block" : "none")} arial-groupbox="true">
                                                        <CustomSelect placeholder="--- Mời chọn một mục ---"
                                                                    data={userRolesListData}
                                                                    parent={this}
                                                                    variableReturn="selectedUserRole" />
                                                    </div>
                                                </div>																
                                            </div>
                                            <div className="profile-info-row">
                                                <div className="profile-info-name"> 
                                                    Ngày tham gia 
                                                </div>
                                                <div className="profile-info-value">
                                                    <span>{originalUserProfile.join_date}</span>															
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="rowFluid">
                                    <div className="col-xs-12 w100p">
                                        <div className="widget-box transparent">
                                            <div className="widget-header widget-header-small">
                                                <h4 className="widget-title smaller">
                                                    <i className="fa fa-check-square-o mg-right5"></i>
                                                    Giới thiệu bản thân
                                                </h4>
                                            </div>
                                            <div className="widget-body">
                                                <div className="widget-main">
                                                    <div id="txtUserIntroLabel" className={"pi-value ".concat(is_view_mode ? "block" : "none")}>
                                                        {originalUserProfile.about_me ? originalUserProfile.about_me : "<Chưa có giới thiệu nào>"}
                                                    </div>
                                                    <div className={"pi-editor ".concat(is_edit_mode ? "block" : "none")}>
                                                        <textarea id="txtUserIntro" 
                                                                rows={5}                                                
                                                                className="form-control"
                                                                data-field="about_me"
                                                                onChange={events.handleTextChanged.bind(this)}
                                                                value={originalUserProfile.about_me} />
                                                    </div>																
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mainFooter"></div>
                        </form>
                    </div>
                )}
            </>
        );
    }
}
const mapStateToProps = state => {
    return {
        userProfile : state.userProfileReducer.userProfile,
        originalUserProfile : state.userProfileReducer.originalUserProfile,
        userAvatarsList : state.userAvatarReducer.avatars_list,
        userRolesList : state.userProfileReducer.userRolesList,
        userAvatarTimeStamp : state.userAvatarReducer.avatarTimeStamp,
        currentModeComponent : state.componentReducer.currentModeState,
        usersList : state.usersListReducer.usersList,  
        userSelectedAvatar : state.userAvatarReducer.selected_avatar
    }
}
const mapDispatchToProps = dispatch => {
    return {
        updateCurrentModeComponent : (mode) => {
            dispatch({
                reducer : 'componentReducer',
                type : "UPDATE_CURRENT_MODE_STATE",
                mode : mode
            });
        }, 
        updateUserProfile : (userprofile) => {
            dispatch({
                reducer : 'userProfileReducer',
                type : "UPDATE_USER_PROFILE",            
                payload : userprofile
            });        
        },
        updateOriginalUserProfile : (userprofile) => {
            dispatch({
                reducer : 'userProfileReducer',
                type : "UPDATE_USER__PROFILE",            
                payload : userprofile
            });        
        },
        updateUsersList : (payload) => {
            dispatch({
                reducer : 'usersListReducer',
                type : "UPDATE_USERS_LIST",
                payload : payload
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
export default connect(mapStateToProps, mapDispatchToProps)(profileLayout);