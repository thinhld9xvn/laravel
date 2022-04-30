import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from "react-router-dom";
import NavBar from "./navbar";
import { asyncComponent } from './asyncComponent';
import { performMainPanelDidMountHook } from 'utils/mainAppUtils';
import { addComponentInst } from 'utils/componentUtils';
import { COMPONENT_INST } from 'constants/componentConstants';
import { ACTIVE_ROUTES } from 'constants/UrlConstants';
const DashboardPage = asyncComponent(() => {
    return import('components/pages/dashboard');
});
const FileManagerPage = asyncComponent(() => {
    return import('components/pages/filemanager');
});
const UserProfilePage = asyncComponent(() => {
    return import('components/pages/users/userprofile');
});
const AllUsersPage = asyncComponent(() => {
    return import('components/pages/users/allusers');
});
const NewUserPage = asyncComponent(() => {
    return import('components/pages/users/newuser');
});
const PostTypesPage = asyncComponent(() => {
    return import('components/pages/configuration/postTypes');
});
const postsListPage  = asyncComponent(() => {
    return import('components/pages/ap_type/postsList');
});
const newPostPage  = asyncComponent(() => {
    return import('components/pages/ap_type/newPost');
});
const editPostPage  = asyncComponent(() => {
    return import('components/pages/ap_type/editPost');
});
const categoriesListPage  = asyncComponent(() => {
    return import('components/pages/ap_type/categoriesList');
});
const tagsListPage  = asyncComponent(() => {
    return import('components/pages/ap_type/tagsList');
});
class MainPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeComponentInstName : '',
            is_ajax_completed : false
        }        
        this.activeUrlParams = '';
    }
    async componentDidMount() {
        performMainPanelDidMountHook.call(this);        
    }
    componentDidUpdate() {
        this.activeUrlParams = window.location.pathname + window.location.search;
        addComponentInst({
            name : COMPONENT_INST.MAIN_CONTAINER,
            instance : this
        });
    }      
    render() {
        const {is_ajax_completed} = this.state;
        return (
            is_ajax_completed && (
                <div className="main-panel">
                    <NavBar />
                    <div className="content">
                        <div className="container-fluid">
                            <div className="row">
                                <Switch>
                                    <Route path={ACTIVE_ROUTES.DASHBOARD} component={DashboardPage} />
                                    <Route path={ACTIVE_ROUTES.MEDIA} component={FileManagerPage} />
                                    <Route path={ACTIVE_ROUTES.PROFILE} component={UserProfilePage} />
                                    <Route path={ACTIVE_ROUTES.ALL_USERS} component={AllUsersPage} />
                                    <Route path={ACTIVE_ROUTES.NEW_USER} component={NewUserPage} />
                                    <Route path={ACTIVE_ROUTES.CONFIG_POST_TYPES} component={PostTypesPage} />
                                    <Route path={ACTIVE_ROUTES.POSTS_LIST} component={postsListPage} />
                                    <Route path={ACTIVE_ROUTES.NEW_POST} component={newPostPage} />
                                    <Route path={ACTIVE_ROUTES.EDIT_POST} component={editPostPage} />
                                    <Route path={ACTIVE_ROUTES.CATEGORIES_LIST} component={categoriesListPage} />
                                    <Route path={ACTIVE_ROUTES.TAGS_LIST} component={tagsListPage} />
                                </Switch>
                            </div>
                        </div>
                    </div>                         
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
        updateUserProfile : (userprofile) => {
            dispatch({
                reducer : 'userProfileReducer',
                type : "UPDATE_USER_PROFILE",            
                payload : userprofile
            });        
        },
        updateUserRolesList : (rolesList) => {
            dispatch({
                reducer : 'userProfileReducer',
                type : "UPDATE_USER_ROLES_LIST",
                payload : rolesList
            });        
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(MainPanel);