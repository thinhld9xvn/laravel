export function handleCheckFormValidation(form) {
    let targetFields = this.state[form].fields,
        keys = Object.keys(targetFields),
        length = keys.length;

    for ( let i = 0; i < length; i++ ) {
        let field = targetFields[keys[i]];
        if ( field.error ) return false;
    }

    return true;
}