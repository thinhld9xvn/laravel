import {cloneDeep} from 'lodash'
export function handleSortTagsByList(tagsData, listTagsData) {
    const tagsChosen = [];
    tagsData.map(value => {
        const tag = listTagsData.find(_tag => parseInt(_tag.value) === parseInt(value) );
        if ( tag ) {
            tagsChosen.push(cloneDeep(tag));
        }
    });
    return tagsChosen;
}