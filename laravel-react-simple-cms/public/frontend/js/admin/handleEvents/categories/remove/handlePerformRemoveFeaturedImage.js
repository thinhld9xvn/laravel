import { cloneDeep } from 'lodash';
export function handlePerformRemoveFeaturedImage() {
    const {formFields} = this.state;
    formFields.thumbnail = '';
    this.setState({
        formFields : cloneDeep(formFields)
    })
}