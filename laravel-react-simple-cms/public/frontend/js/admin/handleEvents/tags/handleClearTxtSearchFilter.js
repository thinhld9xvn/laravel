import { cloneDeep } from 'lodash';
import { setDeSelectTagNode } from 'utils/tagPostTypesUtils';
export function handleClearTxtSearchFilter() {
    const {updateActiveTagNode} = this.props;
    const {originTagsData, s} = this.state;
    if ( !s ) return;
    updateActiveTagNode(null);
    setDeSelectTagNode(originTagsData);
    this.setState({ s : '', 
                    tagsData :  cloneDeep(originTagsData) });
}