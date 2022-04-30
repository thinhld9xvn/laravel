import React from 'react';
import { connect } from 'react-redux';
import { onClick_ToggleNavBarDropDownMenu } from 'handleEvents/navbarHandleEvents';
class NavBar extends React.Component {   
    constructor(props) {
        super(props); 
    }
    componentDidMount() {
        document.addEventListener('mouseup', onClick_ToggleNavBarDropDownMenu.bind(this));
    }
    render() {
        const temp_navbaritems = [];
        const {navbarInfo} = this.props;
        /*navbarInfo.navbar_items.map(e => {
            temp_navbaritems.push(
                <li key={"nav-item-".concat(e.name)} className="nav-item dropdown">
                    <a className="nav-link" 
                        href="#" 
                        data-key-item={e.name} 
                        onClick={onClick_ToggleNavBarDropDownMenu.bind(this)}>
                        <i className="material-icons">{e.icon}</i>
                        {
                            e.name === 'actions' ? (
                                <span className="notification">{e.items_list.length}</span>
                            ) : null
                        }
                        <p className="d-lg-none d-md-block">
                            {e.label}
                        </p>
                    </a>
                    <div className={"dropdown-menu dropdown-menu-right".concat(e.show ? ' show' : '')}>
                        {
                            e.items_list.map( (se, si) => {
                                return (
                                    <a key={"nav-item-child-" . concat(si, '-', e.name)} className="dropdown-item" href={se.url}>{se.label}</a>
                                )
                            })
                        }
                    </div>
                </li>
            );
        }); */
        return (
            <nav className="navbar navbar-expand-lg navbar-transparent navbar-absolute fixed-top ">
                <div className="container-fluid">
                    <div className="navbar-wrapper">                        
                        <a className="navbar-brand shortcuts" href="#">
                            <i className="material-icons">sort</i>
                            <span className="padLeft10" style={{ fontWeight : 600 }}>{navbarInfo.navbar_brand}</span>
                        </a>
                        <a className="ni-noti notifications shortcuts flex-layout flex-align-center" href="#">
                            <i className="material-icons">apps</i>
                        </a>
                    </div>
                    <div className="collapse navbar-collapse justify-content-end">
                        <ul className="navbar-nav">
                            <li className="nav-item nav-lang">
                                <a className="ni-noti notifications languages flex-layout flex-align-center" href="#">
                                    <img src="/frontend/images/flag-vi.png" />
                                </a>
                            </li>
                            <li className="nav-item nav-lang nav-graphql">
                                <a className="ni-noti notifications languages graphql flex-layout flex-align-center" href="#">
                                    <img src="/frontend/images/graphql.png" />
                                </a>
                            </li>
                            <li className="nav-item nav-noti">
                                <a className="ni-noti notifications" href="#">
                                    <i className="material-icons">notifications</i>
                                </a>
                            </li>
                            <li className="nav-item nav-user">
                                <a href="#" className="flex-layout flex-align-center">
                                    <div className="avatar">
                                        <img src="/storage/avatars/01.png" />
                                    </div>
                                    <span className="fa fa-angle-down padLeft10"></span>
                                    <div className="user-name">
                                        <div>Lưu Đức Thịnh</div>
                                        <div>Administrator</div>
                                    </div>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}
const mapStateToProps = state => {
    return {
        navbarInfo : state.navbarInfoReducer.navbarInfo
    }
}
const mapDispatchToProps = dispatch => {
    return {
        updateNavStateItems : (navinfo) => {
            dispatch({
                reducer : 'navbarInfoReducer',
                type : "UPDATE_NAV_STATE_ITEMS",            
                payload : navinfo
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
export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
