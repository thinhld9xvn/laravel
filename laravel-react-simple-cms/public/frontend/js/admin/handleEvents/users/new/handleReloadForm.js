import * as _ from 'utils/libUtils';
import { cloneDeep } from "lodash";
export function handleReloadForm() {
    const { _formFields, newUserProfileFormValidate } = this.state,
          formFields = cloneDeep( _formFields ); 
    _.mapObject(newUserProfileFormValidate.fields, function(e, i) {
        e.error = false;
        e.errorMessage = '';
    });
    newUserProfileFormValidate.formValidate = true;
    this.setState({
        formFields,
        newUserProfileFormValidate
    }); 
    _.scrollPageToTop();   
}