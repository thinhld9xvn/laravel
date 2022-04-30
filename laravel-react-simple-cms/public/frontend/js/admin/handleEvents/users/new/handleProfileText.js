import { cloneDeep } from "lodash";

export function handleProfileText(e) {
    let formFields = cloneDeep(this.state.formFields),
        v = e.currentTarget.value,
        field = e.currentTarget.dataset.field;

    formFields[field] = v;
    this.setState({ formFields : cloneDeep(formFields) });
}