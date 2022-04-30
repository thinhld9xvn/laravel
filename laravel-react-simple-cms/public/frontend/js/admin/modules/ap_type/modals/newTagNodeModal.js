import React, { Component } from 'react';
import TagNodeModalLayout from '../layout/TagNodeModalLayout';
import {onClick_closeCreateTagNodeModal, 
            onClick_handleCreateTagNodeItem} from 'handleEvents/tagsHandleEvents';
import { COMPONENT_INST } from 'constants/componentConstants';
import { MODAL_IDS } from 'constants/modalConstants';
import { FORM_IDS } from '../../../constants/formConstants';
class NewTagNodeModal  extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal_id : MODAL_IDS.NEW_TAG_NODE,
            id : FORM_IDS.NEW_TAG_NODE,
            name : COMPONENT_INST.NEW_TAG_NODE,
            action : 'new'
        }
    }
    componentDidMount() {}
    render() {
        const {modal_id, name} = this.state;
        return (
            <div data-popbox-id={modal_id}
                className="popbox categoryNodeModal newTagNodeModal modal">
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
                                onClick={onClick_handleCreateTagNodeItem.bind(this)}>
                            {this.props.saveText}
                        </button>
                        <button className="btn btn-default btn-sm"
                                onClick={onClick_closeCreateTagNodeModal.bind(this, modal_id)}>
                            {this.props.closeText}
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}
export default NewTagNodeModal;