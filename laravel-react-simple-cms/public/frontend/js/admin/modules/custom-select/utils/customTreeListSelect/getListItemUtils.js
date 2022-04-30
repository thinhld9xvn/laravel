import React from 'react';
import { isUndefined } from "utils/libUtils";
import { handleSavePos } from './handleSavePosUtils';
import { handleSelect } from './handleSelectUtils';
import { handleToggleChild } from './handleToggleChildUtils';

export function getListItem(item, index) {
    const temp_subitems = item.childrens ?
                        item.childrens.map(getListItem.bind(this)) :
                        null;
    const name = item.name.replace(/<\/?[^>]+(>|$)/g, "");
    return (
        <React.Fragment key={index}>
            {isUndefined(item.visible) || 
                item.visible ? (
                <li onClick={handleSavePos.bind(this)}          
                    className="select-item">
                    <a href="#" 
                        className={item['selected'] ? 'selected' : ''}
                        onClick={handleSelect.bind(this, item.value, item.name)}>
                        {name}
                    </a>
                    {item.childrens && 
                        <span className="expand -minimize"
                            onClick={handleToggleChild.bind(this)}></span>}
                    {item.childrens && (
                        <ul className="active">
                            {temp_subitems}
                        </ul>
                    )}
                </li>
            ) : null}
        </React.Fragment>
    )
}