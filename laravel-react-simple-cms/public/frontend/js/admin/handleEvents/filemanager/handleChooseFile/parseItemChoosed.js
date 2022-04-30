export function parseItemChoosed(data) {
    const {item_choosed, isCtrlPressed, items_selected} = data;
    // chưa chọn
    if ( ! item_choosed.active ) {
        item_choosed.active = true;
    }
    // đã chọn từ trước rồi
    else {     
        if ( isCtrlPressed ) {
            item_choosed.active = false;
        }
    }
    if ( item_choosed.active ) {
        items_selected.push( item_choosed );
    }
    return items_selected;
}