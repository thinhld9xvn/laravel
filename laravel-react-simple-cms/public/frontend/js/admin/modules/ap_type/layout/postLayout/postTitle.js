import React from 'react';
export default function PostTitle({ value, fieldname, formValidate, events }) {
    const {handleFormValidation, handlePostField} = events;
    const fn = fieldname + 'Field';
    return (
        <div className="post_title">
            <label>Tên bài viết <span className="required">(*)</span></label>
            <input type="text" 
                    className="form-control" 
                    data-field={fieldname}
                    value={value}
                    onChange={handlePostField}
                    onBlur={handleFormValidation} />
            {formValidate.fields[fn].error ?
                <div className="error-msg"
                     dangerouslySetInnerHTML = {{ __html : formValidate.fields[fn].errorMessage }}>
                </div> : 
                null}
        </div>
    )
}
