import React from 'react'

export default function DeactiveActionButtons({ inst, row, actionData }) {
    const {guid} = row;
    const {onClick_restorePost, onClick_removePermantlyPost} = actionData;
    return (
        <div className="actionButtons">
            <a className="btn btn-primary btn-link btn-sm"
                onClick={onClick_restorePost.bind(this, guid, inst.state.post_type)}
                href="#">
                <i className="fa fa-recycle"></i>
            </a>
            <a className="btn btn-danger btn-link btn-sm"
                onClick={onClick_removePermantlyPost.bind(inst, [guid], inst.state.post_type)}
                href="#">
                <i className="fa fa-trash"></i>
            </a>
        </div>
    )
}
