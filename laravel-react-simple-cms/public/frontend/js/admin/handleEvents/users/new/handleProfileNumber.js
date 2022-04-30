import { cloneDeep } from "lodash";
export function handleProfileNumber(e) {
    let formFields = cloneDeep(this.state.formFields),
        v = e.currentTarget.value,
        field = e.currentTarget.dataset.field;
    formFields[field] = parseInt( v ); 
    this.setState({ formFields : cloneDeep(formFields) });
}