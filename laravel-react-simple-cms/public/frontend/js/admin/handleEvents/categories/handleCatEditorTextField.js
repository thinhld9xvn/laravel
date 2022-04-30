import { cloneDeep } from 'lodash';
export function handleCatEditorTextField(name, content, e) {
    var contents = content.replace(new RegExp("data-reactroot=\"\"", "i"), "");
    let formFields = cloneDeep(this.state.formFields);
    formFields[name] = contents; 
    this.setState({ formFields : cloneDeep(formFields) });
}