import {cloneDeep} from 'lodash'
export function handleAddNewTax() {
    const formFields = cloneDeep(this.state.formFields);
    formFields.taxLists.push({
        id : '',
        slug : '',
        label : ''
    });
    this.setState({
        formFields : cloneDeep(formFields)
    })
}