import { cloneDeep } from "lodash";
export function handleTxtSearchUserNameChanged(e) {
    const keyCode = e.keyCode || e.which;
    const v = this.keywords;
    const data = cloneDeep(this.state.data);    
    if ( keyCode === 13 ) {
        const filteredItems = data.filter(user => user.username.toLowerCase().includes( v.toLowerCase() ));
        this.setState({
            filteredItems : cloneDeep(filteredItems)
        });
    }        
}