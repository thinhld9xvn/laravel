import React from 'react'

export default function FieldUrlValidate({ id, 
                                            className = '', 
                                            fieldName, 
                                            value,
                                            formValidate,                          
                                            onFieldChange, 
                                            onFieldBlur }) {

    return (
        <>
            <input type="text" 
                id={id}
                className={`form-control ${className}`}
                data-field={fieldName}   
                data-validation-type="url"
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
