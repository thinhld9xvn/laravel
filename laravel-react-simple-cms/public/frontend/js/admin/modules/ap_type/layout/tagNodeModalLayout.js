import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addComponentInst } from 'utils/componentUtils';
import { onChange_handleCatEditorTextField, onChange_handleCatTextField } from 'handleEvents/categoriesHandleEvents'
import {handleFormValidation} from 'handleValidate/handleFormValidate';
import { cloneDeep, isEqual } from 'lodash';
import { Editor } from '@tinymce/tinymce-react';
import { TINYMCE_API } from 'constants/tinyMCEApi';
import { TINYMCE_SRC_PATH } from 'constants/UrlConstants';
const ACTION_TYPES = {
    NEW : 'new',
    EDIT : 'edit'
}
class TagNodeModalLayout extends Component {
    constructor(props) {
        super(props);
        const formValidateData = {
            errorMessages : {
                requiredError : "Trường này không được bỏ trắng"                   
            },
            fields : {
                nameField : {
                    error : false,
                    errorMessage : ''
                },
                urlField : {
                    error : false,
                    errorMessage : ''
                }                    
            },
            formValidate : true
        };
        const formFields = {
            id : 0,
            name : '',
            url : '',
            description : ''
        };
        this.state = {
            instName: props.name,
            form_id : props.id,
            modal_id : props.modal_id,
            action : props.action,
            tagNodeFormValidate : cloneDeep(formValidateData),
            _tagNodeFormValidate : cloneDeep(formValidateData),
            tagsData : [],
            tagNodeActive : null,
            formFields : cloneDeep(formFields),
            _formFields : cloneDeep(formFields),
            editorContent : '',
            changed : false // trạng thái dữ liệu đã thay đổi
        }
    }
    componentDidMount() {
        const { activeTagsLists, activeTagNode } = this.props;
        this.setState({
            tagsData : cloneDeep(activeTagsLists),
            tagNodeActive : cloneDeep(activeTagNode)
        });
    }
    componentDidUpdate(nextProps, nextState) {
        const { activeTagsLists, activeTagNode } = this.props;   
        if ( !isEqual(activeTagsLists, nextProps.activeTagsLists) ) {
            this.setState({
                tagsData : cloneDeep(activeTagsLists)
            });
        }
        if ( !isEqual(activeTagNode, nextProps.activeTagNode) ) {
            this.setState({
                tagNodeActive : cloneDeep(activeTagNode)
            });
        }
        addComponentInst({
            name: this.state.instName,
            instance: this
        });
    }
    componentWillUnmount() {
    }
    render() {   
        const { formFields, form_id, action, tagNodeFormValidate } = this.state;
        return( 
            <>
                <div>                    
                    <form id={form_id} method="post" action="" className="">
                        <div className="mainHeader"></div>
                        <div className="mainContent">
                            {action === ACTION_TYPES.EDIT && (
                                <div className="inputBoxControl">
                                    <label>ID</label>
                                    <div className="inputControl">
                                        <input type="text" 
                                                id="txtActiveTagId" 
                                                name="txtActiveTagId" 
                                                className="form-control" 
                                                value={formFields.id}
                                                readOnly={true} /></div>
                                </div>
                            )}
                            <div className="inputBoxControl">
                                <label>Tên thẻ <span className="required">(*)</span></label>
                                <div className="inputControl"  arial-groupbox="true">
                                    <input type="text" 
                                            id="txtActivename" 
                                            name="txtActivename" 
                                            className="form-control" 
                                            value={formFields.name}
                                            data-field="name"
                                            onChange={onChange_handleCatTextField.bind(this)} 
                                            onBlur={handleFormValidation.bind(this, 'tagNodeFormValidate')} />
                                    {tagNodeFormValidate.fields.nameField.error ?
                                        <div className="error-msg"
                                            dangerouslySetInnerHTML = {{ __html : tagNodeFormValidate.fields.nameField.errorMessage }}>
                                        </div> : 
                                        null}
                                </div>
                            </div>
                            <div className="inputBoxControl">
                                <label>Đường dẫn <span className="required">(*)</span></label>
                                <div className="inputControl" arial-groupbox="true">
                                    <input type="text" 
                                            id="txtActiveTagUrl" 
                                            name="txtActiveTagUrl" 
                                            className="form-control" 
                                            data-field="url"
                                            onChange={onChange_handleCatTextField.bind(this)}
                                            onBlur={handleFormValidation.bind(this, 'tagNodeFormValidate')}
                                            value={formFields.url} />
                                    {tagNodeFormValidate.fields.urlField.error ?
                                        <div className="error-msg"
                                            dangerouslySetInnerHTML = {{ __html : tagNodeFormValidate.fields.urlField.errorMessage }}>
                                        </div> : 
                                        null}
                                </div>
                            </div>
                            <div className="inputBoxControl">
                                <label>Mô tả</label>
                                <div className="inputControl">
                                    <Editor 
                                        tinymceScriptSrc={`${TINYMCE_SRC_PATH}`}
                                        value={formFields.description}
                                        init={{
                                            height: 200,
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
                                        onEditorChange={onChange_handleCatEditorTextField.bind(this, 'description')}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="mainFooter"></div>
                    </form>
                </div>            
            </>
        )
    }
}
const mapStateToProps = state => {
    return {
        activeTagsLists : state.tagReducer.activeTagsLists,
        originalActiveTagNode : state.tagReducer.originalActiveTagNode,
        activeTagNode : state.tagReducer.activeTagNode
    }
}
const mapDispatchToProps = dispatch => {
    return {
        updateActiveTagNode : (payload) => {
            dispatch({
                reducer : 'tagReducer',
                type : "UPDATE_ACTIVE_TAG_NODE",
                payload : payload
            });
        },
        updateActiveTagsLists : (payload) => {
            dispatch({
                reducer : 'tagReducer',
                type : "UPDATE_ACTIVE_TAGS_LISTS",
                payload : payload
            });
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(TagNodeModalLayout);