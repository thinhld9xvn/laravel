import React from 'react'
import LabelRequired from 'templates/fields/labelRequired';
import FieldTextValidate from 'templates/fields/fieldTextValidate';
export default function PostLayout({formFields, postTypeFormValidate, events}) {
    const {postNameLabel, publishPostLabel} = formFields;
    const {onChange_handleTextChanged, handleFormValidation} = events;
  return (
      <>
        <div className="myTabContainer">
            <div className="mainHeader">
                <h4 className="headingTable" style={{marginTop: 20}}>Thiết lập bài viết</h4>
            </div>
            <div className="mainContent postTypesLayoutContainer">
                <div className="inputBoxControl">
                    <LabelRequired className=""
                                    label="Nhãn 'bài viết'"
                                    type="label" />
                    <div className="inputControl">
                        <FieldTextValidate id="txtPostNameLabel"
                                            className = 'txtPostNameLabel'
                                            fieldName = 'postNameLabel'
                                            value = {postNameLabel}
                                            description = "Nhãn 'bài viết'"
                                            formValidate = {postTypeFormValidate}
                                            validateMaxChars = {50}                          
                                            onFieldChange = {onChange_handleTextChanged}
                                            onFieldBlur = {handleFormValidation} />
                    </div>
                </div>
                <div className="inputBoxControl">
                    <LabelRequired className=""
                                    label="Nhãn 'Đăng bài'"
                                    type="label" />
                    <div className="inputControl">
                        <FieldTextValidate id="txtPublishPostLabel"
                                            className = 'txtPublishPostLabel'
                                            fieldName = 'publishPostLabel'
                                            value = {publishPostLabel}
                                            description = "Nhãn 'Đăng bài'"
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
