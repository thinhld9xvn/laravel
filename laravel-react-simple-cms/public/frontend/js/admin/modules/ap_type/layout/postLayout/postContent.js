import React, {Component} from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { isEqual } from 'lodash';
import { TINYMCE_SRC_PATH } from 'constants/UrlConstants';
class PostContent extends Component {
    constructor(props) {
        super(props);
        const {editorContent, tinyMCEAPI, events} = this.props;
        this.state = {
            editorContent,
            tinyMCEAPI,
            events
        };
    }
    componentDidUpdate() {
        const {editorContent : editorContentState} = this.state;
        const {editorContent} = this.props;
        if ( !isEqual(editorContent, editorContentState) ) {
            this.setState({
                editorContent
            });
        }
    }
    render() {
        const {editorContent, events} = this.state;
        const {onClick_showMediaDialog,
                onChange_handleEditorChanged} = events;
        return (
            <div className="post_content mtop20">
                <div className="mediaButton">
                    <button className="btn btn-sm btn-default"
                            onClick={onClick_showMediaDialog}>
                        <span className="fa fa-film"></span>
                        <span className="padLeft5">Thư viện ảnh</span>
                    </button>
                </div>
                <div className="tinymceEditor mtop10">
                    <Editor 
                        value={editorContent}
                        tinymceScriptSrc={`${TINYMCE_SRC_PATH}`}
                        init={{
                            height: 400,
                            menubar: true,
                            plugins: [
                                'advlist autolink lists link image charmap print preview anchor',
                                'searchreplace visualblocks code fullscreen',
                                'insertdatetime media table paste code help wordcount'
                            ],
                            toolbar:
                                'undo redo | formatselect | bold italic backcolor | \
                                    alignleft aligncenter alignright alignjustify | \
                                    bullist numlist outdent indent | image | removeformat | code',
                        }}
                        onEditorChange={onChange_handleEditorChanged}
                    />
                </div>
            </div>
        )
    }
}
export default PostContent;