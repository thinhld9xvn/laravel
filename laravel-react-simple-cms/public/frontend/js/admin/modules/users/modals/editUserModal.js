import React, { Component } from 'react';
import { connect } from 'react-redux';
import {onChange_handleProfileText,
        onChange_handleProfileNumber,
        onClick_showChooseAvatarDialog,
        onClick_ProfileEditMode,
        onClick_CloseEditUserModal,
        onClick_ProfileEditSave,
        onClick_showChangePassModal} from 'handleEvents/usersListHandleEvents';
import ProfileLayout from "../components/layout/profileLayout";
import { MODAL_IDS } from 'constants/modalConstants';
import { FORM_IDS } from 'constants/formConstants';
class EditUserModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal_id : MODAL_IDS.EDIT_USER
        };
    }
    render() {
        //const { editUserModalProps } = this.props;
        const events = {
            showChooseAvatarModal : onClick_showChooseAvatarDialog,
            editProfile : onClick_ProfileEditMode,
            saveProfile : onClick_ProfileEditSave,
            handleTextChanged : onChange_handleProfileText,
            handleNumberChanged : onChange_handleProfileNumber,
            handleShowChangePassModal : onClick_showChangePassModal
        };
        return (
            <div data-popbox-id={this.state.modal_id}
                 className="modalEditUser popbox modal"
                 style={{ zoom : this.props.zoom }}>
                <div className="popbox_container">
                    <div className="heading">{this.props.heading}</div>
                    <div className="text">
                        <ProfileLayout
                            formid = {FORM_IDS.EDIT_USER}
                            events = {events}
                            allowedChangePassword = {true} />
                    </div>
                    <div className="footer">
                        <button className="btn btn-default btn-sm"
                                onClick={onClick_CloseEditUserModal.bind(this)}
                                data-popbox-close={this.state.modal_id}>{this.props.closeText}</button>
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
    }
}
const mapDispatchToProps = dispatch => {
    return {
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(EditUserModal);