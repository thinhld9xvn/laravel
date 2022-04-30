import React from 'react';
import LoginPage from 'components/pages/login';
import {checkLogin, logout} from 'utils/loginUtils';
import {hasParameterFromUrl, addParameterToUrl, redirectToUrl} from 'utils/urlUtils';
import {LOGIN_URL} from 'constants/UrlConstants';
import MainContainer from 'components/layout/maincontainer';
import "regenerator-runtime/runtime";
import "core-js/stable"; // or a more selective import such as "core-js/es/array"
import { isEmptyObj } from './utils/libUtils';
import { removeClientUserInfo } from './utils/membershipUtils';
export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			component : null
		};
		this.timerRef = null;
	}
	isLoginUrl() {
		return window.location.pathname.indexOf('/admin/login') === 0;
	}
	isRedirectUrlParameter() {
		return hasParameterFromUrl(window.location.href, "redirect_url");
	}
	addRedirectUrlParameter(v) {
		return addParameterToUrl(window.location.href, "redirect_url", v);
	}
	performNotLoginAction() {
		let pathname = window.location.pathname,
			parameters = window.location.search;
		// exist
		if ( this.isLoginUrl() ) {
			// exist
			if ( this.isRedirectUrlParameter() ) {
			}
			else {
				history.pushState("", "", "?redirect_url=/admin/dashboard")
			}
		}
		else {
			window.location.href = "/admin/login?redirect_url=" + pathname;
		}
	}
	componentDidMount() {
		let is_logged_in = false,			
			component = null,
			checkSessionLogin = async () => {
				const results = await checkLogin.call(this);
				is_logged_in = results ? !isEmptyObj(results.data) : false;
				if ( ! is_logged_in ) {
					redirectToUrl(LOGIN_URL, {
						name : 'redirect_url',
						value : window.location.href
					});
				}
			},
			checkLoginCallback = async () => {
				const results = await checkLogin.call(this);	
				is_logged_in = results ? !isEmptyObj(results.data) : false;
				component = <LoginPage />;
				// /admin/login
				if ( this.isLoginUrl() ) {
					const results = await logout.call(this);
					//
					removeClientUserInfo();
					if ( ! this.isRedirectUrlParameter() ) {
						redirectToUrl(LOGIN_URL, {
							name : 'redirect_url',
							value : '/admin/dashboard'	
						});
					}
					else {
						this.setState({
							component : component
						});		
					}
				}
				else {
					if ( ! is_logged_in ) {	
						redirectToUrl(LOGIN_URL, {
							name : 'redirect_url',
							value : window.location.href
						});
					}
					else {
						component = ( 
							<div className="w100p">
								<MainContainer /> 
							</div>
						);					
						this.setState({
							component : component
						});
						if ( this.timerRef === null ) {
							this.timerRef = setInterval(() => {
								checkSessionLogin();
							}, 60000);
						}
					}
				}	
			};
		checkLoginCallback();
	}
	render() {	
		return ( this.state.component );
	}
}