import React from 'react'
export default function PostExcerpt({ value, fieldname, events }) {
    const {handlePostField} = events;
  return (
    <div className="post_excerpt mtop20">
        <div className="widget-box">
            <div className="widget-title">
                Mô tả ngắn cho bài viết
            </div>
            <div className="widget-content">
                <div className="widget-box-content">
                    <textarea name="txtPostExcerpt"
                        className="form-control"
                        rows={5}
                        value={value}
                        data-field={fieldname}
                        onChange={handlePostField}></textarea>
                </div>
            </div>
        </div>
    </div>
  )
}
