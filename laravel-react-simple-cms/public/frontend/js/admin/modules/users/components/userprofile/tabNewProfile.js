import React, { Component } from 'react';
import { connect } from 'react-redux';
import {handleFormValidation} from 'handleValidate/handleFormValidate';
import {onClick_showChooseAvatarDialog} from 'handleEvents/usersListHandleEvents';
import {onChange_handleProfileText, onChange_handleProfileNumber, 
            onSubmit_handleCreateNewUserForm, reloadForm} from 'handleEvents/newUserHandleEvents';
import CustomSelect from 'modules/custom-select/customSelect';
import FieldTextValidate from 'templates/fields/fieldTextValidate';
import FieldEmailValidate from 'templates/fields/fieldEmailValidate';
import FieldNumberValidate from 'templates/fields/fieldNumberValidate';
import FieldPasswordValidate from 'templates/fields/fieldPasswordValidate';
import FieldUrlValidate from 'templates/fields/fieldUrlValidate';
import LabelRequired from 'templates/fields/labelRequired';
import NodeButton from 'templates/buttons/nodeButton';
import { FORM_IDS } from 'constants/formConstants';
import { cloneDeep } from 'lodash';
import { DEFAULT_AVATAR, DEFAULT_AVATAR_NAME } from 'constants/globalConstants';
import { getAttachmentPathFromUrl } from 'utils/filemanager/fileUtils';
import { isEqual } from 'lodash-es';
const WidgetHeading = ({ fontAwesomeIcon = '', label = '' }) => {
    return (
        <div className="widget-header widget-header-small">
            <h4 className="widget-title smaller">                
                <i className={`fa ${fontAwesomeIcon} mg-right5`}></i>
                {label}                                                   
            </h4>
        </div>
    )
}
class TabNewProfile extends Component {
    constructor(props) {
        super(props);      
        const formFields = {
            username : '',
            password : '',
            retypePassword : '',
            email : '',
            first_name : '',
            last_name : '',
            location : '',
            website : '',
            age : 20,
            about_me : '',
            role_id : 1,
            avatar : DEFAULT_AVATAR_NAME,
            avatarUrl : DEFAULT_AVATAR
        };
        this.state = {
            newUserProfileFormValidate : {
                errorMessages : {
                    requiredError : "Trường này không được bỏ trắng",
                    minLengthError : "Trường này phải có tối thiểu là {n} ký tự",
                    maxLengthError : "Trường này có tối đa là {n} ký tự",
                    requiredNotSpecialCharError : "Trường này chỉ chấp nhận chữ, số và (_)",
                    notUrlError : "Trường này phải là một URL hợp lệ",
                    notOnlyEmail : "Trường này phải là một địa chỉ email hợp lệ",
                    notDuplicatePasswordError : "Mật khẩu mới không được trùng với mật khẩu cũ",
                    notMatchPasswordError : "Mật khẩu xác nhận phải trùng với mật khẩu đã nhập",                    
                    adminPasswordError : "Mật khẩu không được đặt là admin",
                    requiredSpecialCharPasswordError : "Mật khẩu phải chứa chữ, số và ký tự đặc biệt"
                },
                fields : {
                    usernameField : {
                        error : false,
                        errorMessage : ''
                    },
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
                    ageField : {
                        error : false,
                        errorMessage : ''
                    },
                    emailField : {
                        error : false,
                        errorMessage : ''
                    },
                    retypePasswordField : {
                        error : false,
                        errorMessage : ''
                    },
                    passwordField : {
                        error : false,
                        errorMessage : ''
                    },
                },               
                formValidate : false
            },
            formFields : cloneDeep( formFields ),
            _formFields : cloneDeep( formFields ),
            is_ajax_saving : false
        }
        this.selectedUserRole = '';
    }
    componentDidMount() {    
        this.props.updateUserSelectedAvatar(0);
        this.props.updateNewUserSelectedAvatar(0);
    } 
    componentDidUpdate() {
        const {newUserSelectedAvatar, userAvatarsList} = this.props;
        const {formFields} = this.state;
        const avatarUrl = userAvatarsList.find((v, i) => i == newUserSelectedAvatar); 
        const avatarName = getAttachmentPathFromUrl(avatarUrl)
        if ( !isEqual(formFields.avatarName, avatarName) ) {
            formFields.avatarName = avatarName;
            this.setState({ formFields : cloneDeep(formFields) });
        }
    }
    render() {
        const {  userRolesList, newUserSelectedAvatar, userAvatarsList, userAvatarTimeStamp } = this.props,
              { formFields, is_ajax_saving } = this.state;        
        const userRolesListData = userRolesList.map(e => {
            return {
                name : e['name'],
                value : e['id'],
                selected : false
            }
        });
        const avatar = userAvatarsList.find((v, i) => i == newUserSelectedAvatar ) || formFields.avatarUrl; 
        const avatarUrl = !avatar.startsWith('blob:') && 
                                !avatar.startsWith('data:image') ? avatar.concat(`?t=${userAvatarTimeStamp}`) : avatar;     
        return (
            <div className="myTabContainer">
                <form id={FORM_IDS.NEW_USER_PROFILE}
                      method="post" 
                      action="" 
                      className={is_ajax_saving ? "disabled" : ""}>
                    <div className="mainHeader"></div>
                    <div className="mainContent">
                        <div className="rowFluid">
                            <div className="col-xs-12 col-sm-3 center">
                                <div id="profile-avatar" className="profile-avatar">
                                    <a className="profile-picture">
                                        <img id="profile-img" 
                                            className="editable img-responsive" 
                                            src={avatarUrl} />
                                    </a>
                                </div>
                                <div id="profile-edit" className="profile-edit">
                                    <a id="btnProfileEdit" 
                                        href="#" 
                                        className="btn btn-sm btn-block btn-danger"
                                        onClick={onClick_showChooseAvatarDialog.bind(this)}>
                                        <i className="fa fa-image mg-right5"></i>
                                        <span className="bigger-110">Thay đổi avatar</span>
                                    </a>
                                </div>                           
                            </div>                    
                            <div className="col-xs-12 col-sm-9">
                                <div className="profile-user-info">
                                    <div className="profile-info-row edit_mode">
                                        <LabelRequired className="profile-info-name"
                                                        label="Tên thành viên" />
                                        <div className="profile-info-value">
                                            <FieldTextValidate id="txtUserName"
                                                               fieldName="username"
                                                               value={formFields.username}
                                                               formValidate={this.state.newUserProfileFormValidate}
                                                               validateMinChars="5"
                                                               validateMaxChars="20"
                                                               validateSpecialChars={false}
                                                               onFieldChange={onChange_handleProfileText.bind(this)}
                                                               onFieldBlur={handleFormValidation.bind(this, 'newUserProfileFormValidate')} />
                                        </div>
                                    </div>
                                    <div className="profile-info-row edit_mode">
                                        <LabelRequired className="profile-info-name"
                                                        label="Email" />
                                        <div className="profile-info-value">
                                            <FieldEmailValidate id="txtUserEmail"
                                                                fieldName="email"
                                                                value={formFields.email}
                                                                formValidate={this.state.newUserProfileFormValidate}
                                                                onFieldChange={onChange_handleProfileText.bind(this)}
                                                                onFieldBlur={handleFormValidation.bind(this, 'newUserProfileFormValidate')} />
                                        </div>
                                    </div>
                                    <div className="profile-info-row edit_mode">
                                        <LabelRequired className="profile-info-name"
                                                        label="Họ" />
                                        <div className="profile-info-value">
                                            <FieldTextValidate id="txtUserLastName"
                                                                    fieldName="last_name"
                                                                    value={formFields.last_name}
                                                                    formValidate={this.state.newUserProfileFormValidate}
                                                                    onFieldChange={onChange_handleProfileText.bind(this)}
                                                                    onFieldBlur={handleFormValidation.bind(this, 'newUserProfileFormValidate')} />
                                        </div>
                                    </div>
                                    <div className="profile-info-row edit_mode">
                                        <LabelRequired className="profile-info-name"
                                                        label="Tên" />
                                        <div className="profile-info-value">
                                             <FieldTextValidate id="txtUserFirstName"
                                                                fieldName="first_name"
                                                                value={formFields.first_name}
                                                                formValidate={this.state.newUserProfileFormValidate}
                                                                onFieldChange={onChange_handleProfileText.bind(this)}
                                                                onFieldBlur={handleFormValidation.bind(this, 'newUserProfileFormValidate')} />
                                        </div>
                                    </div>
                                    <div className="profile-info-row edit_mode">
                                        <LabelRequired className="profile-info-name"
                                                        label="Tuổi" />
                                        <div className="profile-info-value">
                                            <FieldNumberValidate id="txtUserAge"
                                                                 min="20"
                                                                 max="70"
                                                                 step="1"
                                                                 fieldName="age"
                                                                 formValidate={this.state.newUserProfileFormValidate}
                                                                 onFieldChange={onChange_handleProfileNumber.bind(this)}
                                                                 onFieldBlur={handleFormValidation.bind(this, 'newUserProfileFormValidate')}
                                                                 value={formFields.age} />
                                        </div>
                                    </div>
                                    <div className="profile-info-row edit_mode">
                                        <LabelRequired className="profile-info-name"
                                                        label="Địa chỉ" />
                                        <div className="profile-info-value">
                                            <FieldTextValidate id="txtUserLocation"
                                                               fieldName="location"
                                                               value={formFields.location}
                                                               formValidate={this.state.newUserProfileFormValidate}                                                               
                                                               onFieldChange={onChange_handleProfileText.bind(this)}
                                                               onFieldBlur={handleFormValidation.bind(this, 'newUserProfileFormValidate')} />
                                        </div>
                                    </div>
                                    <div className="profile-info-row edit_mode">
                                        <LabelRequired className="profile-info-name"
                                                        label="Website" />
                                        <div className="profile-info-value">
                                            <FieldUrlValidate id="txtUserWebsite"
                                                               fieldName="website"
                                                               value={formFields.website}
                                                               formValidate={this.state.newUserProfileFormValidate}                                                               
                                                               onFieldChange={onChange_handleProfileText.bind(this)}
                                                               onFieldBlur={handleFormValidation.bind(this, 'newUserProfileFormValidate')} />
                                        </div>
                                    </div>
                                </div>
                            </div>    
                        </div>                
                        <div className="rowFluid">
                            <div className="col-xs-12 w100p">
                                <div className="widget-box transparent">
                                    <WidgetHeading fontAwesomeIcon = "fa-check-square-o"
                                                    label = "Vai trò người dùng" />
                                    <div className="widget-body">
                                        <div className="widget-main">
                                            <div className="profile-info-row edit_mode">
                                                <LabelRequired className="profile-info-name"
                                                                label="Vai trò người dùng" />
                                                <div className="profile-info-value">
                                                    <CustomSelect placeholder="--- Mời chọn một mục ---"
                                                                    data={userRolesListData}
                                                                    parent={this}
                                                                    variableReturn="selectedUserRole" />   
                                                </div>
                                            </div>                                    
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="rowFluid">
                            <div className="col-xs-12 w100p">
                                <div className="widget-box transparent">
                                    <WidgetHeading fontAwesomeIcon = "fa-key"
                                                    label = "Mật khẩu người dùng" />
                                    <div className="widget-body">
                                        <div className="widget-main">
                                            <div className="profile-info-row edit_mode">
                                                <LabelRequired className="profile-info-name"
                                                                label="Mật khẩu" />
                                                <div className="profile-info-value">
                                                    <FieldPasswordValidate id="txtUserPassword"
                                                                            fieldName="password"   
                                                                            validateMinChars="5"
                                                                            validateMaxChars="20"
                                                                            value={formFields.password}
                                                                            formValidate={this.state.newUserProfileFormValidate} 
                                                                            onFieldChange={onChange_handleProfileText.bind(this)}
                                                                            onFieldBlur={handleFormValidation.bind(this, 'newUserProfileFormValidate')} />
                                                </div>
                                            </div>
                                            <div className="profile-info-row edit_mode">
                                                <LabelRequired className="profile-info-name"
                                                                label="Nhập lại mật khẩu" />
                                                <div className="profile-info-value">
                                                    <FieldPasswordValidate id="txtRetypeUserPassword"
                                                                            fieldName="retypePassword"   
                                                                            validateMinChars="5"
                                                                            validateMaxChars="20"
                                                                            validateType="passwordRetype"
                                                                            validateMatch={this.state.formFields.password}
                                                                            value={formFields.retypePassword}
                                                                            formValidate={this.state.newUserProfileFormValidate} 
                                                                            onFieldChange={onChange_handleProfileText.bind(this)}
                                                                            onFieldBlur={handleFormValidation.bind(this, 'newUserProfileFormValidate')} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="rowFluid">
                            <div className="col-xs-12 w100p">
                                <div className="widget-box transparent">
                                    <WidgetHeading fontAwesomeIcon = "fa-check-square-o"
                                                    label = "Giới thiệu bản thân" />
                                    <div className="widget-body">
                                        <div className="widget-main">
                                            <textarea id="txtUserIntro" 
                                                    rows={5} 
                                                    className="form-control" 
                                                    data-field="about_me" 
                                                    value={formFields.about_me}
                                                    onChange={onChange_handleProfileText.bind(this)}
                                                    />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mainFooter" style={{ textAlign : 'center' }}>                        
                        <div className="toolbar flex-layout flex-justify-center">
                            <NodeButton type="primary"
                                        size="sm"
                                        className="btnCreateNewUser"
                                        fontAwesomeIcon="fa-user"
                                        label="Tạo thành viên"
                                        onButtonClick={onSubmit_handleCreateNewUserForm.bind(this)} />
                            <NodeButton type="primary"
                                        size="sm"
                                        className="btn-default btnReload"
                                        fontAwesomeIcon="fa-refresh"
                                        label="Thiết lập lại"
                                        onButtonClick={reloadForm.bind(this)} />
                        </div>                        
                    </div>                   
                </form>
            </div>         
        );
    }
}
const mapStateToProps = state => {
    return {
        userRolesList : state.userProfileReducer.userRolesList,
        newUserSelectedAvatar : state.userAvatarReducer.new_user_selected_avatar,
        userSelectedAvatar : state.userAvatarReducer.selected_avatar,
        userAvatarsList : state.userAvatarReducer.avatars_list,
        userAvatarTimeStamp : state.userAvatarReducer.avatarTimeStamp,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        updateUserSelectedAvatar : (id) => {
            dispatch({
                reducer : 'userAvatarReducer',
                type : "UPDATE_USER_SELECTED_AVATAR",            
                id
            });        
        }, 
        updateNewUserSelectedAvatar : (id) => {
            dispatch({
                reducer : 'userAvatarReducer',
                type : "UPDATE_NEW_USER_SELECTED_AVATAR",            
                id : id
            });        
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(TabNewProfile);