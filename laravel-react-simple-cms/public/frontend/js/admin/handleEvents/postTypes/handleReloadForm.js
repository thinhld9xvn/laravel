import * as _ from 'utils/libUtils';
import { cloneDeep } from 'lodash';
export function handleReloadForm(e) {
    if (e) e.preventDefault();
    const { _formFields, postTypeFormValidate } = this.state,
        formFields = cloneDeep(_formFields);
    _.mapObject(postTypeFormValidate.fields, function (e, i) {
        e.error = false;
        e.errorMessage = '';
    });
    postTypeFormValidate.formValidate = true;
    this.setState({
        formFields,
        postTypeFormValidate
    });
    _.scrollPageToTop();
}