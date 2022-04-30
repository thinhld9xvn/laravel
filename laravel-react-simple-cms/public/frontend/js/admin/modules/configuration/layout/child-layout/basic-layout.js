import React from 'react'
import LabelRequired from 'templates/fields/labelRequired';
import FieldTextValidate from 'templates/fields/fieldTextValidate';
export default function BasicLayout({formFields, postTypeFormValidate, events}) {
    const {namePostType, slugPostType, labelPostType, descriptionPostType} = formFields;
    const {onChange_handleTextChanged, handleFormValidation} = events;
  return (
      <>
        <div className="myTabContainer">
            <div className="mainHeader">
                <h4 className="headingTable" style={{marginTop: 20}}>Thiết lập cơ bản</h4>
            </div>
            <div className="mainContent postTypesLayoutContainer">
                <div className="inputBoxControl">
                    <LabelRequired className=""
                                    label="Tên loại bài viết"
                                    type="label" />
                    <div className="inputControl">
                        <FieldTextValidate id="txtNamePostType"
                                            className = 'txtNamePostType'
                                            fieldName = 'namePostType'
                                            value = {namePostType}
                                            description = "Tên loại bài viết sẽ hiển thị ở trên thanh menu bên trái màn hình"
                                            formValidate = {postTypeFormValidate}
                                            validateMaxChars = {50}                          
                                            onFieldChange = {onChange_handleTextChanged}
                                            onFieldBlur = {handleFormValidation} />
                    </div>
                </div>
                <div className="inputBoxControl">
                    <LabelRequired className=""
                                    label="Slug"
                                    type="label" />
                    <div className="inputControl">
                        <FieldTextValidate id="txtSlugPostType"
                                            className = 'txtSlugPostType'
                                            fieldName = 'slugPostType'
                                            value = {slugPostType}
                                            description = "Slug của loại bài viết"
                                            formValidate = {postTypeFormValidate}
                                            validateMaxChars = {50}                          
                                            onFieldChange = {onChange_handleTextChanged}
                                            onFieldBlur = {handleFormValidation} />
                    </div>
                </div>
                <div className="inputBoxControl">
                    <LabelRequired className=""
                                    label="Nhãn loại bài viết"
                                    type="label" />
                    <div className="inputControl">
                        <FieldTextValidate id="txtLabelPostType"
                                            className = 'txtLabelPostType'
                                            fieldName = 'labelPostType'
                                            value = {labelPostType}
                                            description = "Label của loại bài viết"
                                            formValidate = {postTypeFormValidate}
                                            validateMaxChars = {50}                          
                                            onFieldChange = {onChange_handleTextChanged}
                                            onFieldBlur = {handleFormValidation} />
                    </div>
                </div>
                <div className="inputBoxControl">
                    <LabelRequired className=""
                                    label="Mô tả"
                                    type="label" />
                    <div className="inputControl">
                        <FieldTextValidate id="txtDescriptionPostType"
                                            className = 'txtDescriptionPostType'
                                            fieldName = 'descriptionPostType'
                                            value = {descriptionPostType}
                                            description = "Vài dòng mô tả về loại bài viết này"
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
