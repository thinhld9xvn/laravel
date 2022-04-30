import { handleChooseItem } from "./handleChooseItemUtils";
export function handleSelect(value, e) {
    e.preventDefault();           
    const {handleChooseItemCallback} = this.props;  
    handleChooseItem.call(this, value);       
    if (handleChooseItemCallback) {
        setTimeout(() => {
            handleChooseItemCallback.call(this, value);
        }, 200);
    }
}