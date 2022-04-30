export function handleGetItemSelectedIndex() {
    const {data} = this.state;
    let index = -1,
        found = false;
    const travselItemIndex = (item) => {            
        if ( found ) return;     
        index++;
        if (item.selected) {
            found = true;
        }
        if (item.childrens && item.childrens.length) {
            item.childrens.map((citem) => travselItemIndex(citem));
        }
    }
    data.map((item) => travselItemIndex(item));
    if ( found ) return index;
    return -1;
}