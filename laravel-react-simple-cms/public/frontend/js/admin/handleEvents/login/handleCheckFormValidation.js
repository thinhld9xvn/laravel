export function handleCheckFormValidation() {
    let targetFields = this.state.loginFormValidation.fields,
        keys = Object.keys(targetFields),
        length = keys.length;
    for ( let i = 0; i < length; i++ ) {
        let field = targetFields[keys[i]];
        if ( field.error ) return false;
    }
    return true;
}