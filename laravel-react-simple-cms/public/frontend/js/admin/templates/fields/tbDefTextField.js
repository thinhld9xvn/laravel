import React from 'react'
export default function TBDefTextField({ className = '', placeholder = '', onFieldKeyDown = null, onChanged = null }) {
    return (
        <input type="text" 
                className={`form-control ${className}`}
                placeholder={placeholder}
                onKeyDown={onFieldKeyDown}
                onChange={onChanged} />
    )
}
