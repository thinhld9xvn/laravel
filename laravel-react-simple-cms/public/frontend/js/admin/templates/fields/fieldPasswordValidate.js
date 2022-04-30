import React from 'react'

export default function FieldPasswordValidate({ id, 
                                            className = '', 
                                            fieldName, 
                                            value,
                                            formValidate,
                                            validateMinChars = null, 
                                            validateMaxChars = null,   
                                            validateMatch = null,  
                                            validateType = null,                         
                                            onFieldChange, 
                                            onFieldBlur }) {

    return (
        <>
            <input type="password" 
                id={id}
                className={`form-control ${className}`}
                data-field={fieldName}                                                    
                data-field-min-length={validateMinChars}
                data-field-max-length={validateMaxChars}
                data-field-value-match={validateMatch}
                data-validation-type={validateType}
                value={value}
                onChange={onFieldChange}
                onBlur={onFieldBlur} />

            {formValidate.fields[`${fieldName}Field`].error && (

                <div className="error-msg padLeft5" 
                    dangerouslySetInnerHTML={{ __html : formValidate.fields[`${fieldName}Field`].errorMessage }}>
                </div>

            )}
        </>
    )
}
