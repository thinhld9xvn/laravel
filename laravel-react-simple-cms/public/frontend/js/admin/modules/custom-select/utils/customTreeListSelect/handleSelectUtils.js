import { handleChooseItem } from "./handleChooseItemUtils";
import { handleCloseSelectList } from "./handleCloseSelectListUtils";

export function handleSelect(value, name, e) {
    e.preventDefault();
    let {defaultValue : default_value, defaultName : default_name} = this.state;
    if ( typeof( name ) !== 'undefined' && name !== '' ) {
        default_name = name;
    }
    if ( typeof( value ) !== 'undefined' && value !== '' ) {
        default_value = value;
    }      
    handleChooseItem.call(this, default_value);
    this.setState(prevState => ({
        defaultValue: default_value,
        defaultName: default_name
    }));
    if ( this.props.parent && this.props.variableReturn ) {            
        this.props.parent[this.props.variableReturn] = default_value;
    }       
    if ( this.props.handleChooseItemCallback ) {
        this.props.handleChooseItemCallback(default_name, default_value);
    }
    handleCloseSelectList.call(this);
}