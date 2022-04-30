import { cloneDeep } from "lodash";

export function handleFieldChanged(e) {
    let {userPassword} = this.state,
        v = e.currentTarget.value,
        field = e.currentTarget.dataset.field;
    userPassword[field] = v; 
    this.setState({userPassword : cloneDeep(userPassword)}); 
}