import React, { Component } from "react";
import { connect } from 'react-redux';
import { onClick_CropAvatar } from 'handleEvents/userProfileHandleEvents';
import CropAvatarLayout from '../components/layout/cropAvatarLayout';
import { MODAL_IDS } from "constants/modalConstants";
class CropAvatarModal extends Component {
    constructor(props) {
        super(props);   
        this.state = {
            modal_id : MODAL_IDS.CROP_AVATAR
        }      
    }
    componentDidMount() {}
    render() {  
        const events = {
            handleCropAvatar : onClick_CropAvatar
        };
        return (
            <div data-popbox-id={this.state.modal_id} 
                 className="modalCropAvatar popbox modal"
                 style={{ zoom : this.props.zoom || 'unset' }}>
                <div className="popbox_container">
                    <div className="heading">{this.props.heading}</div>
                    <div className="text">
                        <CropAvatarLayout modal_id = {this.state.modal_id} 
                                          chooseText = {this.props.chooseText}
                                          closeText = {this.props.closeText} 
                                          events = {events}
                                          />
                    </div>                    
                </div>
            </div>            
        )
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
export default connect(mapStateToProps, mapDispatchToProps)(CropAvatarModal);