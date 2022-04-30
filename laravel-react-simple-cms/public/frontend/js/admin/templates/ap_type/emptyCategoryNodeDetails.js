import React from 'react'
import { onClick_handleOpenModalCategoryNodeItem } from 'handleEvents/categoriesHandleEvents'
import NodeButton from '../buttons/nodeButton'
export default function EmptyCategoryNodeDetails({ inst, 
                                                    msg = "Chưa có danh mục nào được chọn.",
                                                    handleButtonClick = null }) {
    return (
        <>
            <div className="mtop20">
                <p>{msg}</p>
            </div>
            <div className="mtop20">
                <NodeButton type="primary"  
                            size="sm"                              
                            label="Tạo mới"
                            fontAwesomeIcon="fa-plus"
                            onButtonClick={handleButtonClick ? handleButtonClick.bind(inst) : onClick_handleOpenModalCategoryNodeItem.bind(inst)} />
            </div>
        </>
    )
}
