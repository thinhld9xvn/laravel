import { handleSelect } from "./handleSelectUtils";
export function handleDblClickSelect(value, name, e) {
    const {handleDblChooseItemCallback} = this.props;
    handleSelect.call(this, value, name, {}, e);
    let default_value = this.state.defaultValue;
    if ( handleDblChooseItemCallback ) {
        setTimeout(() => {
            handleDblChooseItemCallback(default_value);
        }, 200);
    }
}