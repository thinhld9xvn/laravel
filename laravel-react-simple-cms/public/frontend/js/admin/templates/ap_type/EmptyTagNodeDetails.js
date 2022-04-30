import React from 'react'
import EmptyCategoryNodeDetails from './emptyCategoryNodeDetails'
import { onClick_handleOpenModalTagNodeItem } from 'handleEvents/tagsHandleEvents'
export default function EmptyTagNodeDetails({ inst, msg = "Chưa có thẻ nào được chọn." }) {
    return (
        <EmptyCategoryNodeDetails inst = {inst}
                                  msg = {msg}
                                  handleButtonClick = {onClick_handleOpenModalTagNodeItem} />
    )
}
