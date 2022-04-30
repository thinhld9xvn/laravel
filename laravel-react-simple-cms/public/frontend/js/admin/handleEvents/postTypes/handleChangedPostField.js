import {cloneDeep} from 'lodash'
import { convertStrToSlug } from 'utils/urlUtils';
export function handleChangedPostField(e) {
    const {formFields} = this.state,
        v = e.currentTarget.value,
        field = e.currentTarget.dataset.field;  
    if ( field === 'post_title' ) {
        formFields.post_url = convertStrToSlug(v);
    }
    formFields[field] = v;
    this.setState({
        formFields : cloneDeep(formFields)
    })
}