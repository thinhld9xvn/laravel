import { parseItemChoosed } from "./handleChooseFile/parseItemChoosed";
import { parseItemsOther } from "./handleChooseFile/parseItemsOther";
import { cloneDeep } from 'lodash';
export function handleChooseFile(evt) { 
    let isCtrlPressed = evt.ctrlKey,
        button = evt.button,
        keyitem = evt.currentTarget.dataset.keyItem,
        {temp_files_list} = this.state,
        toolbar = this.state.toolbar,
        items_other = [],
        item_choosed = null,
        items_selected = [];
        if ( document.fileManagerCExtraSettings && 
                document.fileManagerCExtraSettings.chooseSingleFile ) {
            temp_files_list.map(e => {
                if ( keyitem == e.name && ! e.uploading ) {
                    e.active = true;
                    items_selected.push(e);
                }
                else {
                    if ( e.active ) e.active = false;
                }
            });
        }
        else {
            temp_files_list.map(e => {
                if ( keyitem == e.name && ! e.uploading ) {
                    item_choosed = e;
                }
                else {
                    items_other.push( e );
                }
            });
            items_selected = parseItemsOther({item_choosed, items_other, button, isCtrlPressed, items_selected});
            items_selected = parseItemChoosed({item_choosed, isCtrlPressed, items_selected});  
        }
    let selected_length = items_selected.length,
        tb_infoFile = toolbar.file.filter(e => e['navigation'] == 'info file')[0],
        tb_removeFile = toolbar.file.filter(e => e['navigation'] === 'trash file')[0];
    if ( selected_length > 0 ) { 
        if ( selected_length == 1 ) {
            // enable toolbar
            if ( tb_infoFile.disabled ) {
                tb_infoFile.disabled = false;
            }
        }
        
        // disable toolbar
        else tb_infoFile.disabled = true;
        if ( tb_removeFile.disabled ) tb_removeFile.disabled = false;
    }
    else {
        if ( ! tb_infoFile.disabled ) tb_infoFile.disabled = true;
        if ( ! tb_removeFile.disabled ) tb_removeFile.disabled = true;
    }
    this.setState({      
        temp_files_list : cloneDeep(temp_files_list),  
        toolbar : toolbar,
        showIToolbar : true
    });
    
}