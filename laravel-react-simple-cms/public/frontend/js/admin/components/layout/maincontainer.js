import React from 'react';
import MainPanel from './mainpanel';
import SidebarLeft from './sidebarleft';
import Loader from './loader';
import { connect } from 'react-redux';
import {addComponentInst} from 'utils/componentUtils';
import { COMPONENT_INST } from 'constants/componentConstants';
import { initialize } from 'utils/mainAppUtils';
import { BrowserRouter as Router  } from "react-router-dom"
class MainContainer extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            is_loading : true
        }
    } 
    componentDidMount() {
        initialize.call(this);
    }
    componentDidUpdate() {
        addComponentInst({
            name : COMPONENT_INST.MAIN_CONTAINER,
            instance : this
        });
    }      
    componentWillUnmount() {
    }
	render() {
        const {is_loading} = this.state;
		return(
            !is_loading && (
                <div className="wrapper flex-layout">
                    <Router>
                        <>
                            <SidebarLeft  />
                            <MainPanel />
                            <Loader />
                        </>
                    </Router>
                </div>
            )
		);
	}
}
const mapStateToProps = state => {
    return {
    }
}
const mapDispatchToProps = dispatch => {
    return {
        updateSidebarMenu : (info) => {
            dispatch({
                reducer : 'sidebarMenuReducer',
                type : "UPDATE_SIDEBAR_MENU",            
                payload : info
            });        
        },    
        updateNavBrandName : (name) => {
            dispatch({
                reducer : 'navbarInfoReducer',
                type : "UPDATE_BRAND_NAME",            
                name : name
            });
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);