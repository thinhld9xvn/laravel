export function handleConvertCategoriesListPostData(cat) {
    if ( cat.extras ) {
        delete cat.extras;
    }
    if ( cat.childrens && cat.childrens.length ) {
        cat.childrens.map(c => handleConvertCategoriesListPostData(c));
    }
}