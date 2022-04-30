import { handleChooseItem } from "./handleChooseItemUtils";
export function handleSelect(value, name, e) {
    e.preventDefault();
    let target = e.currentTarget,
        {defaultValue : default_value, defaultName : default_name, scrollTop, isOpen} = this.state,
        {parent, variableReturn} = this.props,
        offsetTop = target.offsetTop > 0 ? target.offsetTop : scrollTop;
    if ( name ) {
        default_name = name;
    }
    if ( value ) {
        default_value = value;
    }
    if (! isOpen) {
    } 
    else {
        handleChooseItem.call(this, default_value);
    }
    this.setState(prevState => ({
        isOpen: ! prevState.isOpen,
        defaultValue: default_value,
        defaultName: default_name,
        scrollTop : offsetTop
    }));
    if ( parent && variableReturn ) {
        this.props.parent[variableReturn] = default_value;            
    }
}