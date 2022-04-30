import React, { Component } from 'react';
import { handleFormValidation } from 'handleValidate/handleFormValidate';
import { onChange_handleTextChanged, onClick_addNewTax, onClick_removeTax } from 'handleEvents/postTypesHandleEvents';
import {addComponentInst} from 'utils/componentUtils';
import { COMPONENT_INST } from 'constants/componentConstants';
import { FORM_IDS } from 'constants/formConstants';
import { cloneDeep } from 'lodash';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import BasicLayout from './child-layout/basic-layout';
import MenuLayout from './child-layout/menu-layout';
import TaxLayout from './child-layout/tax-layout';
import PostLayout from './child-layout/post-layout';
class PostTypeModalLayout extends Component {
    constructor(props) {
        super(props);
        const formFields = {            
            id : '',
            namePostType: '',
            slugPostType: '',
            descriptionPostType: '',
            labelPostType : '',
            allPostsLabel : 'Tất cả bài viết',
            newPostLabel : 'Đăng bài viết mới',
            postNameLabel : 'Bài viết',
            publishPostLabel : 'Đăng bài',
            taxLists : [
                {
                    id : 'categories',
                    slug : 'categories',
                    label : 'Danh mục con'
                }
            ],
            status : 'public',
            template: null
        };
        const postTypeFormValidate = {
            errorMessages: {
                requiredError: "Trường này không được bỏ trắng",
                minLengthError: "Trường này phải có tối thiểu là {n} ký tự",
                maxLengthError: "Trường này có tối đa là {n} ký tự",
                requiredNotSpecialCharError: "Trường này chỉ chấp nhận chữ, số và (_)",
            },
            fields: {
                namePostTypeField: {
                    error: false,
                    errorMessage: ''
                },
                slugPostTypeField: {
                    error: false,
                    errorMessage: ''
                },
                descriptionPostTypeField: {
                    error: false,
                    errorMessage: ''
                },
                labelPostTypeField: {
                    error: false,
                    errorMessage: ''
                },
                allPostsLabelField: {
                    error: false,
                    errorMessage: ''
                }, 
                newPostLabelField: {
                    error: false,
                    errorMessage: ''
                },
                postNameLabelField : {
                    error: false,
                    errorMessage: ''
                },
                publishPostLabelField : {
                    error: false,
                    errorMessage: ''
                },
                taxListsField : {
                    error : false,
                    errorMessage : ''
                }
            },
            formValidate: true
        }
        this.state = {
            _postTypeFormValidate: cloneDeep(postTypeFormValidate),
            postTypeFormValidate: cloneDeep(postTypeFormValidate),
            formFields: cloneDeep(formFields),
            _formFields: cloneDeep(formFields),
            _tabActiveId : 'post-type-basic-st-tab',
            tabActiveId : 'post-type-basic-st-tab'
        };
    }
    componentDidMount() {
        addComponentInst({
            name : this.props.formid === FORM_IDS.NEW_POST_TYPE ? COMPONENT_INST.NEW_POST_TYPE_MODAL_LAYOUT : 
                                                                    COMPONENT_INST.EDIT_POST_TYPE_MODAL_LAYOUT,
            instance : this
        });
    }
    componentDidUpdate() {        
        addComponentInst({
            name : this.props.formid === FORM_IDS.NEW_POST_TYPE ? COMPONENT_INST.NEW_POST_TYPE_MODAL_LAYOUT : 
                                                                    COMPONENT_INST.EDIT_POST_TYPE_MODAL_LAYOUT,
            instance : this
        });  
    }
    handleChangeTab(k) {
        this.setState({ tabActiveId : k });
    }
    render() {
        const { formFields, postTypeFormValidate, tabActiveId } = this.state,
              { formid } = this.props;       
        return (            
            <div className="w100p">
                <form id={formid}
                    className={formid}
                    action=""
                    method="post">
                    <div className="tabLists w100p">
                        <Tabs activeKey={tabActiveId}
                                transition={false}
                                id="post-type-basic-st-tab"
                                onSelect={this.handleChangeTab.bind(this)}>
                            <Tab eventKey="post-type-basic-st-tab" title="Cơ bản">
                                <BasicLayout formFields = {formFields}
                                             postTypeFormValidate = {postTypeFormValidate}
                                             events = {{
                                                onChange_handleTextChanged : onChange_handleTextChanged.bind(this),
                                                handleFormValidation : handleFormValidation.bind(this, 'postTypeFormValidate')
                                             }} />
                            </Tab>
                            <Tab eventKey="post-type-menu-st-tab" title="Menu con">
                                <MenuLayout formFields = {formFields}
                                             postTypeFormValidate = {postTypeFormValidate}
                                             events = {{
                                                onChange_handleTextChanged : onChange_handleTextChanged.bind(this),
                                                handleFormValidation : handleFormValidation.bind(this, 'postTypeFormValidate')
                                             }} />
                            </Tab>
                            <Tab eventKey="post-type-post-st-tab" title="Bài viết">
                                <PostLayout  formFields = {formFields}
                                             postTypeFormValidate = {postTypeFormValidate}
                                             events = {{
                                                onChange_handleTextChanged : onChange_handleTextChanged.bind(this),
                                                handleFormValidation : handleFormValidation.bind(this, 'postTypeFormValidate')
                                             }} />
                            </Tab>
                            <Tab eventKey="post-type-tax-st-tab" title="Danh mục">
                                <TaxLayout formFields = {formFields}
                                            postTypeFormValidate = {postTypeFormValidate}
                                            inst = {this}
                                            events = {{
                                                onChange_handleTextChanged : onChange_handleTextChanged.bind(this),
                                                handleFormValidation : handleFormValidation.bind(this, 'postTypeFormValidate'),
                                                onClick_addNewTax : onClick_addNewTax.bind(this),
                                                onClick_removeTax : onClick_removeTax.bind(this)
                                            }}  />
                            </Tab>
                        </Tabs>
                    </div>                    
                </form>
            </div>
        );
    }
}
export default PostTypeModalLayout;