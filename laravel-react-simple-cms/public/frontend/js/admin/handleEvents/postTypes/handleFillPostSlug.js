import { convertStrToSlug } from "utils/urlUtils";
import {cloneDeep} from 'lodash'
export function handleFillPostSlug(e) {
    const {formFields} = this.state;
    const {post_title, post_url} = formFields;
    if ( !post_url ) {
        formFields.post_url = convertStrToSlug(post_title);
        this.setState({
            formFields : cloneDeep(formFields)
        })
    }    
}