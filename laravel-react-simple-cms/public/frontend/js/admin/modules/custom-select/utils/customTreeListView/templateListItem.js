import React, {useEffect, useState} from 'react';
import { handleDragOver } from './handleDragOverUtils';
import { handleDblClickSelect } from './handleDblClickSelectUtils';
import { handleDragEnd } from './handleDragEndUtils';
import { handleDragStart } from './handleDragStartUtils';
import { handleDrop } from './handleDropUtils';
import { handleParentDrop } from './handleParentDropUtils';
import { handleSavePos } from './handleSavePosUtils';
import { handleSelect } from './handleSelectUtils';
import { handleToggleChild } from './handleToggleChildUtils';
import { handleCaptureItem } from './handleCaptureItemUtils';
import { handleLeaveCaptureItem } from './handleLeaveCaptureItemUtils';
import { isUndefined } from 'utils/libUtils';
export default function TemplateListItem({inst, item, index, showCheckboxes, draggable}) {   
    const [checked, setChecked] = useState(isUndefined(item.checked) ? false : item.checked);
    const temp_subitems = item.childrens ?
                                item.childrens.map((e, i) => <TemplateListItem key = {e.value}
                                                                               inst = {inst}
                                                                               item = {e}
                                                                              index = {i}
                                                                               showCheckboxes = {showCheckboxes}
                                                                               draggable = {draggable} />) : null;        
    const showCheckboxesProps = parseInt(item.value) === 0 ? false : showCheckboxes;
    useEffect(() => {
        setChecked(isUndefined(item.checked) ? false : item.checked); 
    }, [item]);
        return (
            <li
                key={item.value}                      
                onClick={handleSavePos.bind(inst)}          
                className='select-item'
                onDrop={draggable ? handleParentDrop.bind(inst) : null}
                onDragOver={draggable ?  handleDragOver.bind(inst) : null}>
                <a href="#" 
                    id={"tree-node-" + item.value}
                    data-value={item.value}
                    className={item['selected'] ? 'selected' : ''}
                    onClick={handleSelect.bind(inst, item.value, item.name, {checked, setChecked})}
                    onDoubleClick={handleDblClickSelect.bind(inst, item.value, item.name)}
                    draggable={draggable}
                    onDragStart={draggable ? handleDragStart.bind(inst) : null}
                    onDragEnd={draggable ? handleDragEnd.bind(inst) : null}
                    onDrop={draggable ? handleDrop.bind(inst) : null}
                    onDragOver={draggable ? handleDragOver.bind(inst) : null}
                    onDragEnterCapture={draggable ? handleCaptureItem.bind(inst) : null}
                    onDragLeaveCapture={draggable ? handleLeaveCaptureItem.bind(inst) : null}>
                    {showCheckboxesProps ? (
                        <input type="checkbox" className="form-control" checked={checked} readOnly={true} />
                    ) : null}
                    <span className={showCheckboxesProps ? "padLeft5" : ""} dangerouslySetInnerHTML={{
                        __html : item.name
                    }}></span>
                </a>                
                {item.childrens && 
                    <span className="expand -minimize"
                          onClick={handleToggleChild.bind(inst)}></span>}
                {item.childrens && (
                    <ul className="active">
                        {temp_subitems}
                    </ul>
                )}
            </li>
        )
}