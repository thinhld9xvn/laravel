import React from 'react';
import {closePopboxModal} from 'utils/modalUtils';
import { MODAL_IDS } from 'constants/modalConstants';
class FileUploadModal extends React.Component {
    constructor(props) {
        super(props);      
        this.state = {
            modal_id : MODAL_IDS.FILE_UPLOAD           
        };     
    }
    render() {         
        return (            
            <div data-popbox-id={this.state.modal_id} className="popbox modal">
                <div className="popbox_container">
                    <div className="heading">{this.props.heading}</div>
                    <div className="text">
                        <label className="fm-upload-bg"
                                onClick={this.props.onClick_ShowModalChooseFile}>
                        </label>
                    </div>
                    <div className="footer">
                        <button className="btn btn-default btn-sm"
                                onClick={() => closePopboxModal(this.state.modal_id)}>{this.props.closeText}</button>
                    </div>
                </div>
            </div>              
        );
    }
}
export default FileUploadModal;