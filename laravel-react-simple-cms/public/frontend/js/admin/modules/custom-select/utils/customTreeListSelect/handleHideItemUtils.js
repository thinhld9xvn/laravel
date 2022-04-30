import { cloneDeep } from "lodash";
export function handleHideItem(v) {
    let data = cloneDeep(this.state.data),
        chooseItemCallback = (e) => {
            if ( e['value'].toString() === v.toString() ) {                    
                e['visible'] = false; 
            }
            else {
                if ( typeof(e['visible']) !== 'undefined' ) {
                    delete e['visible'];
                }
            } 
            if ( e['childrens'] && e['childrens'].length > 0 ) {
                e['childrens'].map(chooseItemCallback);
            }
            return e;
        }   
    data.map(node => chooseItemCallback(node));
    this.setState({
        data : cloneDeep(data)
    });
}