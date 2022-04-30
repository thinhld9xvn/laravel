import React from 'react'

export default function TableHeading({ heading = '' }) {
    return (
        <h4 className="headingTable">
            {heading}
        </h4>
    )
}
