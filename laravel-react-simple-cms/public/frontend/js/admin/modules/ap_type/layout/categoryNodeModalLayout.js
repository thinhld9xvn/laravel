import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addComponentInst } from 'utils/componentUtils';
import CustomTreeListSelect from '../../custom-select/customTreeListSelect';
import { attachDomFixedPosBelowListenerInPopbox } from 'utils/domUtils'
import { setSelectedCategoryNode, renderTreeDataSelect } from 'utils/categoryPostTypesUtils'
import { onChange_handleCatEditorTextField, onChange_handleCatTextField, 
            onClick_removeMediaEmbbedModal, 
            onClick_showMediaEmbbedModal } from 'handleEvents/categoriesHandleEvents'
import {handleFormValidation} from 'handleValidate/handleFormValidate';
import noImageThumbnail from 'images/no-image-thumbnail.jpg';
import { cloneDeep, isEqual } from 'lodash';
import { Editor } from '@tinymce/tinymce-react';
import { TINYMCE_SRC_PATH } from 'constants/UrlConstants';
const ACTION_TYPES = {
    NEW : 'new',
    EDIT : 'edit'
}
class CategoryNodeModalLayout extends Component {
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
            description : '',
            parent : '',
            thumbnail : ''
        };
        this.state = {
            instName: props.name,
            form_id : props.id,
            modal_id : props.modal_id,
            timerRef : null,
            action : props.action,
            categoryNodeFormValidate : cloneDeep(formValidateData),
            _categoryNodeFormValidate : cloneDeep(formValidateData),
            categoriesData : [],
            categoryNodeActive : null,
            formFields : cloneDeep(formFields),
            _formFields : cloneDeep(formFields),
            editorContent : '',
            changed : false // trạng thái dữ liệu đã thay đổi
        }
        this.categoryNodeSelectInst = null;
        this.selectedParentCat = '';
    }
    componentDidMount() {
        //console.log(this.props.activeCategoryNode);
        const { activeCategoriesLists, activeCategoryNode } = this.props;
        this.setState({
            categoriesData : cloneDeep(activeCategoriesLists),
            categoryNodeActive : cloneDeep(activeCategoryNode)
        });
        const t = attachDomFixedPosBelowListenerInPopbox('.categoryNodeModal.opened.visible .option-custom .select-input', 
                                                         '.categoryNodeModal.opened.visible .option-custom .select-list.custom-tree-list-select',
                                                         function() {
                                                            const selectElem = document.querySelector('.categoryNodeModal.opened.visible .option-custom .select-list.custom-tree-list-select');
                                                            const container = document.querySelector('.categoryNodeModal.opened.visible .popbox_container > .text');
                                                            if ( container ) {
                                                                if (selectElem.classList.contains('open') ) {
                                                                    container.style.overflow = 'hidden';
                                                                }
                                                                else {
                                                                    container.style.overflow = '';
                                                                }
                                                            }
                                                         });
        this.setState({ 
            timerRef : t
        });
    }
    componentDidUpdate(nextProps, nextState) {
        const { activeCategoriesLists, activeCategoryNode } = this.props;   
        if ( !isEqual(activeCategoriesLists, nextProps.activeCategoriesLists) ) {
            this.setState({
                categoriesData : cloneDeep(activeCategoriesLists)
            });
        }
        if ( !isEqual(activeCategoryNode, nextProps.activeCategoryNode) ) {
            this.setState({
                categoryNodeActive : cloneDeep(activeCategoryNode)
            });
        }
        addComponentInst({
            name: this.state.instName,
            instance: this
        });
    }
    componentWillUnmount() {
        clearInterval(this.state.timerRef);
    }
    render() {   
        const { formFields, categoriesData, categoryNodeActive, form_id, action, categoryNodeFormValidate } = this.state;
        //const { activeCategoriesLists, activeCategoryNode } = this.props;
        let sourceCategoriesData = cloneDeep(categoriesData);
        if ( categoryNodeActive ) {
            sourceCategoriesData = renderTreeDataSelect(sourceCategoriesData);
            setSelectedCategoryNode(sourceCategoriesData, categoryNodeActive.parent);
        }
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
                                                id="txtActiveCatId" 
                                                name="txtActiveCatId" 
                                                className="form-control" 
                                                value={formFields.id}
                                                readOnly={true} /></div>
                                </div>
                            )}
                            <div className="inputBoxControl">
                                <label>Tên danh mục <span className="required">(*)</span></label>
                                <div className="inputControl"  arial-groupbox="true">
                                    <input type="text" 
                                            id="txtActivename" 
                                            name="txtActivename" 
                                            className="form-control" 
                                            value={formFields.name}
                                            data-field="name"
                                            onChange={onChange_handleCatTextField.bind(this)} 
                                            onBlur={handleFormValidation.bind(this, 'categoryNodeFormValidate')} />
                                    {categoryNodeFormValidate.fields.nameField.error ?
                                        <div className="error-msg"
                                            dangerouslySetInnerHTML = {{ __html : categoryNodeFormValidate.fields.nameField.errorMessage }}>
                                        </div> : 
                                        null}
                                </div>
                            </div>
                            <div className="inputBoxControl">
                                <label>Đường dẫn <span className="required">(*)</span></label>
                                <div className="inputControl" arial-groupbox="true">
                                    <input type="text" 
                                            id="txtActiveCatUrl" 
                                            name="txtActiveCatUrl" 
                                            className="form-control" 
                                            data-field="url"
                                            onChange={onChange_handleCatTextField.bind(this)}
                                            onBlur={handleFormValidation.bind(this, 'categoryNodeFormValidate')}
                                            value={formFields.url} />
                                    {categoryNodeFormValidate.fields.urlField.error ?
                                        <div className="error-msg"
                                            dangerouslySetInnerHTML = {{ __html : categoryNodeFormValidate.fields.urlField.errorMessage }}>
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
                            <div className="inputBoxControl">
                                <label>Danh mục cha</label>
                                <div className="inputControl">
                                    <CustomTreeListSelect placeholder="--- Mời chọn một mục ---"
                                                    data={sourceCategoriesData}
                                                    parent={this}
                                                    componentInst="categoryNodeSelectInst"
                                                    variableReturn="selectedParentCat" />   
                                </div>
                            </div>
                            <div className="inputBoxControl">
                                <label>Ảnh đại diện</label>
                                <div className="inputControl flex-layout flex-align-center">
                                    <img src={formFields.thumbnail ? formFields.thumbnail : noImageThumbnail} alt="" width="80" />
                                    <div className="featuredImageSectionMetaTool padLeft10">
                                        {formFields.thumbnail ? (
                                            <a href="#"
                                                onClick={onClick_removeMediaEmbbedModal.bind(this)}>
                                                <span className="fa fa-close"></span>
                                                <span className="padLeft5">Xóa ảnh đại diện</span>
                                            </a>
                                        ) : null}
                                        <a href="#"
                                            onClick={onClick_showMediaEmbbedModal.bind(this)}>
                                            <span className="fa fa-edit"></span>
                                            <span className="padLeft5">Thay đổi ảnh đại diện</span>
                                        </a>
                                    </div>
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
        activeCategoriesLists : state.categoryReducer.activeCategoriesLists,
        originalActiveCategoryNode : state.categoryReducer.originalActiveCategoryNode,
        activeCategoryNode : state.categoryReducer.activeCategoryNode
    }
}
const mapDispatchToProps = dispatch => {
    return {
        updateActiveCategoryNode : (payload) => {
            dispatch({
                reducer : 'categoryReducer',
                type : "UPDATE_ACTIVE_CATEGORY_NODE",
                payload : payload
            });
        },
        updateActiveCategoriesLists : (payload) => {
            dispatch({
                reducer : 'categoryReducer',
                type : "UPDATE_ACTIVE_CATEGORIES_LISTS",
                payload : payload
            });
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CategoryNodeModalLayout);