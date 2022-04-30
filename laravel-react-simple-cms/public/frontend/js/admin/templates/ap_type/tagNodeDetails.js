import React from 'react'
import { onClick_handleEditTagNodeItem,
            onClick_handleRemoveTagNodeItem,
                onClick_handleOpenModalTagNodeItem } from 'handleEvents/tagsHandleEvents'
import NodeButton from '../buttons/nodeButton'
const NodeEmptyField = <span>{"<Trống>"}</span>
const NodeField = ({ label, value, className = "", html = false }) => {
    let nodeResults = null;
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
export default function TagNodeDetails({ inst, data }) {
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
                <NodeFieldContainer className="mtop10">
                    <NodeButton type="success" 
                                size="sm"                               
                                label="Sửa"
                                fontAwesomeIcon="fa-pencil"
                                onButtonClick={onClick_handleEditTagNodeItem.bind(inst, data.id)} />
                    <NodeButton type="danger"
                                size="sm"                                
                                label="Xóa"
                                fontAwesomeIcon="fa-trash"
                                onButtonClick={onClick_handleRemoveTagNodeItem.bind(inst, data.id)} />
                </NodeFieldContainer>
            </div>
        </div>       
    )
}
