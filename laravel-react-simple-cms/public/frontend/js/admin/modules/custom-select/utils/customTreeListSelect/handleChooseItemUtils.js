export function handleChooseItem(v) {
    const {data} = this.state,
        chooseItemCallback = (e) => {
            if ( e['value'].toString() === v.toString() ) {
                e['selected'] = true; 
            }
            else {
                e['selected'] = false;
            } 
            if ( e['childrens'] && e['childrens'].length > 0 ) {
                e['childrens'].map(chooseItemCallback);
            }
            return e;
        }   
    data.map(chooseItemCallback);
    this.setState({
        data : [...data]
    });
}