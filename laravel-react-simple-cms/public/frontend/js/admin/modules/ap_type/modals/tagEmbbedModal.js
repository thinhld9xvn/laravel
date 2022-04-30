import { MODAL_IDS } from 'constants/modalConstants';
import { onClick_chooseEmbbedTagsList } from 'handleEvents/postTypesHandleEvents';
import React, { Component } from 'react';
import { isUndefined } from 'utils/libUtils';
import TagsList from '../tagsList';
class TagEmbbedModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal_id : MODAL_IDS.TAG_EMBBED,
            loadMediaEmbbed : !isUndefined(props.loadMediaEmbbed) ? props.loadMediaEmbbed : true
        }
    }
    componentDidMount() {
    }
    render() {
        return (
            <div data-popbox-id={this.state.modal_id}
                className="popbox categoryEmbbedModal tagEmbbedModal modal">
                <div className="popbox_container">
                    <div className="heading">{this.props.heading}</div>
                    <div className="text">
                        <TagsList loadMediaEmbbed = {this.state.loadMediaEmbbed}
                                  showCheckboxes = {true} />
                    </div>
                    <div className="footer">
                        <button className="btn btn-primary btn-sm"
                                onClick={onClick_chooseEmbbedTagsList.bind(this)}>
                            {this.props.ChooseText}
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}
export default TagEmbbedModal;