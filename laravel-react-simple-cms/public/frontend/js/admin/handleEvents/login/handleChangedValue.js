export function handleChangedValue(e) {
    const v = e.currentTarget.value,          
          fieldName = e.currentTarget.dataset.fieldname,
          formFields = this.state.formFields;
    formFields[fieldName] = v;
    this.setState({
        formFields : formFields
    });
}