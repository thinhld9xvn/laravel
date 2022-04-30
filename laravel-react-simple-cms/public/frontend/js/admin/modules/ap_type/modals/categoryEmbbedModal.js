import { MODAL_IDS } from 'constants/modalConstants';
import { onClick_closePostCategoryModal } from 'handleEvents/postTypesHandleEvents';
import React, { Component } from 'react';
import { isUndefined } from 'utils/libUtils';
import CategoriesList from '../categoriesList';
class CategoryEmbbedModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal_id : MODAL_IDS.CATEGORY_EMBBED,
            loadMediaEmbbed : !isUndefined(props.loadMediaEmbbed) ? props.loadMediaEmbbed : true
        }
    }
    componentDidMount() {
    }
    render() {
        return (
            <div data-popbox-id={this.state.modal_id}
                className="popbox categoryEmbbedModal modal">
                <div className="popbox_container">
                    <div className="heading">{this.props.heading}</div>
                    <div className="text">
                        <CategoriesList loadMediaEmbbed = {this.state.loadMediaEmbbed} />
                    </div>
                    <div className="footer">
                        <button className="btn btn-default btn-sm"
                                onClick={onClick_closePostCategoryModal.bind(this)}>
                            {this.props.closeText}
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}
export default CategoryEmbbedModal;