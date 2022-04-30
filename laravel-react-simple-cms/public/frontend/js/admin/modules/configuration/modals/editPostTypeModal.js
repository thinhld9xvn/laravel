import React, { Component } from 'react';
import { connect } from 'react-redux';
import { onClick_closeEditPostTypeModal, onSubmit_performEditPostType } from 'handleEvents/postTypesHandleEvents';
import PostTypeModalLayout from '../layout/postTypeModalLayout';
import { MODAL_IDS } from 'constants/modalConstants';
import { FORM_IDS } from 'constants/formConstants';
class EditPostTypeModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal_id: MODAL_IDS.EDIT_POST_TYPE
        }
    }
    componentDidMount() {}
    render() {       
        return (
            <div data-popbox-id={this.state.modal_id}
                className="modalConfiguration modalConfigPostType editPostModal editPostTypeModal popbox modal">
                <div className="popbox_container">
                    <div className="heading">{this.props.heading}</div>
                    <div className="text">
                        <PostTypeModalLayout formid={FORM_IDS.EDIT_POST_TYPE} />
                    </div>
                    <div className="footer">
                        <button className="btn btn-primary btn-sm"
                            onClick={onSubmit_performEditPostType.bind(this)}>{this.props.chooseText}</button>
                        <button className="btn btn-default btn-sm"
                            onClick={onClick_closeEditPostTypeModal.bind(this)}>{this.props.closeText}</button>
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
export default connect(mapStateToProps, mapDispatchToProps)(EditPostTypeModal);