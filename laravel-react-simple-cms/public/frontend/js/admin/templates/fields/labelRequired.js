import React from 'react'
export default function LabelRequired({ className, label, type = 'div' }) {
    return (
        <>
            {type === 'div' ? (
                <div className={className}>
                    {label}
                    <span className="required">(*)</span>
                </div>
            ) : null}
            {type === 'label' ? (
                <label className={className}>
                    {label}
                    <span className="required">(*)</span>
                </label>
            ) : null}
        </>
    )
}
