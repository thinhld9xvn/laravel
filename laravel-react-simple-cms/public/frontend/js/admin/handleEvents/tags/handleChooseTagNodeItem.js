import { EMPTY_PARENT_CATEGORY } from 'constants/categoryConstants';
import { cloneDeep } from 'lodash';
import { setCheckedTagNode, setSelectedTagNode, todoSearchTagNode } from 'utils/tagPostTypesUtils';
export function handleChooseTagNodeItem(v, n, props) {
    const { tagsData, showCheckboxes } = this.state;
    if ( showCheckboxes ) {
        const _tagsData = cloneDeep(tagsData);
        const {checked, setChecked} = props;
        if ( setChecked && v !== EMPTY_PARENT_CATEGORY.value ) {
            const newChecked = !checked;
            const myList = this.tagsChosen;
            const index = myList.findIndex(e => parseInt(e.value) === parseInt(v));
            if ( newChecked && index === -1 ) { 
                myList.push({ name : n,
                              value : v });
            }
            else {
                myList.splice(index, 1);
            }
            setChecked(newChecked);
            setCheckedTagNode(_tagsData, myList);
            setSelectedTagNode(_tagsData, v);
            this.setState({ tagsData : cloneDeep(_tagsData),
                            originTagsData : cloneDeep(_tagsData) });
        }
    }
    const resultNode = todoSearchTagNode(tagsData, v);
    this.props.updateActiveTagNode(resultNode ? cloneDeep(resultNode) : null);
    this.setState({ tagNodeSelectedValue : v });
}