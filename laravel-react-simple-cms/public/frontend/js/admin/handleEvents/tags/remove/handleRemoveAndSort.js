import { EMPTY_PARENT_CATEGORY } from 'constants/categoryConstants'
import { cloneDeep } from 'lodash';
import { setCheckedTagNode, setSelectedTagNode } from "utils/tagPostTypesUtils";
export function handleRemoveAndSort(params) {
    const {tagsData, id, pointerNextFlag, 
                updateActiveTagNode, updateActiveTagsLists} = params;
    let data = cloneDeep(tagsData);
    const index = data.findIndex(n => n.value.toString() === id.toString());
    if ( index !== -1 ) {
        data.splice(index, 1);
    }
    if ( this.tagsChosen && this.tagsChosen.length ) {
        const index = this.tagsChosen.findIndex(tag => parseInt(tag.value) === parseInt(id));
        if ( index !== -1 ) {
            this.tagsChosen.splice(index, 1);
            setCheckedTagNode(data, this.tagsChosen);
        }
    }
    if ( pointerNextFlag ) {
        // trỏ đến phần tử kế tiếp
        if ( data.length ) {
            const node = data[0];
            setSelectedTagNode(data, node.value);
            updateActiveTagNode(cloneDeep(node.extras));
            this.setState({ 
                tagNodeSelectedValue : node.value 
            });
        }
        else {
            updateActiveTagNode(null);
            this.setState({ 
                tagNodeSelectedValue : EMPTY_PARENT_CATEGORY.value
            }); 
        }
    }
    if ( updateActiveTagsLists ) {
        updateActiveTagsLists(cloneDeep(data));   
    }
    else {
        this.setState({ tagsData : cloneDeep(data) });
    }
}