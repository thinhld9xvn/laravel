import React from 'react';
export default function TemplateTagItem({tag, handleRemoveTag}) {
    const {value, name} = tag;
    return (
        <span className="ReactTags__tag" data-id={value}>
            {name} 
            <a className="ReactTags__remove"
                onClick={handleRemoveTag}>x</a>
        </span>
    );
}
