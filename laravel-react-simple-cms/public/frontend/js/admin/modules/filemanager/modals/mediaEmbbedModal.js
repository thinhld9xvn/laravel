import React, { Component } from 'react';
import FileManager from '../filemanager';
import { closeMediaEmbbedModal } from 'utils/filemanager/mediaEmbbedModalUtils';
import { MODAL_IDS } from 'constants/modalConstants';
import { handleChooseObject } from 'handleEvents/filemanager/modals/handleChooseObject';
class MediaEmbbedModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal_id : MODAL_IDS.MEDIA_EMBBED,
            refTimer : null
        }
    }
    componentDidMount() {
        const t = setInterval(() => {
            const modal = document.querySelector('.mediaEmbbedModal.opened.visible .popbox_container'), 
                heading =   modal ? modal.querySelector('.mediaHeading') : null,           
                footer =   modal ? modal.querySelector('.mediaFooter') : null,           
                container = modal ? modal.querySelector('.mediaBody') : null;
            if ( container ) {
                const h = window.innerHeight - heading.clientHeight - footer.clientHeight;
                if ( parseInt( container.style.getPropertyValue('height') ) !== h ) {
                    container.style.setProperty('height', h + 'px', 'important');
                    container.style.setProperty('max-height', h + 'px', 'important');
                }
            }
        }, 200);
        this.setState({ refTimer : t });
    }
    componentWillUnmount() {
        this.state.refTimer && 
            clearInterval(this.state.refTimer);
    }
    render() {
        return (
            <div data-popbox-id={this.state.modal_id}
                className="popbox mediaEmbbedModal modal">
                <div className="popbox_container">
                    <div className="heading mediaHeading">{this.props.heading}</div>
                    <div className="text mediaBody">
                        <FileManager embbed = {true} />
                    </div>
                    <div className="footer mediaFooter">
                        <button className="btn btn-primary btn-sm"
                                onClick={handleChooseObject.bind(this)}>{this.props.chooseText}</button>
                        <button className="btn btn-default btn-sm"
                                onClick={closeMediaEmbbedModal.bind(this)}>{this.props.closeText}</button>
                    </div>
                </div>
            </div>
        );
    }
}
export default MediaEmbbedModal;