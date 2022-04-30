import React from 'react'
import CustomTreeListSelect from 'modules/custom-select/customTreeListSelect'
import {
    onClick_handleChooseAuthorFilter,
    onClick_handleChoosePostModifiedFilter,
    onClick_handleChooseCategoryFilter
} from 'handleEvents/postTypesHandleEvents';
import { postModifiedData } from 'modules/ap_type/components/sampleData';
export default function FilterHeadingBox({inst, toolbarData}) {
    const {categoriesList, showFilterCategoriesBox} = inst.state;
    return (
        <div className="fitlerBox">
            <div className="filterWrap">
                <div className="filterLabel">
                    Lọc theo tác giả:
                </div>
                <div className="filterContent mtop5">
                    <CustomTreeListSelect placeholder="--- Xin mời chọn một tác giả ---"
                                            parent={inst}
                                            componentInst = "authorFilterInst"
                                            variableReturn = "authorFilterSelected"
                                            data={toolbarData.activeUsersFilterList} 
                                            handleChooseItemCallback={onClick_handleChooseAuthorFilter}
                                            showSearch = {false}
                                            />
                </div>
            </div>
            <div className="filterWrap">
                <div className="filterLabel">
                    Lọc theo ngày đăng:
                </div>
                <div className="filterContent mtop5">
                    <CustomTreeListSelect placeholder="--- Xin mời chọn một ngày đăng ---"
                                            parent={inst}
                                            componentInst = "postModifiedFilterInst"
                                            variableReturn = "postModifiedFilterSelected"
                                            data={postModifiedData} 
                                            handleChooseItemCallback={onClick_handleChoosePostModifiedFilter}
                                            showSearch = {false}
                                            />
                </div>
            </div>
            {showFilterCategoriesBox ? (
                <div className="filterWrap">
                    <div className="filterLabel">
                        Lọc theo danh mục:
                    </div>
                    <div className="filterContent mtop5">
                        <CustomTreeListSelect placeholder="--- Xin mời chọn một danh mục ---"
                                            parent={inst}
                                            componentInst = "categoryFilterInst"
                                            variableReturn = "categoryFilterSelected"
                                            data={categoriesList} 
                                            handleChooseItemCallback={onClick_handleChooseCategoryFilter}
                                            showSearch = {false} />
                    </div>
                </div>
            ) : null}
            <div className="filterWrap">
                <button type="button" 
                        className="btn btn-primary btn-sm"
                        onClick={toolbarData.onClick_handleFilter}>
                    <span className="fa fa-filter"></span>
                </button>
                <button type="button" 
                        className="btn btn-default btn-sm"
                        onClick={toolbarData.onClick_clearFilter}>
                    <span className="fa fa-recycle"></span>
                </button>
            </div>
        </div>
    )
}
