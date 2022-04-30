import {handleSuccessLogin} from './handleLogin/handleSuccessLogin'
import {handleFailedLogin} from './handleLogin/handleFailedLogin'
import {login} from 'utils/loginUtils'
import { handleGetParameterFromUrl } from 'utils/url/handleGetParameterFromUrl';
export async function handleLogin() {
    this.setState({ loaderState : true });
    const {loginFormValidation} = this.state;
    document.getElementById('txtUserName').blur();
    document.getElementById('txtUserPassword').blur();
    setTimeout(() => {}, 100);
    if ( ! loginFormValidation.formValidation ) {
        alert('Mời nhập đầy đủ thông tin đăng nhập !');
        return false;
    }
    const redirect_url = handleGetParameterFromUrl(window.location.href, "redirect_url");
    const fd = new FormData(),    
          formFields = this.state.formFields,
          username = formFields.username,
          password = formFields.password;        
    fd.append("email", username);
    fd.append("password", password);    
    const response = await login(fd);    
    if ( !response ) handleFailedLogin.call(this, formFields);
    if ( response ) {        
        const {data} = response;
        // đăng nhập thành công
        if ( data.success ) {
            const {data : userInfoData} = data;
            handleSuccessLogin.call(this, {formFields, userInfoData, redirect_url});
        }
        else {
            handleFailedLogin.call(this, formFields);
            setTimeout(() => {
                this.setState({ loaderState : false });
            }, 200);
        }
    }
    
}