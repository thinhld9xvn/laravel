import React, { Component } from 'react';
import LoadingOverlay from 'react-loading-overlay';
import BounceLoader from 'react-spinners/BounceLoader';
import 'css/loader.min.css';
import {addComponentInst} from 'utils/componentUtils';
import { COMPONENT_INST } from 'constants/componentConstants';
class Loader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaderState : false
        }
    }
    componentDidMount() {
        addComponentInst({
            name : COMPONENT_INST.LOADER,
            instance : this
        });
    }
    render() {
        return (
            <LoadingOverlay
                active={this.state.loaderState}
                spinner={<BounceLoader color={"#9c27b0"} />}>                
            </LoadingOverlay>
        );
    }
}
export default Loader;