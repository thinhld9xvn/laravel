import React, { Component } from 'react';
import CategoryNodeModalLayout from '../layout/CategoryNodeModalLayout';
import {onClick_closeEditCategoryNodeModal, onClick_handleSaveCategoryNodeItem} from 'handleEvents/categoriesHandleEvents';
import { MODAL_IDS } from 'constants/modalConstants';
import { FORM_IDS } from 'constants/formConstants';
import { COMPONENT_INST } from 'constants/componentConstants';
class EditCategoryNodeModal  extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal_id : MODAL_IDS.EDIT_CATEGORY_NODE,
            id : FORM_IDS.EDIT_CATEGORY_NODE,
            name : COMPONENT_INST.EDIT_CATEGORY_NODE,
            action : 'edit'
        }
    }
    componentDidMount() {}
    render() {
        const {modal_id, name} = this.state;
        return (
            <div data-popbox-id={modal_id}
                className="popbox categoryNodeModal editCategoryNodeModal modal">
                <div className="popbox_container" style={{ maxWidth : '100%' }}>
                    <div className="heading">{this.props.heading}</div>
                    <div className="text">
                        <CategoryNodeModalLayout name = {name}
                                                 id = {this.state.id}
                                                 modal_id = {this.state.modal_id}
                                                 action = {this.state.action} />
                    </div>
                    <div className="footer">
                        <button className="btn btn-primary btn-sm"
                                onClick={onClick_handleSaveCategoryNodeItem.bind(this, modal_id)}>
                            {this.props.saveText}
                        </button>
                        <button className="btn btn-default btn-sm"
                                onClick={onClick_closeEditCategoryNodeModal.bind(this, modal_id)}>
                            {this.props.closeText}
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}
export default EditCategoryNodeModal;