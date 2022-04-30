import React from 'react'
export default function FieldTextValidate({ id, 
                                            className = '', 
                                            fieldName, 
                                            value,
                                            formValidate,
                                            validateMinChars = null, 
                                            validateMaxChars = null, 
                                            validateSpecialChars = null,    
                                            description = "",                            
                                            onFieldChange, 
                                            onFieldBlur }) {
    return (
        <>
            <input type="text" 
                id={id}
                className={`form-control ${className || ''}`}
                data-field={fieldName}                       
                data-field-min-length={validateMinChars}
                data-field-max-length={validateMaxChars}
                data-field-notspecialchar={validateSpecialChars ? !validateSpecialChars : null}
                value={value}
                onChange={onFieldChange}
                onBlur={onFieldBlur} />
            {formValidate.fields[`${fieldName}Field`].error && (
                <div className="error-msg padLeft5" 
                    dangerouslySetInnerHTML={{ __html : formValidate.fields[`${fieldName}Field`].errorMessage }}>
                </div>
            )}
            {description ? (
                <div className="description mtop10">
                    {description}
                </div>
            ) : null}
        </>
    )
}
