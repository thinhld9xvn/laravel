import React from 'react'
import LabelRequired from 'templates/fields/labelRequired';
import FieldTextValidate from 'templates/fields/fieldTextValidate';
export default function MenuLayout({ formFields, postTypeFormValidate, events}) {
    const {allPostsLabel, newPostLabel} = formFields;
    const {onChange_handleTextChanged, handleFormValidation} = events;
  return (
    <>
        <div className="myTabContainer">
            <div className="mainHeader">
                <h4 className="headingTable" style={{marginTop: 20}}>Thiết lập menu con</h4>
            </div>
            <div className="mainContent postTypesLayoutContainer">
                <div className="inputBoxControl">
                    <LabelRequired className=""
                                    label="Nhãn 'Tất cả bài viết'"
                                    type="label" />
                    <div className="inputControl">
                        <FieldTextValidate id="txtAllPostsLabel"
                                            className = 'txtAllPostsLabel'
                                            fieldName = 'allPostsLabel'
                                            value = {allPostsLabel}
                                            description = "Nhãn 'Tất cả bài viết'"
                                            formValidate = {postTypeFormValidate}
                                            validateMaxChars = {50}                          
                                            onFieldChange = {onChange_handleTextChanged}
                                            onFieldBlur = {handleFormValidation} />
                    </div>
                </div>
                <div className="inputBoxControl">
                    <LabelRequired className=""
                                    label="Nhãn 'Đăng bài viết mới'"
                                    type="label" />
                    <div className="inputControl">
                        <FieldTextValidate id="txtNewPostLabel"
                                            className = 'txtNewPostLabel'
                                            fieldName = 'newPostLabel'
                                            value = {newPostLabel}
                                            description = "Nhãn 'Đăng bài viết mới'"
                                            formValidate = {postTypeFormValidate}
                                            validateMaxChars = {50}                          
                                            onFieldChange = {onChange_handleTextChanged}
                                            onFieldBlur = {handleFormValidation} />
                    </div>
                </div>
            </div>
            <div className="mainFooter"></div>
        </div>
    </>
  )
}
