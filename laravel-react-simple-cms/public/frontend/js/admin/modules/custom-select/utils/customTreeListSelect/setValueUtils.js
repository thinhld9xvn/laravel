import { handleChooseItem } from "./handleChooseItemUtils";
export function setValue(n, v) {    
    handleChooseItem.call(this, v);
    this.setState({
        defaultValue: v,
        defaultName: n
    });     
    if ( this.props.parent && this.props.variableReturn ) {        
        this.props.parent[this.props.variableReturn] = v;  
    }
}