import React, {useState} from 'react'
import LabelRequired from 'templates/fields/labelRequired';
import {cloneDeep} from 'lodash';
export default function TemplateTaxEntry({ data, index, props }) {
    const [errorMessage, setErrorMessage] = useState('Trường này không được bỏ trắng');
    const [errorSlug, setErrorSlug] = useState(false);    
    const [errorLabel, setErrorLabel] = useState(false);
    const {slug, label} = data;
    const {inst, formFields, postTypeFormValidate, onClick_removeTax} = props;
    const handleBlur = (e) => {
        e.preventDefault();
        const {taxListsField} = postTypeFormValidate.fields;
        setErrorSlug(!slug);
        setErrorLabel(!label);
        taxListsField.error = taxListsField.error && (!slug || !label);
        taxListsField.errorMessage = errorMessage;
        postTypeFormValidate.formValidate = postTypeFormValidate.formValidate && taxListsField.error;
        inst.setState({
            postTypeFormValidate : cloneDeep(postTypeFormValidate)
        })
    }
    const handleChanged = (e) => {
        e.preventDefault();
        const name = e.currentTarget.dataset['fieldName'];
        const taxLists = cloneDeep(formFields.taxLists);
        taxLists[index][name] = e.currentTarget.value;
        if (name === 'slug' ) {
            taxLists[index]['id'] = e.currentTarget.value;
        }
        inst.setState({
            formFields : cloneDeep({...formFields, taxLists})
        });
    }
    return (
        <div className="tax-entry">
            <div className="tax-heading">Danh mục con</div>
            <div className="tax-wrap">
                <div className="inputBoxControl">
                    <LabelRequired className=""
                                    label="Slug danh mục"
                                    type="label" />
                    <div className="inputControl">
                        <input type="text" 
                                className="form-control"
                                value={slug}
                                onBlur={handleBlur}
                                onChange={handleChanged}
                                data-field-name="slug" />
                        {errorSlug && (
                            <div className="error-msg padLeft5" 
                                dangerouslySetInnerHTML={{ __html : errorMessage }}>
                            </div>
                        )}
                    </div>                                    
                </div>
                <div className="inputBoxControl">
                    <LabelRequired className=""
                                    label="Nhãn danh mục"
                                    type="label" />
                    <div className="inputControl">
                        <input type="text" 
                                className="form-control"
                                value={label}
                                onBlur={handleBlur}
                                onChange={handleChanged}
                                data-field-name="label" />
                        {errorLabel && (
                            <div className="error-msg padLeft5" 
                                dangerouslySetInnerHTML={{ __html : errorMessage }}>
                            </div>
                        )}
                    </div>                        
                </div>
            </div>
            {index > 0 ? (
                <a className="remove"
                    href="#"
                    onClick={e => onClick_removeTax(index, e)}>
                    <span className="fa fa-close"></span>
                </a>
            ) : null}
        </div>
    )
}
