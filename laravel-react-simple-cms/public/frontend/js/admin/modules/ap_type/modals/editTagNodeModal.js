import React, { Component } from 'react';
import TagNodeModalLayout from '../layout/TagNodeModalLayout';
import {onClick_closeEditTagNodeModal, onClick_handleSaveTagNodeItem} from 'handleEvents/tagsHandleEvents';
import { MODAL_IDS } from 'constants/modalConstants';
import { FORM_IDS } from 'constants/formConstants';
import { COMPONENT_INST } from 'constants/componentConstants';
class EditTagNodeModal  extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal_id : MODAL_IDS.EDIT_TAG_NODE,
            id : FORM_IDS.EDIT_TAG_NODE,
            name : COMPONENT_INST.EDIT_TAG_NODE,
            action : 'edit'
        }
    }
    componentDidMount() {}
    render() {
        const {modal_id, name} = this.state;
        return (
            <div data-popbox-id={modal_id}
                className="popbox tagNodeModal editTagNodeModal modal">
                <div className="popbox_container" style={{ maxWidth : '100%' }}>
                    <div className="heading">{this.props.heading}</div>
                    <div className="text">
                        <TagNodeModalLayout name = {name}
                                                 id = {this.state.id}
                                                 modal_id = {this.state.modal_id}
                                                 action = {this.state.action} />
                    </div>
                    <div className="footer">
                        <button className="btn btn-primary btn-sm"
                                onClick={onClick_handleSaveTagNodeItem.bind(this, modal_id)}>
                            {this.props.saveText}
                        </button>
                        <button className="btn btn-default btn-sm"
                                onClick={onClick_closeEditTagNodeModal.bind(this, modal_id)}>
                            {this.props.closeText}
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}
export default EditTagNodeModal;