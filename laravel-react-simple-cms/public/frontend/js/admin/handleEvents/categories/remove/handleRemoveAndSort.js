import { EMPTY_PARENT_CATEGORY } from 'constants/categoryConstants'
import { cloneDeep } from 'lodash';
import {todoSearchCategoryNode, setSelectedCategoryNode} from "utils/categoryPostTypesUtils";
export function handleRemoveAndSort(params) {
    const {categoriesData, id, pointerNextFlag, 
                updateActiveCategoryNode, updateActiveCategoriesLists} = params;
    let data = cloneDeep(categoriesData);
    const resultNode = todoSearchCategoryNode(data, id, true, true); // đối tượng cần xóa
    const parentNode = todoSearchCategoryNode(data, resultNode.extras.parent, true, true);
    // di chuyển toàn bộ phần tử con của đối tượng sang node cha của đối tượng rồi xóa đối tượng
    if ( parentNode ) {
        if ( resultNode.childrens ) {
            if ( typeof(parentNode.childrens) === 'undefined' ) {
                parentNode.childrens = [];
            }
            resultNode.childrens = resultNode.childrens.map(e => {
                e.extras.parent = parentNode.extras.id;
                return e;
            });
            parentNode.childrens = parentNode.childrens.concat(resultNode.childrens);
        }
        // xóa phần tử 
        const index = parentNode.childrens.findIndex(n => n.value.toString() === id.toString());
        if ( index !== -1 ) {
            parentNode.childrens.splice(index, 1);
        }   
        // trỏ đến phần tử kế tiếp
        if ( pointerNextFlag ) {
            if ( parentNode.childrens.length ) {
                const node = parentNode.childrens[0];
                setSelectedCategoryNode(data, node.value);
                updateActiveCategoryNode(cloneDeep(node.extras));
                this.setState({ 
                    categoryNodeSelectedValue : node.value
                });
            }
            else {
                setSelectedCategoryNode(data, parentNode.value);
                updateActiveCategoryNode(cloneDeep(parentNode.extras));
                this.setState({ 
                    categoryNodeSelectedValue : parentNode.value
                });
            }          
        } 
        // xoá thuộc tính childrens của parent node
        if ( parentNode.childrens.length === 0 ) {
            delete parentNode.childrens;
        }
    }
    else {
        if ( resultNode.childrens ) {
            data = data.concat(resultNode.childrens);
        }
        // 
        const index = data.findIndex(n => n.value.toString() === id.toString());
        if ( index !== -1 ) {
            data.splice(index, 1);
        }
        if ( pointerNextFlag ) {
            // trỏ đến phần tử kế tiếp
            if ( data.length ) {
                const node = data[0];
                setSelectedCategoryNode(data, node.value);
                updateActiveCategoryNode(cloneDeep(node.extras));
                this.setState({ 
                    categoryNodeSelectedValue : node.value 
                });
            }
            else {
                updateActiveCategoryNode(null);
                this.setState({ 
                    categoryNodeSelectedValue : EMPTY_PARENT_CATEGORY.value
                }); 
            }
        }
    } 
    if ( updateActiveCategoriesLists ) {
        updateActiveCategoriesLists(cloneDeep(data));
    }
    else {
        this.setState({ categoriesData : cloneDeep(data) });
    }
}