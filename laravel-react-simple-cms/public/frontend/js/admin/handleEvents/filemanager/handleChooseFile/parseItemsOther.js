const MOUSE_BUTTON_RIGHT = 2;
export function parseItemsOther(params) {
    const {item_choosed, items_other, button, isCtrlPressed, items_selected} = params;
    items_other.map(e => {
        // giữ nguyên trạng thái
        if (  item_choosed.active && button == MOUSE_BUTTON_RIGHT ) {}
        else {
            // giữ nguyên trạng thái
            if ( isCtrlPressed ) {}
            // hủy chọn nếu ko giữ phím ctrl
            else {
                e.active = false;
            }
        }
        if ( e.active ) {
            items_selected.push( e );
        }
        return e;          
    });
    return items_selected;
}