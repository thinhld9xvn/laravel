export function handleChooseItem(v) {
    let {data} = this.state;        
    data.map(e => {
        if ( e['value'] == v ) {
            e['selected'] = ! e['selected'] ? true : e['selected']; 
        }
        else {
            if ( e['selected'] ) { e['selected'] = false; }
        } 
        return e;
    });
    this.setState({
        data : [...data]
    });
}