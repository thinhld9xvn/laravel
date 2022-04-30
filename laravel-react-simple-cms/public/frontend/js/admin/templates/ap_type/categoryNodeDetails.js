import React from 'react'
import { onClick_handleEditCategoryNodeItem,
            onClick_handleRemoveCategoryNodeItem,
                onClick_handleOpenModalCategoryNodeItem } from 'handleEvents/categoriesHandleEvents'
import NodeButton from '../buttons/nodeButton'
const NodeEmptyField = <span>{"<Trống>"}</span>
const NodeField = ({ label, value, className = "", type = null, html = false }) => {
    let nodeResults = null;
    if ( type && type.dataType === 'image' ) {     
        nodeResults = value ? (
                                <span>
                                    <img src={value} width={type.width} alt={type.alt} />
                                </span>
                            ) : NodeEmptyField
    }
    else {
        if ( html ) {
            nodeResults = value ? (
                                    <span dangerouslySetInnerHTML={{
                                        __html : value
                                    }}></span>
                                ) : NodeEmptyField
        }
        else {
            nodeResults = value ? <span>{value}</span> : 
                                    NodeEmptyField
        }

    }
    return (
        <div className={"node-field ".concat(className)}>
            <span><strong>{label}: </strong></span>
            {nodeResults}
        </div>
    )
}
const NodeFieldContainer = ({ className = "", children }) => {
    return (
        <div className={"node-field ".concat(className)}>
            {children}
        </div>
    )
}
export default function CategoryNodeDetails({ inst, data }) {
    return (
        <div className="node-details category-nodes-details mtop20">
            <div className="inner">
                <NodeField label="Mã ID"
                           value={data.id} />
                <NodeField className="category-name mtop10"
                           label="Tên danh mục"
                           value={data.name} />
                <NodeField className="url mtop10"
                           label="Đường dẫn"
                           value={data.url} />
                <NodeField className="cat-description mtop10"
                           label="Mô tả"
                           value={data.description}
                           html={true} />
                <NodeField className="featured-image mtop10"
                           label="Ảnh đại diện"
                           value={data.thumbnail}
                           type={{
                               dataType : 'image',
                               width : '80',
                               alt : ''
                           }} />
                <NodeFieldContainer className="mtop10">
                    <NodeButton type="primary"
                                size="sm"                     
                                label="Tạo mới"
                                fontAwesomeIcon="fa-plus"
                                onButtonClick={onClick_handleOpenModalCategoryNodeItem.bind(inst)} />
                    <NodeButton type="success" 
                                size="sm"                               
                                label="Sửa"
                                fontAwesomeIcon="fa-pencil"
                                onButtonClick={onClick_handleEditCategoryNodeItem.bind(inst, data.id)} />
                    <NodeButton type="danger"
                                size="sm"                                
                                label="Xóa"
                                fontAwesomeIcon="fa-trash"
                                onButtonClick={onClick_handleRemoveCategoryNodeItem.bind(inst, data.id)} />
                </NodeFieldContainer>
            </div>
        </div>       
    )
}
