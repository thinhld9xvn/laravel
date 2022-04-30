import React, { Component } from 'react';
import { connect } from 'react-redux';
import {onChange_handleFieldChanged} from 'handleEvents/userPasswordHandleEvents';
import {handleResetForm} from 'handleEvents/users/handleResetForm'
import {handleFormValidation} from 'handleValidate/handleFormValidate';
import { FORM_IDS } from 'constants/formConstants';
class ChangeUserPasswordLayout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userPasswordFormValidate : {
                errorMessages : {
                    requiredError : "Trường này không được bỏ trắng",
                    notDuplicatePasswordError : "Mật khẩu mới không được trùng với mật khẩu cũ",
                    minLengthError : "Mật khẩu phải có tối thiểu là {n} ký tự",
                    maxLengthError : "Mật khẩu có tối đa là {n} ký tự",
                    adminPasswordError : "Mật khẩu không được đặt là admin",
                    requiredSpecialCharPasswordError : "Mật khẩu phải chứa chữ, số và ký tự đặc biệt"
                },
                fields : {
                    oldPasswordField : {
                        error : false,
                        errorMessage : ''
                    },
                    newPasswordField : {
                        error : false,
                        errorMessage : ''
                    }                    
                },
                formValidate : true
            },
            oldPassword : '',
            newPassword : '',           
            isSaveChanges : false
        };
    } 
    render() {
        const { events } = this.props;
        document.changeUserPassRef = this;
        return (
            <div>
                <form id={FORM_IDS.USER_PASSWORD}
                    method="post"
                    action=""
                    className={this.state.isSaveChanges ? "disabled" : ""}>
                    <div className="mainHeader"></div>
                    <div className="mainContent">
                        <div className="inputBoxControl">
                            <label>
                                Mật khẩu cũ
                            </label>
                            <div className="inputControl">
                                <input type="password" 
                                    id="txtOldPassword"
                                        name="txtOldPassword" 
                                        className="form-control"
                                        data-field="oldPassword"
                                        data-field-min-length="5"
                                        data-field-max-length="20"
                                        value={this.state.oldPassword} 
                                        onChange={onChange_handleFieldChanged.bind(this)} 
                                        onBlur={handleFormValidation.bind(this, 'userPasswordFormValidate')}
                                        />
                                {
                                    this.state.userPasswordFormValidate.fields.oldPasswordField.error ?
                                    <div className="error-msg"
                                        dangerouslySetInnerHTML={{ __html : this.state.userPasswordFormValidate.fields.oldPasswordField.errorMessage }}>
                                    </div> : 
                                    null 
                                }
                            </div>
                        </div>
                        <div className="inputBoxControl">
                        <label>
                            Mật khẩu mới
                        </label>
                        <div className="inputControl">
                            <input type="password" 
                                id="txtNewPassword"
                                    name="txtNewPassword" 
                                    className="form-control"
                                    data-field="newPassword"
                                    data-field-value-match={this.state.oldPassword}                                    
                                    data-validation-type="passwordMatch"
                                    data-field-min-length="5"
                                    data-field-max-length="20"
                                    value={this.state.newPassword} 
                                    onChange={onChange_handleFieldChanged.bind(this)} 
                                    onBlur={handleFormValidation.bind(this, 'userPasswordFormValidate')}
                                    />
                            {
                                this.state.userPasswordFormValidate.fields.newPasswordField.error ?
                                <div className="error-msg"
                                     dangerouslySetInnerHTML={{ __html : this.state.userPasswordFormValidate.fields.newPasswordField.errorMessage }}>                                    
                                </div> : 
                                null 
                            }
                        </div>
                    </div>
                        <div className="inputBoxControl">
                            <button className="btn btn-sm btn-primary"
                                    type="submit"
                                    onClick={events.handleSubmitForm.bind(this)}>
                                <span className="fa fa-key"></span>
                                <span className="padLeft5">
                                    Thay đổi mật khẩu
                                </span>
                            </button>
                            <button type="button" 
                                    className="btn btn-sm btn-default"
                                    onClick={handleResetForm.bind(this)}>
                                <span className="fa fa-refresh"></span>
                                <span className="padLeft5">
                                    Thiết lập lại
                                </span>
                            </button>
                        </div>
                    </div>
                    <div className="mainFooter"></div>
                </form>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        userProfile : state.userProfileReducer.userProfile,  
        originalUserProfile : state.userProfileReducer.originalUserProfile,  
        usersList : state.usersListReducer.usersList,  
        editUserModalProps : state.usersListReducer.editUserModalProps,  
    }
}
const mapDispatchToProps = dispatch => {
    return {
        updateUsersList : (payload) => {
            dispatch({
                reducer : 'usersListReducer',
                type : "UPDATE_USERS_LIST",
                payload : payload
            });  
        },   
        updateUserProfile : (userprofile) => {
            dispatch({
                reducer : 'userProfileReducer',
                type : "UPDATE_USER_PROFILE",            
                payload : userprofile
            });        
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ChangeUserPasswordLayout);