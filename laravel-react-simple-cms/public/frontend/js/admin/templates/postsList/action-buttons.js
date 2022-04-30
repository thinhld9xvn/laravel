import React from 'react'
export default function ActionButtons({ inst, row, actionData }) {
    const {guid} = row;
    const {onClick_editPost, onClick_trashPost} = actionData;
    return (
        <div className="actionButtons">
            <a className="btn btn-primary btn-link btn-sm"
                onClick={onClick_editPost.bind(inst, guid)}
                href="#">
                <i className="fa fa-pencil"></i>
            </a>
            <a className="btn btn-danger btn-link btn-sm"
                onClick={onClick_trashPost.bind(inst, guid)}
                href="#">
                <i className="fa fa-trash"></i>
            </a>
        </div>
    )
}
