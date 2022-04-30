import {cloneDeep} from 'lodash';
export function handleEditorChanged(content) {
    const {formFields} = this.state;
    const contents = content.replace(new RegExp("data-reactroot=\"\"", "i"), "");
    formFields.post_content = contents;
    this.setState({
        editorContent : contents,
        formFields : cloneDeep(formFields)
    });
}