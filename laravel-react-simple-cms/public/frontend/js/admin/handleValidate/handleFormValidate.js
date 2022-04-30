import * as _ from 'utils/libUtils';
import {handleCheckFormValidation} from './utils/handleCheckFormValidation'
import {handleValidationType} from './utils/handleValidationType'
import {handleGetMessageErrorHTML} from './utils/handleGetMessageErrorHTML'
export function handleFormValidation(form, e) {
    let currentTarget = e.currentTarget,
        v = currentTarget.value,
        field = currentTarget.dataset.field,
        fieldname = field + 'Field',
        validationType = currentTarget.dataset.validationType,
        targetForm = this.state[form],
        targetState = targetForm.fields[fieldname],
        targetErrorMsg = targetForm.errorMessages,
        requiredError = targetErrorMsg.requiredError,
        minLengthError = targetErrorMsg.minLengthError,
        maxLengthError = targetErrorMsg.maxLengthError,
        requiredNotSpecialCharError = targetErrorMsg.requiredNotSpecialCharError,
        messageError = '',
        isFieldError = false,
        setFieldError = (msg) => {
            isFieldError = true;
            if ( ! Array.isArray( msg ) ) {
                messageError += handleGetMessageErrorHTML(msg);
            }
            else {
                msg.forEach(v => {
                    messageError += handleGetMessageErrorHTML(v);
                });
            }
        },
        updateFormState = () => {
            targetForm.formValidate = handleCheckFormValidation.call(this, form);
            const setFormState = {};
            setFormState[form] = targetForm;
            this.setState(setFormState);
        },
        updateFormErrorState = (errorMsg) => {
            targetState.error = true;
            targetState.errorMessage = errorMsg;
            updateFormState.call(this);
        },
        resetFieldError = () => {
            targetState.error = false;
            targetState.errorMessage = '';
        };
    if ( v == '' ) {
        setFieldError(requiredError);
    }        
    let minLength = currentTarget.dataset.fieldMinLength, 
        maxLength = currentTarget.dataset.fieldMaxLength,
        isMinLengthErr = false, isMaxLengthErr = false; 
    minLength = ! _.isUndefined( minLength ) ? parseInt( minLength ) : null;
    maxLength = ! _.isUndefined( maxLength ) ? parseInt( maxLength ) : null;
    if ( minLength && ! isNaN( minLength ) ) {
        minLengthError = minLengthError.replace('{n}', minLength); 
    }
    if ( maxLength && ! isNaN( maxLength ) ) {
        maxLengthError = maxLengthError.replace('{n}', maxLength);
    }    
    if ( minLength && ! isNaN( minLength ) ) {     
        isMinLengthErr = v.length === 0 || v.length < minLength; 
        if ( isMinLengthErr ) {
            setFieldError( maxLength ? [minLengthError, maxLengthError] : minLengthError );
        }
    }        
    if ( ! isMinLengthErr && maxLength && ! isNaN( maxLength ) ) {   
        isMaxLengthErr = v.length === 0 || v.length > maxLength;
        if ( isMaxLengthErr ) {       
            setFieldError( minLength ? [minLengthError, maxLengthError] : maxLengthError );
        }
    }
    let notSpecialChar = currentTarget.dataset.fieldNotspecialchar;
    notSpecialChar = notSpecialChar && notSpecialChar.toLowerCase().trim();
    if ( notSpecialChar && notSpecialChar === 'true' ) { 
        const reg = /[-;!@#$%^&*()+"':-=`~<>,/?\[\]{}\\|\s]/ig;
        // error
        if ( v.match(reg) ) {
            setFieldError( requiredNotSpecialCharError );
        }
    }
    if ( ! _.isUndefined( validationType ) ) {
        this.currentTargetRef = e.currentTarget;
        const handleObj = handleValidationType.call(this, targetErrorMsg, v, validationType );
        if ( handleObj.error ) {
            setFieldError( handleObj.errorMessages );  
        }        
    }    
    if ( isFieldError ) {
        updateFormErrorState.call(this, messageError);
        return false;
    }
    else {
        resetFieldError();
    }    
    updateFormState.call(this);
}