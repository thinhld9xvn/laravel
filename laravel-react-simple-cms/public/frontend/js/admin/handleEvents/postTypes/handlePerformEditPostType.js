import * as modalUtils from 'utils/modalUtils';
import * as _ from 'utils/libUtils';
import { getComponentInst } from 'utils/componentUtils';
import { ADMIN_AJAX_URLS } from 'constants/UrlConstants';
import { COMPONENT_INST } from 'constants/componentConstants';
import { handleReloadForm } from './handleReloadForm';
import { convertSlugToName } from 'utils/urlUtils';
import { getApi } from 'utils/apiUtils';
import { handleValidatePostTypeForm } from './validate/handleValidatePostTypeForm';
import { saveActiveEditingPostTypeHook } from 'hooks/postTypeHook/saveActiveEditingPostTypeHook';

export async function handlePerformEditPostType() {
    const formInst = getComponentInst(COMPONENT_INST.EDIT_POST_TYPE_MODAL_LAYOUT),
          tabPtInst = getComponentInst(COMPONENT_INST.POST_TYPES_TAB),
        { formFields, postTypeFormValidate } = formInst.state,
        { postTypesList, postTypeEditing } = tabPtInst.props,
        { id : ptIdEditing } = postTypeEditing, // original
        { slugPostType, namePostType } = formFields,
        { UPDATE_POST_TYPE_URL } = ADMIN_AJAX_URLS;
        const boolValidate = handleValidatePostTypeForm(formFields, postTypeFormValidate);
    if (!boolValidate) {
        modalUtils.showAlertDialog({
            title: 'Thông báo',
            message: "Mời nhập đầy đủ thông tin các trường theo yêu cầu !!!",
            icon: 'error',
            ok_label: 'Đồng ý',
            ok_callback: () => {
            }
        });
        return;
    }
    const hasDuplicate = (postTypesList.filter(pt => pt.id !== ptIdEditing)
                                       .filter(pt => pt.slug === slugPostType || 
                                                    convertSlugToName(pt.slug) === convertSlugToName(slugPostType) || 
                                                    pt.name.toLowerCase() === namePostType.toLowerCase())).length;
    if ( hasDuplicate ) {
        modalUtils.showAlertDialog({
            title: 'Thông báo',
            message: 'Thông tin về mục bài viết đã trùng lặp (tên, slug, ...), mời nhập một thông tin khác !!!',
            icon: 'error',
            ok_label: 'Đồng ý',
            ok_callback: () => {
            }
        });
        return false;
    }
    _.showLoadingOverlay();
    const fd = new FormData();
    fd.append('data', JSON.stringify(formFields));
    const response = await getApi('POST', UPDATE_POST_TYPE_URL, fd);
    if ( !response ) {
        modalUtils.showAlertDialog({
            title: 'Thông báo',
            message: "Phát hiện lỗi khi sửa mục bài viết mới, mời thử lại !!!",
            icon: 'error',
            ok_label: 'Đồng ý',
            ok_callback: () => {
                handleReloadForm.call(formInst);
            }
        });
        _.closeLoadingOverlay();
        return;
    }
    modalUtils.showAlertDialog({
        title: 'Thông báo',
        message: 'Sửa mục bài viết thành công !!!',
        icon: 'information',
        ok_label: 'Đồng ý',
        ok_callback: () => {
            saveActiveEditingPostTypeHook.call(this);
        }
    });
    _.scrollPageToTop();
    _.closeLoadingOverlay();   
}