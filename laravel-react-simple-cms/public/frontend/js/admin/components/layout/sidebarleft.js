import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter  } from "react-router-dom";
import { addComponentInst } from 'utils/componentUtils';
import { onClick_toggleSidebar, onClick_MenuItemToggle } from 'handleEvents/sidebarHandleEvents';
import { COMPONENT_INST } from 'constants/componentConstants';
//import { performDidMountHook } from 'utils/sidebarUtils';
import SidebarItem from 'templates/sidebar/sidebar-item';
class SidebarLeft extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            is_disable: false
        }
    }
    componentDidMount() {        
        //performDidMountHook.call(this);
    }
    componentDidUpdate() {
        addComponentInst({
            name: COMPONENT_INST.SIDEBAR_LEFT,
            instance: this
        });    
    }
    setSidebarDisable(s) {
        this.setState({
            is_disable: s
        })
    }    
    render() {
        const {sidebarMenuItems} = this.props;
        const temp_menuitems = sidebarMenuItems && sidebarMenuItems.length ?
                                    sidebarMenuItems.map((item, i) => <SidebarItem item = {item} 
                                                                                    index = {i}
                                                                                    props = {{handleClickMenuItemToggle : onClick_MenuItemToggle.bind(this)}} />) : null;
        return (
            <>
                <div id="sidebar" className={"sidebar ".concat(this.state.is_disable ? 'disabled' : '')}
                    data-color="purple"
                    data-background-color="white"
                    data-image="">
                    <div className="logo">
                        <a href="#" className="simple-text logo-normal">
                            <img src="data:image/webp;base64,UklGRuYBAABXRUJQVlA4TNkBAAAvOAAOEIcgEEgi3h9giDmZeIFACje4RA2O4XAYSVIb7eGEMLrNP93ncPUBRPR/AvCHXRj6uySWzsleklwSKze2dIH/uFmznMrc/6VD/gDZ5AjqCWo44o6Q6QTKSFvJubRvhWmPDz+OZE0OpsQyx7TDkS8AhOywKFlnmDYEsv5slXdG/Rpy9duAoBb7hsPSLebLIN2is3xt1Z+DdKsYoiRVFvzbSLK/YQJeDbpR4m+Y8o2TX7DwWGVb5mKx0AyVgShJlYnC5S5GNpgG8JXVw365seWxWnW0GHmlbvnuoN+QeGkCkBp7FqvekoHC3y4Gb60IHOdRmMvY+BgN2ehbwo4wUQ29LxvtPqejOHIXIenPC1NPPUYB4J6cA+wyFXe8RsZ6mNJspoluxA1oM7PecDTdQHJ7xHK6xRnZ+DDsJLuFuCPB/IwyiPwNFtJagvnQjINnCf6b0whT1PgwdAM3AzyfpVlgV5p5hKTUhFWfS2s1B8wmmirGrZ52xt1eLZW7ktKOWJWmcZ+8nCxYDmTbFj5OdlmTj+kntyQLqXFWPbYHkqxPGPlUlNPqsb/9DL/OdfXYH3n08zj4HamCg4kH9cHR50BxOCuvbioO5yXVtf4ILpWYWx/1lqNgKwA=" alt="logo" />
                        </a>
                    </div>
                    <div className="sidebar-wrapper ps-theme-default">
                        <nav>
                            <ul className="nav">
                                {temp_menuitems}
                            </ul>
                        </nav>
                    </div>
                </div>
                <a href="#" 
                    className="toggleSidebar" 
                    onClick={onClick_toggleSidebar.bind(this)}></a>
            </>
        );
    }
}
const mapStateToProps = state => {
    return {
        sidebarMenuItems : state.sidebarMenuReducer.menuItems
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
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SidebarLeft));