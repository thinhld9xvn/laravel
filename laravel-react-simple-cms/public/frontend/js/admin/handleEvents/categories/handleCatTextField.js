import { convertStrToSlug } from "utils/urlUtils";
import { cloneDeep } from 'lodash';
export function handleCatTextField(e) {
    let formFields = cloneDeep(this.state.formFields),
        v = e.currentTarget.value,
        field = e.currentTarget.dataset.field;
    formFields[field] = v; 
    if ( field === 'name' ) {
        formFields.url = convertStrToSlug(v);
    }
    this.setState({ formFields : cloneDeep(formFields) });
}