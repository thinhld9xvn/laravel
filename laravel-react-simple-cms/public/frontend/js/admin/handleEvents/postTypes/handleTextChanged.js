import { handleConvertStrToSlug } from "utils/url/handleConvertStrToSlug";
import { cloneDeep } from 'lodash';
export function handleTextChanged(e) {
    const formFields = cloneDeep(this.state.formFields),
        currentTarget = e.currentTarget,
        field = currentTarget.dataset.field,
        value = currentTarget.value,
        slug = handleConvertStrToSlug(value);
    if (field === 'namePostType') {
        const taxSlug = 'dmuc-' + slug;
        formFields.slugPostType = slug;
        formFields.descriptionPostType = value;
        formFields.labelPostType = value;
        formFields.taxLists[0].id = taxSlug;
        formFields.taxLists[0].slug = taxSlug;
    }
    formFields[field] = value;
    this.setState({ formFields : cloneDeep(formFields) });
}