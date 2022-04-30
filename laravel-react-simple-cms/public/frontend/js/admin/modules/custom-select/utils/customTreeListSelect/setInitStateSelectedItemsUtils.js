export function setInitStateSelectedItems(data) {
    let itemSelected = null;
    const travselNodeElement = (item) => {
        if ( item.selected ) {                
            itemSelected = item;
        }
        if (item.childrens && item.childrens.length) {
            item.childrens.map(citem => travselNodeElement(citem));
        }
    }
    data.map((item, i) => {
        travselNodeElement(item);
    });   
    this.setState({
        defaultName : itemSelected ? itemSelected.name : '',
        defaultValue : itemSelected ? itemSelected.value : ''
    });
}