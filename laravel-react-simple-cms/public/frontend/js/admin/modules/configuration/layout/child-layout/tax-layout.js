import React from 'react'
import TemplateTaxEntry from '../components/template-tax-entry';
export default function TaxLayout({ inst, formFields, postTypeFormValidate, events }) {
    const {taxLists} = formFields;
    const {onClick_addNewTax, onClick_removeTax} = events;
    const arrTaxLists = taxLists.map((tax, i) => <TemplateTaxEntry data = {tax} 
                                                                    index = {i} 
                                                                    props={{inst, formFields, postTypeFormValidate, onClick_removeTax}} />);
  return (
    <>
        <div className="myTabContainer">
            <div className="mainHeader">
                <h4 className="headingTable" style={{marginTop: 20}}>Thiết lập danh mục</h4>
            </div>
            <div className="mainContent postTypesLayoutContainer">
                <a className="btn btn-sm btn-primary btnCreateTax" href="#"
                    onClick={onClick_addNewTax}>
                    <span className="fa fa-plus"></span>
                    <span className="padLeft10">Tạo danh mục</span>
                </a>
                <div className="tax-lists mtop20">
                    <div className="tax-tree-lists">
                        {arrTaxLists}
                    </div>
                </div>
            </div>
            <div className="mainFooter"></div>
        </div>
    </>
  )
}
