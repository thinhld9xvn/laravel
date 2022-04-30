import {showAlertDialog} from 'utils/modalUtils';
import * as _ from 'utils/libUtils';
import { getComponentInst } from 'utils/componentUtils';
import { ADMIN_AJAX_URLS } from 'constants/UrlConstants';
import { COMPONENT_INST } from 'constants/componentConstants';
import { handleReloadForm } from './handleReloadForm';
import {cloneDeep} from 'lodash';
import { getApi } from 'utils/apiUtils';
import { convertSlugToName } from 'utils/urlUtils';
import { handleValidatePostTypeForm } from './validate/handleValidatePostTypeForm';
import { createBase64PostTypeId } from 'utils/postTypesUtils';
import { createPostTypeHook } from 'hooks/postTypeHook/createPostTypeHook';
export async function handlePerformCreateNewPostType() {
    const formInst = getComponentInst(COMPONENT_INST.NEW_POST_TYPE_MODAL_LAYOUT),
        tabInst = getComponentInst(COMPONENT_INST.POST_TYPES_TAB),
        { formFields, _postTypeFormValidate, postTypeFormValidate } = formInst.state,
        postTypesList = cloneDeep(tabInst.props.postTypesList),
        { slugPostType, namePostType } = formFields,
        {CREATE_NEW_POST_TYPE_URL} = ADMIN_AJAX_URLS,
        myFormFields = {...formFields, id : createBase64PostTypeId(slugPostType)};
    const boolValidate = handleValidatePostTypeForm(formFields, postTypeFormValidate);
    if (!boolValidate) {
        showAlertDialog({
            title: 'Thông báo',
            message: "Mời nhập đầy đủ các trường theo yêu cầu !!!",
            icon: 'error',
            ok_label: 'Đồng ý',
            ok_callback: () => {
            }
        });
        return;
    }
    const hasDuplicate = (postTypesList.filter(pt => pt.slug === slugPostType || 
                                                    convertSlugToName(pt.slug) === convertSlugToName(slugPostType) || 
                                                    pt.name.toLowerCase() === namePostType.toLowerCase())).length;
    if ( hasDuplicate ) {
        showAlertDialog({
            title: 'Thông báo',
            message: 'Thông tin về mục bài viết đã trùng lặp (tên, slug, ...), mời nhập một thông tin khác !!!',
            icon: 'error',
            ok_label: 'Đồng ý',
            ok_callback: () => {
            }
        });
        return false;
    }
    formInst.setState({
        postTypeFormValidate : cloneDeep(_postTypeFormValidate)
    });
    _.showLoadingOverlay();
    const fd = new FormData();
    fd.append('data', JSON.stringify(myFormFields));
    const response = await getApi("POST", CREATE_NEW_POST_TYPE_URL, fd);
    if ( !response ) {
        showAlertDialog({
            title: 'Thông báo',
            message: "Phát hiện lỗi khi tạo một mục bài viết mới, mời thử lại !!!",
            icon: 'error',
            ok_label: 'Đồng ý',
            ok_callback: () => {
                handleReloadForm.call(formInst);
            }
        });
        return;
    }
    const results = response.data;
    if (!results.success) {
        showAlertDialog({
            title: 'Thông báo',
            message: "Phát hiện lỗi khi tạo một mục bài viết mới, mời thử lại !!!",
            icon: 'error',
            ok_label: 'Đồng ý',
            ok_callback: () => {
                handleReloadForm.call(formInst);
            }
        });
    }
    else {
        showAlertDialog({
            title: 'Thông báo',
            message: 'Tạo mục bài viết mới thành công !!!',
            icon: 'information',
            ok_label: 'Đồng ý',
            ok_callback: () => {
                createPostTypeHook.call(this);
            }
        });
    }
    _.scrollPageToTop();
    _.closeLoadingOverlay();
}