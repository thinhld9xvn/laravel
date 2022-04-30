import React, { Component } from 'react';
import { TINYMCE_API } from 'constants/tinyMCEApi';
import { onChange_handleEditorChanged, 
         onClick_showPostCategoryModal,
         onClick_showMediaDialog,
         onClick_removeFeaturedImage, 
         onChange_handlePostField,
         onClick_handleChoosePostCategoryItem,
         onClick_handlePublishPost,
         onBlur_handleFillPostSlug,
         onClick_handleUpdatePost} from 'handleEvents/postTypesHandleEvents';
import { addComponentInst } from 'utils/componentUtils';
import PostTitle from './postLayout/postTitle'
import PostSlug from './postLayout/postSlug'
import PostContent from './postLayout/postContent'
import PostExcerpt from './postLayout/postExcerpt'
import PostUpdate from './postLayout/postUpdate'
import PostCategory from './postLayout/postCategory'
import PostTags from './postLayout/postTags'
import PostFeaturedImage from './postLayout/postFeaturedImage'
import { cloneDeep, isEqual } from 'lodash';
import { MEDIA_MODAL_COMMAND, POST_ACTIONS, POST_STATUS } from 'constants/globalConstants';
import {handleFormValidation} from 'handleValidate/handleFormValidate';
import { initializePostLayout } from 'utils/postTypesUtils';
import { isUndefined } from 'utils/libUtils';
import { withRouter } from 'react-router-dom';
import { handleChoosePostAuthor } from 'handleEvents/postTypes/handleChoosePostAuthor';
import { getClientUserInfo } from 'utils/membershipUtils';
import { MODAL_IDS } from 'constants/modalConstants';
import { FORM_IDS } from 'constants/formConstants';
class PostLayout extends Component {
    constructor(props) {
        super(props);
        const post_date = {
            date : '', 
            day : '',
            month : '',
            year : '',
            time : '',
            dateTimeLocale : ''
        };
        const formValidateData = {
            errorMessages : {
                requiredError : "Trường này không được bỏ trắng"                   
            },
            fields : {
                post_titleField : {
                    error : false,
                    errorMessage : ''
                }    
            },
            formValidate : true
        };
        const formFields = {
            id : 0,
            guid : 0,
            post_title : '',
            post_url : '',
            post_content : '',
            post_excerpt : '',
            post_thumbnail : {
                src : '',
                pathname : '',
                alt : ''
            },
            post_categories : null,
            post_tags : null,
            post_date : cloneDeep(post_date),
            post_modified_date : cloneDeep(post_date),
            post_author : (getClientUserInfo()).guid,
            post_status : POST_STATUS.draft
        };
        this.state = {
            formid : props.formid || FORM_IDS.EDIT_POST,
            instName: props.name,
            refTimerAttachDomOptionCustom : null,
            refTimerAttachDomTags : null,
            categoriesList: [],
            formFields : cloneDeep(!isUndefined(props.formFields) ? props.formFields : formFields),
            _formFields : cloneDeep(!isUndefined(props.formFields) ? props.formFields : formFields),
            __formFields : cloneDeep(formFields),
            postFormValidate : cloneDeep(formValidateData),
            _postFormValidate : cloneDeep(formValidateData),
            showFormCategory: false,
            showPostCategoriesBox : !isUndefined(props.showPostCategoriesBox) ? props.showPostCategoriesBox : true,
            showPostTagsBox : !isUndefined(props.showPostTagsBox) ? props.showPostTagsBox : true,
            tagsListChosen : [],
            _authorsList : [],
            authorsList : [],
            dateTimeInt : cloneDeep(post_date),
            post_type : 'post',
            action : props.action,
            embbed : !isUndefined(props.embbed) ? props.embbed : false,
            embbedPostId : null
        }
        this.chooseCategoriesList = [];
        this.categoryItemSelected = null;
        this.authorPostsInst = null;
        this.authorPostSelected = null;
    }
    async componentDidMount() { 
        const {embbed} = this.state;
        !embbed && (await initializePostLayout.call(this));
    }
    componentDidUpdate() {
        const {showPostCategoriesBox, showPostTagsBox} = this.props;
        const {showPostCategoriesBox : showPostCategoriesBoxState, showPostTagsBox : showPostTagsBoxState, categoriesList} = this.state;
        const formFields = cloneDeep(this.state.formFields);
        addComponentInst({
            name: this.state.instName,
            instance: this
        });
        if ( showPostCategoriesBox && !isEqual(showPostCategoriesBox, showPostCategoriesBoxState) ) {
            this.setState({
                showPostCategoriesBox
            });
        }
        if ( showPostTagsBox && !isEqual(showPostTagsBox, showPostTagsBoxState) ) {
            this.setState({
                showPostTagsBox
            });
        }
    }
    componentWillUnmount() {
        this.state.refTimerAttachDomOptionCustom &&
            clearInterval(this.state.refTimerAttachDomOptionCustom);
        this.state.refTimerAttachDomTags &&
            clearInterval(this.state.refTimerAttachDomTags);
    }
    render() {
        const {postFormValidate, categoriesList, tagsListChosen, showFormCategory, formFields, dateTimeInt, formid, showPostCategoriesBox, showPostTagsBox, action, authorsList, post_type} = this.state;
        const {post_title, post_url, post_content, post_excerpt, post_thumbnail, post_date, post_modified_date, post_categories, post_status} = formFields;
        
        return (
            <>
                <div className="myTabContainer postLayoutContainer">
                    <form id={formid} method="post" className="postUpdateForm">
                        <div className="mainContent">
                            <div className="panelMainBox">                            
                                <div className="panelLeft">
                                    <PostTitle  value = {post_title}
                                                fieldname = "post_title"
                                                formValidate = {postFormValidate}
                                                events = {{
                                                    handleFormValidation : handleFormValidation.bind(this, 'postFormValidate'),
                                                    handlePostField : onChange_handlePostField.bind(this)
                                                }}  />
                                    <PostSlug   value = {post_url}
                                                fieldname = "post_url"
                                                events = {{
                                                    handlePostField : onChange_handlePostField.bind(this),
                                                    handleBlurPostSlug : onBlur_handleFillPostSlug.bind(this)
                                                }} />
                                    <PostContent tinyMCEAPI = {TINYMCE_API}                                             
                                                editorContent = {post_content}
                                                events={{
                                                    onClick_showMediaDialog: onClick_showMediaDialog.bind(this, MEDIA_MODAL_COMMAND.insertAttachment),
                                                    onChange_handleEditorChanged : onChange_handleEditorChanged.bind(this)
                                                }} />
                                    <PostExcerpt value = {post_excerpt}
                                                fieldname = "post_excerpt"
                                                events = {{
                                                    handlePostField : onChange_handlePostField.bind(this)
                                                }} />
                                </div>
                                <div className="panelRight">
                                    <PostUpdate parent = {this}
                                                post_status = {post_status}
                                                dateTimeInt = {dateTimeInt}
                                                authorsList = {authorsList}
                                                handleChoosePostAuthor = {handleChoosePostAuthor}
                                                post_date = {post_date}
                                                post_modified_date = {post_modified_date}
                                                events = {{
                                                    handlePublishPost : action === POST_ACTIONS.new ? onClick_handlePublishPost.bind(this) : 
                                                                                                        onClick_handleUpdatePost.bind(this)
                                                }}
                                                action = {action} />
                                    {showPostCategoriesBox ? (
                                        <PostCategory   inst = {this}
                                                        events = {{
                                                            onClick_showPostCategoryModal : onClick_showPostCategoryModal.bind(this),
                                                            handleChooseItemCallback : onClick_handleChoosePostCategoryItem.bind(this)
                                                        }}
                                                        data = {{
                                                            post_type,
                                                            categoriesList,
                                                            showFormCategory
                                                        }}
                                                    />
                                    ) : null}
                                    {showPostTagsBox ? (
                                        <PostTags tagsList = {tagsListChosen} />
                                    ) : null}
                                    <PostFeaturedImage post_thumbnail = {post_thumbnail}
                                                        events = {{
                                                            onClick_removeFeaturedImage : onClick_removeFeaturedImage.bind(this),
                                                            onClick_showMediaDialog : onClick_showMediaDialog.bind(this, MEDIA_MODAL_COMMAND.attachFeaturedImage),
                                                        }} />
                                </div>                                                        
                            </div>
                        </div>
                    </form>
                </div>                             
            </>
        );
    }
}
const mapStateToProps = state => {
    return {
        sidebarMenuItems : state.sidebarMenuReducer.menuItems
    }
}
const mapDispatchToProps = dispatch => {
    return {
        updateSidebarMenu : (info) => {
            dispatch({
                reducer : 'sidebarMenuReducer',
                type : "UPDATE_SIDEBAR_MENU",            
                payload : info
            });        
        },
        updateNavBrandName : (name) => {
            dispatch({
                reducer : 'navbarInfoReducer',
                type : "UPDATE_BRAND_NAME",            
                name : name
            });
        },
    }
}
export default withRouter(PostLayout);