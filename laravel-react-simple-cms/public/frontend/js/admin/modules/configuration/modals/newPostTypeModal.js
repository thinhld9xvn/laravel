import React, { Component } from 'react';
import PostTypeModalLayout from '../layout/postTypeModalLayout';
import {
    onClick_closeNewPostTypeModal,
    onSubmit_performCreateNewPostType
} from 'handleEvents/postTypesHandleEvents';
import { MODAL_IDS } from 'constants/modalConstants';
import { FORM_IDS } from 'constants/formConstants';
class NewPostTypeModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal_id: MODAL_IDS.NEW_POST_TYPE
        };
    }
    render() {
        const {modal_id} = this.state;
        const {heading, chooseText, closeText} = this.props;
        return (            
            <div data-popbox-id={modal_id}
                className="modalConfiguration modalConfigPostType editPostModal modalNewPostType popbox modal">
                <div className="popbox_container">
                    <div className="heading">{heading}</div>
                    <div className="text">
                        <PostTypeModalLayout  formid = {FORM_IDS.NEW_POST_TYPE} />
                    </div>
                    <div className="footer">
                        <button className="btn btn-primary btn-sm"
                            onClick={onSubmit_performCreateNewPostType.bind(this)}>
                            {chooseText}
                        </button>
                        <button className="btn btn-default btn-sm"
                            onClick={onClick_closeNewPostTypeModal.bind(this)}>
                            {closeText}
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}
export default NewPostTypeModal;