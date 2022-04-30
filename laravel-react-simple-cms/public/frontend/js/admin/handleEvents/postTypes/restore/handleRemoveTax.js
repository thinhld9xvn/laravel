import {cloneDeep} from 'lodash'
export function handleRemoveTax(id) {
    const formFields = cloneDeep(this.state.formFields);
    formFields.taxLists.splice(id, 1);
    this.setState({
        formFields : cloneDeep(formFields)
    });
}