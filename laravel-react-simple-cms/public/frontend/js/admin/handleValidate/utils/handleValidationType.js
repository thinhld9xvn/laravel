import {handleValidationUrl} from './handleValidationUrl'
import {handleValidationOnlyNumber} from './handleValidationOnlyNumber'
import {handleValidationEmail} from './handleValidationEmail'
import {handleValidationPhoneNumber} from './handleValidationPhoneNumber'
export function handleValidationType(errorObj, v, type) {
    let boolValidate = true,
        usernameNotSpecialCharError = errorObj.usernameNotSpecialCharError,
        notUrlError = errorObj.notUrlError,
        notOnlyNumberError = errorObj.notOnlyNumberError,
        notOnlyEmail = errorObj.notOnlyEmail,
        notPhoneNumber = errorObj.notPhoneNumber,
        notDuplicatePassword = errorObj.notDuplicatePasswordError,
        notMatchPassword = errorObj.notMatchPasswordError,        
        adminPasswordError = errorObj.adminPasswordError,
        requiredSpecialCharPasswordError = errorObj.requiredSpecialCharPasswordError,
        errorMessages = [];   

    switch ( type ) {

        case 'url' :
            boolValidate = handleValidationUrl(v);
            if ( ! boolValidate ) errorMessages.push( notUrlError );
            break;

        case 'number' :
            boolValidate = handleValidationOnlyNumber(v);
            if ( ! boolValidate ) errorMessages.push( notOnlyNumberError );
            break;

        case 'email' :
            boolValidate = handleValidationEmail(v);
            if ( ! boolValidate ) errorMessages.push( notOnlyEmail );
            break;

        case 'phone-number' :
            boolValidate = handleValidationPhoneNumber(v);
            if ( ! boolValidate ) errorMessages.push( notPhoneNumber );
            break;
        
        default :
            break;

    }

    if ( ['passwordMatch', 'passwordRetype'].includes(type) ) {
        const o = this.currentTargetRef.dataset.fieldValueMatch,
            isDuplicatePasswordErr = o.trim() === v.trim(),            
            isAdminPasswordErr = v.trim() === 'admin',
            isSpecialCharPassword = () => {
                const reg = /^(?=.*?[A-Za-z])(?=.*?[0-9])(?=.*?[^\w\s]).+$/;
                return reg.test( v );
            };            
           
        if ( isAdminPasswordErr ) errorMessages.push( adminPasswordError );
        if ( ! isSpecialCharPassword() ) errorMessages.push( requiredSpecialCharPasswordError ); 

        if ( type === 'passwordMatch' ) {
            if ( isDuplicatePasswordErr ) errorMessages.push( notDuplicatePassword );
        }

        else {
            if ( ! isDuplicatePasswordErr ) errorMessages.push( notMatchPassword );
        }

        return {
            error : errorMessages.length > 0,
            errorMessages : errorMessages
        };

    }

    return { 
        error : ! boolValidate,
        errorMessages : errorMessages
        
    };
}