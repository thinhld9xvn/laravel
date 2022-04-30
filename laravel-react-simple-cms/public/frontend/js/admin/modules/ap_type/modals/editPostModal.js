import React, { Component } from 'react';
import {onClick_CloseEditPostModal} from 'handleEvents/postTypesHandleEvents';
import PostLayout from '../layout/postLayout';
import { MODAL_IDS } from 'constants/modalConstants';
import { COMPONENT_INST } from 'constants/componentConstants';
import CategoryEmbbedModal from './categoryEmbbedModal';
import TagEmbbedModal from './tagEmbbedModal';
import MediaEmbbedModal from 'modules/filemanager/modals/mediaEmbbedModal';
import { addComponentInst } from 'utils/componentUtils';
import { isUndefined } from 'utils/libUtils';
import { FORM_IDS } from 'constants/formConstants';
class EditPostModal  extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal_id : MODAL_IDS.EDIT_POST,
            __heading : 'Tạo mới bài viết',
            _heading : !isUndefined(props.heading) ? props.heading : 'Chỉnh sửa bài viết',
            heading : !isUndefined(props.heading) ? props.heading : 'Chỉnh sửa bài viết',            
            asyncLoading : false
        }
    }
    componentDidMount() {
        addComponentInst({
            name : COMPONENT_INST.EDIT_POST_MODAL_LAYOUT,
            instance : this
        });
    }
    componentDidUpdate() {
        addComponentInst({
            name : COMPONENT_INST.EDIT_POST_MODAL_LAYOUT,
            instance : this
        });
    }
    render() {
        const {closeText, embbed} = this.props;
        const {asyncLoading, heading, modal_id} = this.state;
        return (
            <>
                <div data-popbox-id={modal_id}
                    className="popbox editPostModal modal">
                    <div className="popbox_container" style={{ maxWidth : '100%' }}>
                        <div className="heading">{heading}</div>
                        <div className="text">
                            <PostLayout name = {COMPONENT_INST.EDIT_POST_LAYOUT}
                                        embbed = {embbed} />
                        </div>
                        <div className="footer">
                            <button className="btn btn-default btn-sm"
                                    onClick={onClick_CloseEditPostModal.bind(this)}>{closeText}</button>
                        </div>
                    </div>
                </div>
                {asyncLoading ? (
                    <>
                        <CategoryEmbbedModal heading = "Hộp thoại danh mục"
                                            closeText = "Đóng lại"
                                            loadMediaEmbbed = {false} />
                        <TagEmbbedModal heading = "Hộp thoại thẻ"
                                        ChooseText = "Đồng ý"
                                        loadMediaEmbbed = {false} />
                        <MediaEmbbedModal heading="Thư viện ảnh"
                                        chooseText="Chọn đối tượng"
                                        closeText="Đóng lại" /> 
                    </>
                ) : null}
            </>
        );
    }
}
export default EditPostModal;