export function handleValidatePostTypeForm(formFields, formValidate) {
    const {namePostType, slugPostType, descriptionPostType, labelPostType, allPostsLabel, newPostLabel, taxLists} = formFields;
    formValidate.formValidate = (namePostType && slugPostType && descriptionPostType && labelPostType && allPostsLabel && newPostLabel);
    if ( formValidate.formValidate ) {
        taxLists.forEach(tax => {
            if ( formValidate.formValidate ) {
                formValidate.formValidate = formValidate.formValidate && tax.slug && tax.label;
            }
        });
    }
    return formValidate.formValidate;
}