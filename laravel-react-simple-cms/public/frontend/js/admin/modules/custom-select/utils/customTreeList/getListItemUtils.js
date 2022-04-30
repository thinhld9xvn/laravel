import React from 'react'
import { handleSavePos } from '../customTreeListView/handleSavePosUtils';
import { handleSelect } from './handleSelectUtils';
import { handleToggleChild } from './handleToggleChildUtils';
export function getListItem(item, index) {
    const {coordsNodesList} = this.state,
            temp_subitems = item.childrens ? item.childrens.map(getListItem.bind(this)) :
                                            null;
    let name = item.name,
        key = this.state.searchText;
    if ( item.isSearchedResult && key ) {            
        let pos = name.toLowerCase().indexOf(key.toLowerCase());
        while ( pos !== -1 ) {
            const s = name.substr(pos, key.length);
            name = name.substr(0, pos) + "<s>" + s + "</s>" + name.substr(pos + key.length);
            pos = name.indexOf(key, pos + 1 + 7);
        }
        name = name.replace('<s>', '<strong>')
                    .replace('</s>', '</strong>');
    }
    //
    let coordsNode = null;
    coordsNodesList.map(node => { 
        if ( node.value === item.value ) {
            coordsNode = node;
            return;
        }
        else {
            node.extras && node.extras.map(extra => {
                if ( extra.value === item.value ) {
                    coordsNode = extra;
                    return;
                }
            });
        }
    });
    if ( coordsNode ) {
        const coordsNodeSelected = coordsNode.selected,
                coordsNodePending = coordsNode.pending;
        item.selected = item.selected || coordsNodeSelected;
        item.pending = item.pending || coordsNodePending;
    } 
    let checkbox = '';
    if ( item.selected ) {
        checkbox = 'checked';
    }
    else {
        if ( item.pending ) {
            checkbox = 'dotted';
        }
    }
    return (
        <li
            key={index}
            onClick={handleSavePos.bind(this)}
            className='select-item'>
            <a href="#"
                className={item['selected'] ? 'selected' : ''}
                onClick={handleSelect.bind(this, item.value)}>
                <span className={"checkbox ".concat(checkbox)}></span>
                <span dangerouslySetInnerHTML={{__html: name}}></span>
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
    )
}