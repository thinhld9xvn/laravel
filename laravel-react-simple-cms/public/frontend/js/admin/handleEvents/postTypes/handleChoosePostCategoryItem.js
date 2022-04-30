import { cloneDeep } from 'lodash';
export function handleChoosePostCategoryItem(value) {
    const chosenCategoriesList = this.chooseCategoriesList;
    const {formFields} = this.state;
    formFields.post_categories = cloneDeep(chosenCategoriesList);
    this.setState({
        formFields : cloneDeep(formFields)
    })
}