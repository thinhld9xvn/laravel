import React from 'react'

export default function FieldNumberValidate({ id, 
                                            className = '', 
                                            fieldName, 
                                            value,
                                            min,
                                            max,
                                            step,
                                            formValidate,                                                                 
                                            onFieldChange, 
                                            onFieldBlur }) {

    return (
        <>
            <input type="number" 
                    id={id} 
                    className={`form-control ${className}`}
                    min={min} max={max} step={step} 
                    data-field={fieldName}
                    onChange={onFieldChange}
                    onBlur={onFieldBlur}
                    value={value} />

            {formValidate.fields[`${fieldName}Field`].error && (

                <div className="error-msg padLeft5" 
                    dangerouslySetInnerHTML={{ __html : formValidate.fields[`${fieldName}Field`].errorMessage }}>
                </div>

            )}
        </>
    )
}
