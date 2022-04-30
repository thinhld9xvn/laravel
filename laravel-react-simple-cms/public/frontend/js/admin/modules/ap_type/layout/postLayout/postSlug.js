import React from 'react';
export default function PostSlug({ value, fieldname, events }) {
    const {handlePostField, handleBlurPostSlug} = events;
  return (
      <>
        <div className="post_slug">
            <div className="slug">
                <label>Đường dẫn<span className="required">(*)</span> : </label>
                <span className="padLeft5">{window.location.origin.concat('/')}</span>
                <input type="text"
                        className="form-control" 
                        data-field={fieldname}
                        value={value}
                        onBlur={handleBlurPostSlug}
                        onChange={handlePostField} />
                <span>.html</span>
            </div>
            <div className="view">
                <button type="button" className="btn btn-danger btn-sm">
                    <span className="fa fa-eye"></span>
                    <span className="padLeft5">Xem bài viết</span>
                </button>
            </div>
        </div>
    </>
  );
}
