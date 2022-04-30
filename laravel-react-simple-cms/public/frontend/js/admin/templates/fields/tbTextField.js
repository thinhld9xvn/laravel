import React from 'react'
export default function TBTextField({ className = '', placeholder = '', value = '', onFieldKeyDown = null, onChanged = null }) {
    return (
        <input type="text" 
                className={`form-control ${className}`}
                value={value}
                placeholder={placeholder}
                onKeyDown={onFieldKeyDown}
                onChange={onChanged} />
    )
}
