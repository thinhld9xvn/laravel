import * as _ from 'utils/libUtils';
export function handleDisableContextMenu() {
    let {FCONTEXT_MENU_STAT : context_menu} = this.state;
    // hide context menu
    _.mapObject(context_menu, (item, i) => {
        if ( item.show ) {
            item.show = false;
        }
    });   
    this.setState({ FCONTEXT_MENU_STAT : context_menu });
}