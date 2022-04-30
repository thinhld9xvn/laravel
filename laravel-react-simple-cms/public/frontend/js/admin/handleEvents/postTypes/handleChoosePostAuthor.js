import { getPostLayoutInst } from "utils/postTypesUtils";
import { cloneDeep } from 'lodash';

export function handleChoosePostAuthor(n, v) {
    const inst = getPostLayoutInst();
    const formFields = cloneDeep(inst.state.formFields);
    inst.setState({
        formFields : {...formFields, post_author: v}
    });
}