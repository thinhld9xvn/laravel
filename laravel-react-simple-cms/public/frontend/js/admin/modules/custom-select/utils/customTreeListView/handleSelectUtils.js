import { handleChooseItem } from "./handleChooseItemUtils";
export function handleSelect(value, name, props, e) {
    e.preventDefault();
    const {parent, variableReturn, handleChooseItemCallback} = this.props;
    const {checked, setChecked} = props;
    let { defaultValue : default_value, defaultName : default_name } = this.state;
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
    if ( parent && variableReturn ) {            
        parent[variableReturn] = default_value;
    }    
    if ( handleChooseItemCallback ) {
        handleChooseItemCallback(default_value, default_name, {checked, setChecked});
    }
}